import { useEffect, useState } from "react";
import "./Ranking.css";
import Header from "../../components/Header/Header.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { getRanking, getMe } from "../../services/Api.jsx";
import trophy from "../../assets/podium.png"; 

const Ranking = () => {
  const [user, setUser] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe();
        setUser(userData);

        const rankingData = await getRanking();
        setRanking(rankingData.ranking);
      } catch (err) {
        setError(err.message || "Erro ao carregar ranking");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rankingPage">
      <Header user={user} />
      <NavBar />

      <main className="content">
        <section className="rankingSection">
          <div className="rankingHeader">
            <img src={trophy} alt="Ranking" className="rankingTrophy"/>
            <h2>Ranking</h2>
          </div>

          {loading ? (
            <p>Carregando ranking...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="rankingList">
              {ranking.map((player) => (
                <div key={player.position} className="rankingItem">
                  <span className="position">{player.position}º</span>
                  <span className="name">{player.username}</span>
                  <span className="level">Lvl {player.nivel}</span>
                  <span className="xp">{player.xp} XP</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Ranking;