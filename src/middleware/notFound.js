// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).

// Runs when no route matched. Placed after all routes in app.js.
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
}
