import User from "../models/User.js";
import { getXpForCurrentLevel, getXpForNextLevel } from "../service/progressionLevel.js";

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const xpCurrentLevel = getXpForCurrentLevel(user.nivel);
    const xpNextLevel = getXpForNextLevel(user.nivel);
    const xpRemaining = xpNextLevel - user.xp;

    return res.status(200).json({
      id: user._id,
      username: user.username,
      xp: user.xp,
      nivel: user.nivel,
      xpCurrentLevel,
      xpNextLevel,
      xpRemaining,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar dados do usuário",
      detalhe: error.message,
    });
  }
};

const getRanking = async (req, res) => {
  try {
    const users = await User.find()
      .select("username nivel xp")
      .sort({ xp: -1, createdAt: 1 })
      .limit(20);

    const ranking = users.map((user, index) => ({
      position: index + 1,
      username: user.username,
      nivel: user.nivel,
      xp: user.xp,
    }));

    return res.status(200).json({
      mensagem: "Ranking carregado com sucesso",
      total: ranking.length,
      ranking,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar ranking",
      detalhe: error.message,
    });
  }
};

export default { getMe, getRanking };