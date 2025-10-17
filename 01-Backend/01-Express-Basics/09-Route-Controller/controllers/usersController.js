import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data file
const dataPath = path.join(__dirname, '../data/data.json');

// Helper to read users from JSON
const readUsers = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

// Helper to write users to JSON
const writeUsers = (users) => {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// GET all users
export const getUsers = (req, res) => {
    const users = readUsers();
    res.json(users);
};

// GET user by ID
export const getUserById = (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

// CREATE user
export const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email)
        return res.status(400).json({ message: 'Name and email are required' });

    const users = readUsers();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email,
    };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
};

// UPDATE user
export const updateUser = (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    const { name, email } = req.body;
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    writeUsers(users);
    res.json(users[userIndex]);
};

// DELETE user
export const deleteUser = (req, res) => {
    let users = readUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    writeUsers(users);
    res.status(204).send();
};
