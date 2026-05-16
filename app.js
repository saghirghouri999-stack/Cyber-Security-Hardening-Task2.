const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');

const app = express();

// ================= WEEK 4: API SECURITY & HEADERS =================

// 1. Security Headers & CSP Implementation using Helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'trusted-cdn.com'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// 2. API Security Hardening: CORS
const corsOptions = {
    origin: 'https://your-frontend-domain.com', // Restrict unauthorized access
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 3. API Security Hardening: Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ================= WEEK 5: EXPLOITING & VULNERABILITIES =================

// 1. Cross-Site Request Forgery (CSRF) Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Route to get CSRF token (for frontend to use)
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// 2. SQL Injection Prevention (Prepared Statements)
// Dummy Database Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'db_user',
    password: 'db_password',
    database: 'secure_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // PREPARED STATEMENT: Prevents SQLi
        const [rows, fields] = await pool.execute('SELECT id, username, email FROM users WHERE id = ?', [userId]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});