
import AppRoutes from "./routes/AppRoutes";

function App() {
  // const [description, setDescription] = useState("");

  



  // const handleSendActivity = async () => {
  //   try {
  //     const data = await sendActivity(description);
  //     alert(`XP ganho: ${data.xp_ganho}`);
  //     console.log(data);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>Projeto Produtividade</h1>

  //     <h2>Usuário</h2>
  //     <input
  //       type="text"
  //       placeholder="Digite seu usuário"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />

  //     <input
  //       type="password"
  //       placeholder="Digite sua senha"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />

  //     <button onClick={handleRegister}>Cadastrar</button>
  //     <button onClick={handleLogin}>Login</button>

  //     <h2>Atividade</h2>
  //     <input
  //       type="text"
  //       placeholder="Ex: Estudei 2 horas"
  //       value={description}
  //       onChange={(e) => setDescription(e.target.value)}
  //     />

  //     <button onClick={handleSendActivity}>Enviar atividade</button>
  //   </div>
  // );
  return <AppRoutes />
}

export default App;