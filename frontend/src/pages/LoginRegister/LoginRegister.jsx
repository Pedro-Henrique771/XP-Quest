import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import "./LoginRegister.css"
import AuthCard from "../../components/AuthCard/AuthCard.jsx";
import { loginUser } from "../../services/Api.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input.jsx";


const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        setError("");

        const data = await loginUser(username, password);

        localStorage.setItem("token", data.token);

        navigate("/activities");
      } catch (error) {
          if (!username || !password) {
            setError("Ambos os campos devem ser preenchidos");
            return;
          }

            setError(error.message || "Erro ao fazer login");
        } 
      }
   

  return (
    <AuthCard>
        <h1>Acesse o XP Quest</h1>
     
            <Input 
              id="user"
              label="Usuário:"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
          
            <Input 
            id="password"
            label="Senha:"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            
          
          <Button placeholder="Entrar" onClick={handleLogin} />
          {error && <p className="errorMessage">{error}</p>}
          <p className="registerText">
                Não tem cadastro? {" "}
                <Link to="/register">Criar conta</Link>
        </p>
    </AuthCard>
        
  );
};


export default LoginRegister;