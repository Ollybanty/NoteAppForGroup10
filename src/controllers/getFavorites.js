// to be handled by: Ovie Toby
import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes/favorites
export async function getFavorites(req, res) {
  const notes = await readNotes();
  const favorites = notes.filter((note) => note.favorite && !note.isTrashed);

  res.json({ data: favorites, count: favorites.length });
}
