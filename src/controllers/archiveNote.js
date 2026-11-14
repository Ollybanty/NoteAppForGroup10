// to be handled by: Oladunni Amos Abimbola
import { readNotes, writeNotes } from '../utils/fileStorage.js';
// PATCH /api/notes/:id/archive
export async function archiveNote(req, res) {
  const notes = await readNotes();

  const note = notes.find((note) => note.id === req.params.id);

  if (!note || note.isTrashed) {
    return res.status(404).json({ error: 'Note not found' });
  }

  note.archived = !note.archived;
  if (note.archived) note.pinned = false;
  note.updatedAt = new Date().toISOString();

  await writeNotes(notes);

  return res.json({
    message: `Note ${note.archived ? 'archived' : 'unarchived'} successfully`,
    data: note,
  });
}
