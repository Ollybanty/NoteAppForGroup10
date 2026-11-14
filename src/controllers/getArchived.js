// to be handled by: Ovie Toby
import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes/archived
export async function getArchived(req, res) {
  const notes = await readNotes();
  const archived = notes.filter((note) => note.archived && !note.isTrashed);

  res.json({ data: archived, count: archived.length });
}
