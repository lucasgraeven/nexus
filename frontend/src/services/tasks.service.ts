import type { Task, CreateTaskDto } from "../models/task.model";

const API_URL = "http://localhost:3001/api";

export const tasksService = {
  getAll: async (): Promise<Task[]> => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
  },

  getById: async (id: number): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${id}`);
    return res.json();
  },

  create: async (data: CreateTaskDto): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: number, data: CreateTaskDto): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  },
};
