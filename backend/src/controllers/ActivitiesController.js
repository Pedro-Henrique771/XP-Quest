import User from "../models/User.js";
import Activity from "../models/Activities.js";
import { calculateLevel } from "../service/progressionLevel.js"

const actionsXp = {
  estudei: 20,
  trabalhei: 10,
  criei: 50,
  treinei: 20,
  cuidei: 15,
  li: 15,
  investi: 25,
  empreendi: 30,
  curso: 30,
};

const findAction = (description) => {
  const words = description.toLowerCase().split(" ");
  return words.find((word) => actionsXp[word]);
};

const extractTimeInMinutes = (description) => {
  const words = description.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    if ((words[i] === "hora" || words[i] === "horas") && i > 0) {
      const value = parseInt(words[i - 1]);

      if (!isNaN(value)) {
        return value * 60;
      }
    }

    if ((words[i] === "min" || words[i] === "minutos") && i > 0) {
      const value = parseInt(words[i - 1]);

      if (!isNaN(value)) {
        return value;
      }
    }
  }

  return 0;
};

const calculateTimeBonus = (minutes) => {
  if (minutes >= 180) return 10;
  if (minutes >= 120) return 5;
  return 0;
};



const descriptionTaken = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ erro: "Descrição é obrigatória" });
    }

    if (!req.user) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    let xpBase = 0;
    let xpBonus = 0;
    let actionFound = null;
    let minutes = 0;

    const action = findAction(description);

    if (action) {
      actionFound = action;
      xpBase = actionsXp[action];

      minutes = extractTimeInMinutes(description);
      xpBonus = calculateTimeBonus(minutes);

      const xpGained = xpBase + xpBonus;

      user.xp += xpGained;
      user.nivel = calculateLevel(user.xp);

      await user.save();

      await Activity.create({
        userId: user._id,
        description,
        action: actionFound,
        minutes,
        xpBase,
        xpBonus,
        xpGained,
      });
    }

    return res.status(200).json({
      mensagem: actionFound
        ? "Atividade registrada"
        : "Atividade enviada, mas nenhuma ação produtiva foi identificada",
      produtiva: !!actionFound,
      acao_detectada: actionFound,
      xp_base: xpBase,
      xp_bonus: xpBonus,
      xp_ganho: xpBase + xpBonus,
      xp_total: user.xp,
      nivel: user.nivel,
    });
  } catch (error) {
    console.error("ERRO NO CONTROLLER:", error);

    return res.status(500).json({
      erro: "Erro interno no servidor",
      detalhe: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const userId = req.user.id;

    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedActivities = activities.map((activity) => ({
      id: activity._id,
      description: activity.description,
      xpBase: activity.xpBase,
      xpBonus: activity.xpBonus,
      xpGained: activity.xpGained,
      createdAt: activity.createdAt,
    }));

    return res.status(200).json({
      mensagem: "Histórico carregado com sucesso",
      total: formattedActivities.length,
      activities: formattedActivities,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar histórico",
      detalhe: error.message,
    });
  }

};

export default { descriptionTaken, getHistory };