export default function handler(req, res) {
  const USER = "admin";
  const PASS = "secret";

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
