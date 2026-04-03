import { Router } from "express";
import type { Request, Response } from "express";
import { query } from "../db/query";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json(await query("SELECT * FROM users ORDER BY created_at DESC"));
});

router.get("/:id", async (req: Request, res: Response) => {
  const rows = await query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "User not found" });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  const rows = await query(
    "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
    [name, email, role || "developer"],
  );
  res.status(201).json(rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  const rows = await query(
    "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
    [name, email, role, req.params.id],
  );
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "User not found" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await query("DELETE FROM users WHERE id = $1", [req.params.id]);
  res.json({ success: true });
});

export default router;
