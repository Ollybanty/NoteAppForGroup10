// to be handled by: Suru Emmanuel
import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes/:id
export async function getNoteById(req, res) {
  const { id } = req.params;

  const notes = await readNotes();
  const note = notes.find((n) => n.id === id);

  if (!note || note.isTrashed) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(200).json({ data: note });
}
