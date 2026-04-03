export interface Task {
  id: number;
  project_id: number;
  assigned_to?: number;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "in_review" | "done";
  priority: "low" | "medium" | "high" | "critical";
  deadline?: string;
  created_at: string;
  assigned_to_name?: string;
  project_name?: string;
}

export interface CreateTaskDto {
  project_id: number;
  assigned_to?: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  deadline?: string;
}
