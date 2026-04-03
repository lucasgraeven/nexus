import { Router } from "express";
import type { Request, Response } from "express";
import { query } from "../db/query";

const router = Router();

const taskSelect = `
  SELECT t.*, u.name as assigned_to_name, p.name as project_name
  FROM tasks t
  LEFT JOIN users u ON t.assigned_to = u.id
  LEFT JOIN projects p ON t.project_id = p.id
`;

router.get("/", async (req: Request, res: Response) => {
  res.json(await query(`${taskSelect} ORDER BY t.created_at DESC`));
});

router.get("/:id", async (req: Request, res: Response) => {
  const rows = await query(`${taskSelect} WHERE t.id = $1`, [req.params.id]);
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "Task not found" });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    project_id,
    assigned_to,
    title,
    description,
    status,
    priority,
    deadline,
  } = req.body;
  const rows = await query(
    `INSERT INTO tasks (project_id, assigned_to, title, description, status, priority, deadline)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      project_id,
      assigned_to,
      title,
      description,
      status || "todo",
      priority || "medium",
      deadline,
    ],
  );
  res.status(201).json(rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    project_id,
    assigned_to,
    title,
    description,
    status,
    priority,
    deadline,
  } = req.body;
  const rows = await query(
    `UPDATE tasks SET project_id = $1, assigned_to = $2, title = $3, description = $4,
     status = $5, priority = $6, deadline = $7 WHERE id = $8 RETURNING *`,
    [
      project_id,
      assigned_to,
      title,
      description,
      status,
      priority,
      deadline,
      req.params.id,
    ],
  );
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "Task not found" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  res.json({ success: true });
});

export default router;
