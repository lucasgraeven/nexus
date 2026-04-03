import type { Project, CreateProjectDto } from "../models/project.model";

const API_URL = "http://localhost:3001/api";

export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
  },

  getById: async (id: number): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects/${id}`);
    return res.json();
  },

  create: async (data: CreateProjectDto): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: number, data: CreateProjectDto): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
  },
};
