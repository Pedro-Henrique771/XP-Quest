const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao cadastrar");
  }

  return data;
}

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao logar");
  }

  return data;
}

export async function sendActivity(description) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao enviar atividade");
  }

  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao buscar usuário");
  }

  return data;
}

export async function getHistory() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/activities/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao buscar histórico");
  }

  return data;
}

export async function getRanking() {
  const response = await fetch(`${API_URL}/ranking`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao buscar ranking");
  }

  return data;
}