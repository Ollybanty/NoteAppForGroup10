// to be handled by: Ovie Toby
import { readNotes, writeNotes } from '../utils/fileStorage.js';

// PATCH /api/notes/:id/favorite
export async function favoriteNote(req, res) {
  const notes = await readNotes();
  const note = notes.find((item) => item.id === req.params.id);

  if (!note || note.isTrashed) {
    return res.status(404).json({ error: 'Note not found' });
  }

  note.favorite = !note.favorite;
  note.updatedAt = new Date().toISOString();
  await writeNotes(notes);

  res.json({ message: 'Favorite status updated', data: note });
}
