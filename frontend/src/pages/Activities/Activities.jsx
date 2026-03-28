import { useEffect, useState } from "react";
import "./Activities.css";
import progressXp from "../../assets/progressXp.png";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { sendActivity, getMe } from "../../services/Api.jsx";
import Header from "../../components/Header/Header.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

const Activities = () => {
  const [activityText, setActivityText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [activityResult, setActivityResult] = useState({
    mensagem: "",
    produtiva: null,
    acao_detectada: "",
    xp_base: 0,
    xp_bonus: 0,
    xp_ganho: 0,
    xp_total: 0,
    nivel: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar usuário.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleAddActivity = async () => {
    if (!activityText.trim()) {
      setError("Digite uma atividade antes de enviar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await sendActivity(activityText);

      setActivityResult({
        mensagem: data.mensagem,
        produtiva: data.produtiva,
        acao_detectada: data.acao_detectada,
        xp_base: data.xp_base,
        xp_bonus: data.xp_bonus,
        xp_ganho: data.xp_ganho,
        xp_total: data.xp_total,
        nivel: data.nivel,
      });

      setUser((prevUser) => ({
        ...prevUser,
        xp: data.xp_total,
        nivel: data.nivel,
      }));

      setActivityText("");
    } catch (err) {
      setError(err.message || "Erro ao registrar atividade.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return <p>Carregando usuário...</p>;
  }

  return (
    <div className="activitiesPage">
      <Header user={user} />
      <NavBar />

      <main className="content">
        <div className="hero">
          <div className="heroText">
            <h2>
              Você está realmente <span>evoluindo</span> ou apenas cumprindo o básico?
            </h2>
            <p>
              Acompanhe sua produtividade, acumule XP e descubra se você está
              conquistando suas recompensas ou apenas repetindo hábitos.
            </p>
          </div>

          <img src={progressXp} alt="Progresso XP" />
        </div>

        <section className="activitySection">
          <div className="activityCard">
            <div className="activityLeft">
              <h3>Registrar atividade</h3>
              <p>Descreva o que você fez hoje e acompanhe sua evolução com XP.</p>

              <div className="activityForm">
                <Input
                  id="activity"
                  label="Atividade:"
                  type="text"
                  placeholder="Ex: Estudei React por 2 horas"
                  value={activityText}
                  onChange={(e) => setActivityText(e.target.value)}
                />

                <Button
                  placeholder={loading ? "Adicionando..." : "Adicionar atividade"}
                  onClick={handleAddActivity}
                />
              </div>

              {error && <p className="activityError">{error}</p>}
            </div>

            <div className="activityRight">
              <h3>Resultado da atividade</h3>

              {activityResult.mensagem ? (
                <div className="xpLog">
                  <p>
                    <span>Status:</span> {activityResult.mensagem}
                  </p>

                  <p>
                    <span>Produtiva:</span>{" "}
                    {activityResult.produtiva ? "Sim" : "Não"}
                  </p>

                  <p>
                    <span>XP ganho pela ação:</span> +{activityResult.xp_base}
                  </p>

                  <p>
                    <span>Bônus de XP:</span> +{activityResult.xp_bonus}
                  </p>


                  <p className="xpCurrent">
                    <span>XP atual:</span> {activityResult.xp_total} XP
                  </p>

                  <p className="xpCurrent">
                    <span>Nível atual:</span> {activityResult.nivel}
                  </p>
                  <p className="xpTotal">
                    Total ganho: +{activityResult.xp_ganho} XP
                  </p>
                </div>
              ) : (
                <div className="emptyResult">
                  <p>
                    O resultado da sua atividade aparecerá aqui depois que você
                    registrar uma nova ação.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Activities;