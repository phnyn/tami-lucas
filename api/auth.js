export default function handler(req, res) {
  // Benutzername/Passwort aus Environment
  const USER = process.env.AUTH_USER;
  const PASS = process.env.AUTH_PASS;

  const auth = req.headers.authorization;

  if (!auth || auth !== 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')) {
    res.status(401);
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
    res.end('Unauthorized');
    return;
  }

  // Auth erfolgreich → geschützte Seite ausliefern
  res.status(200).sendFile('protected.html', { root: './' });
}