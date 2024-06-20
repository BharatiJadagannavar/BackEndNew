const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get('/api/users', (req, res) => {
    res.json({ message: 'Get all users' });
});

app.post('/api/users', (req, res) => {
    res.json({ message: 'Create a new user' });
});
app.use(express.json()); // Parse JSON request bodies

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = mongoose.model('User', {
    name: String,
    email: String
});

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.json(newUser);
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
