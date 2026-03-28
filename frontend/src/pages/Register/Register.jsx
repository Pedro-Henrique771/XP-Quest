import AuthCard from '../../components/AuthCard/AuthCard.jsx'
import { registerUser } from '../../services/Api.jsx';
import { useState } from 'react';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      try {
        setError("");

        if (!username || !password) {
          setError("Preencha todos os campos");
          return;
        }

        const data = await registerUser(username, password);

        // sucesso → volta pro login
        navigate("/");

      } catch (error) {
        // aqui usamos a mensagem do backend se existir
        if (error.message === "Usuário já existe") {
          setError("Este usuário já está cadastrado");
        } else {
          setError(error.message || "Erro ao cadastrar");
        }
      }
  };

  return (
    <AuthCard>
        <h1>Seja bem vindo ao <br />XP Quest</h1>
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

            <Button placeholder="Criar conta" onClick={handleRegister} />
            {error && <p className="errorMessage">{error}</p>}

            <p className="registerText">
                Já possui uma conta? {" "}
                <Link to="/">Fazer login</Link>
        </p>
    </AuthCard>
  )
}

export default Register
