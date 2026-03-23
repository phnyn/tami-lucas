import express from 'express';
import session from 'express-session';

console.log('hier');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true nur mit HTTPS
}));

const PASSWORD = 'meinpasswort123';

// Login
app.post('/login', (req, res) => {
    if (req.body.password === PASSWORD) {
        req.session.authenticated = true;
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

// Middleware Schutz
function requireAuth(req, res, next) {
    if (req.session.authenticated) {
        return next();
    }
    res.status(401).send('Nicht erlaubt');
}

// Geschützte Seite
app.get('/main', requireAuth, (req, res) => {
    res.send('<h1>Geheimer Inhalt 🔐</h1>');
});

// Landing Page
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.use(express.static('public'));

app.listen(3000, () => console.log('läuft auf http://localhost:3000'));