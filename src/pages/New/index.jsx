import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import "./new.css";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebase";
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";

const listRef = collection(db, "customers")

export default function New() {
    const { user } = useContext(AuthContext)
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0)
  const [loadCustomers, setLoadCustomers] = useState(true)
  const [complement, setComplement] = useState("");
  const [assunto, setAssunto] = useState("Assunto");
  const [status, setStatus] = useState("Aberto");

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
            })
            .catch((error) => {
                console.log("ERRO AO BUSCAR OS CLIENTES", error)
                setLoadCustomers(false)
                setCustomers([ {id: "1", nomeFantasia: "FREELA" } ])
            })
        }

        loadCustomers()
    }, [])


  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value)
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
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
