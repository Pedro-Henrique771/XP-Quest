import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar usuários" });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        erro: "Username e password são obrigatórios",
      });
    }

    const userAlreadyExists = await findUserByUsername(username);

    if (userAlreadyExists) {
      return res.status(400).json({
        erro: "Usuário já existe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      xp: 0,
      nivel: 1,
    });

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        erro: "Usuário já existe",
      });
    }

    return res.status(500).json({
      erro: "Erro ao cadastrar usuário",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        erro: "Username e password são obrigatórios",
      });
    }

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        erro: "Usuário não encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        erro: "Credenciais inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      mensagem: "Login efetuado com sucesso",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao realizar login",
    });
  }
};

export default {
  register,
  login,
  listUsers,
  findUserByUsername,
};