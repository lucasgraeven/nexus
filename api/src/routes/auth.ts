import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/query";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "nexus_secret";

// Register
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existing = await query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  if (existing.length)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const rows = await query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, hashedPassword, role || "developer"],
  );

  const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token, user: rows[0] });
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const rows = await query("SELECT * FROM users WHERE email = $1", [email]);
  if (!rows.length)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, rows[0].password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const { password: _, ...user } = rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, user });
});

export default router;
