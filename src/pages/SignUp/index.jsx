import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault();

    if (name !== '' && email !== "" && password !== "") {
      await signUp(email, password, name);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamadas" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}
