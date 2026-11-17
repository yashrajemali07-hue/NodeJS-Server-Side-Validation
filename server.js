
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Server-side validation
app.post('/register', (req, res) => {

    const { name, email, phone, password } = req.body;

    let errors = [];

    // Name validation
    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Enter a valid email address');
    }

    // Phone validation
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
        errors.push('Phone number must contain exactly 10 digits');
    }

    // Password validation
    if (!password || password.length < 6) {
        errors.push('Password must contain at least 6 characters');
    }

    // Send errors if validation fails
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // Successful validation
    res.status(200).json({
        success: true,
        message: 'Student registration successful!'
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
