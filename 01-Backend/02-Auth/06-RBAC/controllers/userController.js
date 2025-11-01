import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username, role } = req.body;

  // In real app, validate username/password from DB
  if (!username || !role) {
    return res.status(400).json({ message: "Username and role are required" });
  }

  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

export const getAdminData = (req, res) => {
  res.json({ message: `Hello Admin ${req.user.username}!`, data: "Secret admin stuff" });
};

export const getUserData = (req, res) => {
  res.json({ message: `Hello User ${req.user.username}!`, data: "General user info" });
};