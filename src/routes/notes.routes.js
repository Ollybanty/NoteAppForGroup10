// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).
import { Router } from 'express';
import { validateNote } from '../middleware/validateNote.js';
import { createNote } from '../controllers/createNote.js';
import { getAllNotes } from '../controllers/getAllNotes.js';

const router = Router();

// All paths below start with /api/notes

router.get('/', getAllNotes);
router.post('/', validateNote, createNote);

// Fixed paths go here, ABOVE /:id:
// /tags, /stats, /favorites, /archived, /trash, /bulk-delete

// Routes with an id go here:
// /:id, /:id/pin, /:id/archive, /:id/favorite, /:id/trash, /:id/restore, /:id/duplicate
export default router;
