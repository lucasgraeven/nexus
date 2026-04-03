export interface User {
  id: number;
  name: string;
  email: string;
  role: "developer" | "lead" | "manager";
  created_at: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role?: "developer" | "lead" | "manager";
}