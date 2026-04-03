import { Router } from "express";
import type { Request, Response } from "express";
import { query } from "../db/query";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json(await query("SELECT * FROM projects ORDER BY created_at DESC"));
});

router.get("/:id", async (req: Request, res: Response) => {
  const rows = await query("SELECT * FROM projects WHERE id = $1", [
    req.params.id,
  ]);
  if (!rows.length)
    return res.status(404).json({ message: "Project not found" });
  const tasks = await query(
    `SELECT t.*, u.name as assigned_to_name 
     FROM tasks t
     LEFT JOIN users u ON t.assigned_to = u.id
     WHERE t.project_id = $1 ORDER BY t.created_at DESC`,
    [req.params.id],
  );
  res.json({ ...rows[0], tasks });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description, status, priority, deadline } = req.body;
  const rows = await query(
    `INSERT INTO projects (name, description, status, priority, deadline)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, status || "active", priority || "medium", deadline],
  );
  res.status(201).json(rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, description, status, priority, deadline } = req.body;
  const rows = await query(
    `UPDATE projects SET name = $1, description = $2, status = $3, priority = $4, deadline = $5
     WHERE id = $6 RETURNING *`,
    [name, description, status, priority, deadline, req.params.id],
  );
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "Project not found" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await query("DELETE FROM projects WHERE id = $1", [req.params.id]);
  res.json({ success: true });
});

export default router;
