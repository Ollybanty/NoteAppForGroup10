// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).

// Prints one line per request, e.g.  POST /api/notes → 201 (4ms)
export function logger(req, res, next) {
  const start = Date.now();

  // 'finish' runs after the response is sent, so the status code is known
  res.on('finish', () => {
    const ms = Date.now() - start; // this is used to get the time taken to process the request
    console.log(
      `This is the logger: ${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`,
    );
  });

  next(); // as said by the tutor, this is to terminate the middleware and pass control onward. Without it the request hangs
}
