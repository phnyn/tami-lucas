// import fs from 'fs';
// import path from 'path';

// export default function handler(req, res) {
//   const USER = process.env.AUTH_USER;
//   const PASS = process.env.AUTH_PASS;

//   const auth = req.headers.authorization;

//   if (!auth || auth !== 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')) {
//     res.status(401);
//     res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
//     res.end('Unauthorized');
//     return;
//   }

//   // Read protected.html manually
//   const filePath = path.join(process.cwd(), 'protected.html');
//   try {
//     const html = fs.readFileSync(filePath, 'utf8');
//     res.status(200).setHeader('Content-Type', 'text/html');
//     res.end(html);
//   } catch (err) {
//     res.status(500).end('Internal Server Error');
//   }
// }

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const USER = process.env.AUTH_USER;
  const PASS = process.env.AUTH_PASS;

  const auth = req.headers.authorization;

  if (!auth || auth !== 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')) {
    res.status(401);
    res.end('Unauthorized');
    return;
  }

  // Serve protected page content
  const filePath = path.join(process.cwd(), 'protected.html');
  const html = fs.readFileSync(filePath, 'utf8');
  res.status(200).setHeader('Content-Type', 'text/html');
  res.end(html);
}