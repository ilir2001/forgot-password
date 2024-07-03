// server.js
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routers/adminRouter'); // Create this file for handling user-related routes
const Admin = require('./models/Admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());
// Use cors middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));




// Connect to MongoDB
mongoose.connect('mongodb+srv://ilirmehmeti02:mFZoSVLwPnvcZ4KO@cluster0.faghw3f.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check for MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decodedToken = jwt.verify(token, 'secret');

        // Ensure the token has the correct action or any other necessary validations
        if (decodedToken.action !== 'reset-password') {
            return res.status(400).json({ message: 'Invalid token action' });
        }

        // Extract email from decoded token
        const email = decodedToken.email;

        // You can now perform actions like updating the password without querying the database
        // Assuming you have a model named Admin

        // Example: Update password for the user with the given email
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Admin.updateOne({ email }, { $set: { password: hashedPassword } });

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Invalid or expired token' });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    console.log(email);

    try {
        const admin = await Admin.findOne({ email: email });


        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const resetToken = jwt.sign({ email: admin.email, action: 'reset-password' }, 'secret', { expiresIn: '1h' });
        console.log(resetToken);

        const transporter = nodemailer.createTransport({
            // Configure your email service
            service: 'gmail',
            auth: {
                user: 'adagqwej1qrasdadad@gmail.com',
                pass: 'idvp ljeh yhhi ssuf',
            },
        });

        const resetLink = `http://localhost:5000/reset-password/${resetToken}`;
        const mailOptions = {
            from: 'adagqwej1qrasdadad@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Use the userRouter for user-related routes
app.use('/api/admins', adminRouter);


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});