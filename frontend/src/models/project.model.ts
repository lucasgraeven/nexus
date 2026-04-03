import { Task } from "./task.model";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: "active" | "on_hold" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  deadline?: string;
  created_at: string;
  tasks?: Task[];
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  deadline?: string;
}
