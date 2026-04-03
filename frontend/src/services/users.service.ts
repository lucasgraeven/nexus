import type { User, CreateUserDto } from "../models/user.model";

const API_URL = "http://localhost:3001/api";

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  },

  getById: async (id: number): Promise<User> => {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: number, data: CreateUserDto): Promise<User> => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  },
};
