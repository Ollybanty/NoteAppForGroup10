// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).
import { Router } from 'express';
import { validateNote } from '../middleware/validateNote.js';
import { createNote } from '../controllers/createNote.js';
import { getAllNotes } from '../controllers/getAllNotes.js';
import { getFavorites } from '../controllers/getFavorites.js';
import { getArchived } from '../controllers/getArchived.js';
import { getNoteById } from '../controllers/getNoteById.js';
import { updateNote } from '../controllers/updateNote.js';
import { deleteNote } from '../controllers/deleteNote.js';
import { pinNote } from '../controllers/pinNote.js';
import { archiveNote } from '../controllers/archiveNote.js';
import { favoriteNote } from '../controllers/favoriteNote.js';
import { duplicateNote } from '../controllers/duplicateNote.js';
import { trashNote } from '../controllers/trashNote.js';
import { restoreNote } from '../controllers/restoreNote.js';
import { getTrash } from '../controllers/getTrash.js';
import { emptyTrash } from '../controllers/emptyTrash.js';
import { bulkDelete } from '../controllers/bulkDelete.js';
import { getTags } from '../controllers/getTags.js';
import { getStats } from '../controllers/getStats.js';

const router = Router();

// All paths below start with /api/notes
// Every route already exists. Build your controller, you don't need to change this file.

// 1. List and create
router.get('/', getAllNotes); // Oladele
router.post('/', validateNote, createNote); // Oladele

// 2. Fixed paths. They MUST stay above /:id, or /:id will catch them
router.get('/tags', getTags); // Omajuwa
router.get('/stats', getStats); // Omeh
router.get('/favorites', getFavorites); // Ovie
router.get('/archived', getArchived); // Ovie
router.get('/trash', getTrash); // Orji
router.delete('/trash', emptyTrash); // Tayo
router.post('/bulk-delete', bulkDelete); // Oniwon

// 3. Routes with an id
router.get('/:id', getNoteById); // Suru
router.patch('/:id', validateNote, updateNote); // Omeh
router.delete('/:id', deleteNote); // Oniwon
router.patch('/:id/pin', pinNote); // Oladunni
router.patch('/:id/archive', archiveNote); // Oladunni
router.patch('/:id/favorite', favoriteNote); // Ovie
router.patch('/:id/trash', trashNote); // Orji
router.patch('/:id/restore', restoreNote); // Okorie
router.post('/:id/duplicate', duplicateNote); // Okorie

export default router;
