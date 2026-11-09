// to be handled by: Oladele
import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes
export async function getAllNotes(req, res) {
  const notes = await readNotes();

  // as per our rules, we should not show trashed notes in the list of all notes.
  const visible = notes.filter((note) => !note.isTrashed);

  res.json({ data: visible, count: visible.length });
}
