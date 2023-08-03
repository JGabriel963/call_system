import { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import logo from "../../assets/logo.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamadas" />
        </div>

        <form>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Digite sue email"
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
            Acessar
          </button>
        </form>

        <Link to="/register">
            Não possui uma conta? Criar uma conta
        </Link>
      </div>
    </div>
  );
}
