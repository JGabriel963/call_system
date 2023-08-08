import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import "./new.css";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebase";
import { collection, getDocs, getDoc, addDoc, doc, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const listRef = collection(db, "customers")

export default function New() {


  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0)
  const [loadCustomers, setLoadCustomers] = useState(true)
  const [complement, setComplement] = useState("");
  const [assunto, setAssunto] = useState("Assunto");
  const [status, setStatus] = useState("Aberto");
  const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if (snapshot.docs.size === 0) {
                    console.log("NENHUMA EMPRESA ENCONTRADA")
                    setCustomers([ {id: "1", nomeFantasia: "FREELA" } ])
                    return
                }

                setCustomers(lista)
                setLoadCustomers(false)

                if (id) {
                  loadId(lista)
                }
            })
            .catch((error) => {
                console.log("ERRO AO BUSCAR OS CLIENTES", error)
                setLoadCustomers(false)
                setCustomers([ {id: "1", nomeFantasia: "FREELA" } ])
            })
        }

        loadCustomers()
    }, [id])

    async function loadId(list) {
      const docRef = doc(db, "chamados", id)
      await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto)
        setStatus(snapshot.data().status)
        setComplement(snapshot.data().complemento)


        let index = list.findIndex(item => item.id === snapshot.data().clienteId)
        setCustomerSelected(index)
        setIdCustomer(true)
      })
      .catch((error) => {
        console.log(error)
        setIdCustomer(false)
      })
    }


  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (idCustomer) {
      await updateDoc(doc(db, "chamados", id), {
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        complemento: complement,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.info("Atualizado com sucesso!")
        setCustomerSelected(0)
        setComplement(0)
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error)
        toast.error("Ops, erro ao atualizar")
      })

      return
    }


    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complement,
      status: status,
      userId: user.uid,
    })
    .then(()=> {
      toast.success("Chamada Registrada")
      setComplement("")
      setCustomerSelected(0)
    })
    .catch((error) => {
      toast.error("Ops, erro ao Registrar")
      console.log(error)
    })
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name={ id ? "Editando Chamado" : "Novo Chamado"}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label>Clientes</label>
            {
                loadCustomers ? (
                    <input type="text" disabled={true} value="Carregando..." />
                ) : (
                    <select value={customerSelected} onChange={handleChangeCustomer}>
                        {customers.map((item, index) => (
                            <option key={index} value={index}>
                                {item.nomeFantasia}
                            </option>
                        ))}
                    </select>
                )
            }

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input 
                type="radio" 
                name="radio" 
                value="Aberto"
                checked={status === "Aberto"} 
                onChange={handleOptionChange}
            />
              <span>Em aberto</span>

              <input 
                type="radio" 
                name="radio" 
                value="Progresso"
                checked={status === "Progresso"} 
                onChange={handleOptionChange} 
            />
              <span>Progresso</span>

              <input 
                type="radio" 
                name="radio" 
                value="Atendido"
                checked={status === "Atendido"} 
                onChange={handleOptionChange} 
            />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea placeholder="Descreva sua problema" 
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
            />

            <button>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
