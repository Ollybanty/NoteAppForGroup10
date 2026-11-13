// to be handled by: Oladunni Amos Abimbola
import { readNotes, writeNotes } from '../utils/fileStorage.js';

// PATCH /api/notes/:id/pin
export async function pinNote(req, res) {
  const notes = await readNotes();

  const note = notes.find((note) => note.id === req.params.id);

  if (!note || note.isTrashed) {
    return res.status(404).json({ error: 'Note not found' });
  }

  note.pinned = !note.pinned;
  note.updatedAt = new Date().toISOString();

  await writeNotes(notes);

  return res.json({
    message: 'Pin status updated',
    data: note,
  });
}
