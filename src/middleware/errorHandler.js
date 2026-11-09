// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).

// Catches every error.
export function errorHandler(err, req, res, next) {
  // when the client makes a request with an invalid JSON body.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Your JSON is not valid' });
  }

  // Errors we flagged ourselves due to validation or other reasons. These are not bugs in our code, but problems with the request.
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }

  // errors related to our code, then we log it and return a generic message to the client.
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server' });
}
