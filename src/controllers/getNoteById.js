// to be handled by: Suru Emmanuel

// GET /api/notes/:id
// PLACEHOLDER: replace the line inside this function with your code. Keep the function name.

import { readNotes } from '../utils/fileStorage.js';

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;

    const notes = await readNotes();
    const note = notes.find((n) => String(n.id) === id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json(note);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
