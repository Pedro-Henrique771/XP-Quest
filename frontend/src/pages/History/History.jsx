import { useEffect, useState } from "react";
import "./History.css";
import Header from "../../components/Header/Header.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { getMe, getHistory } from "../../services/Api.jsx";

const History = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const userData = await getMe();
        setUser(userData);

        const historyData = await getHistory();
        setActivities(historyData.activities);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados.");
      } finally {
        setLoadingUser(false);
        setLoadingHistory(false);
      }
    };

    fetchPageData();
  }, []);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  if (loadingUser || loadingHistory) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="historyPage">
      <Header user={user} />
      <NavBar />

        <main className="history-container">
        <section className="history-header">
          <h1>Histórico</h1>
          <p>Últimas atividades registradas</p>
        </section>

        <section className="history-list">
          {activities.length === 0 ? (
            <p>Nenhuma atividade encontrada.</p>
          ) : (
            activities.map((activity) => (
              <article key={activity.id} className="history-card">
                <h2 className="history-description">{activity.description}</h2>

                <p className="history-date">
                  {formatDateTime(activity.createdAt)}
                </p>

                <div className="history-xp">
                  <span>XP base: {activity.xpBase}</span>
                  <span>XP bônus: {activity.xpBonus}</span>
                  <span className="history-total-xp">
                    XP ganho: {activity.xpGained}
                  </span>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default History;