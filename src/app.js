// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).

import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import { logger } from './middleware/logger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// 1. Read JSON bodies into req.body (this has to come before the routes)
app.use(express.json());

// 2. Log every request so we can see what is happening and how long it takes for our endpoint to be called(this has to come before the routes as well)
app.use(logger);

// 3. Health check endpoint is just to check that our server is running. It is not a route that is part of the API, so it is not in the routes folder.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 4. Notes routes
app.use('/api/notes', notesRoutes);

// 5. No route matched (must come after all routes)
app.use(notFound);

// 6. Catch all errors (must be last)
app.use(errorHandler);

export default app;
