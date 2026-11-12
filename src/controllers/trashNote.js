
// to be handled by: Orji Onyinyechi

import { readNotes, writeNotes } from '../utils/fileStorage.js';

// PATCH /api/notes/:id/trash
export async function trashNote(req, res) {
  const { id } = req.params;

  const notes = await readNotes();

  const noteToTrash = notes.find((note) => note.id === id);

  if (noteToTrash === undefined) {
    return res.status(404).json({ error: 'Note not found' });
  }

  if (noteToTrash.isTrashed) {
    return res.status(400).json({ error: 'Note is already in trash' });
  }

  const now = new Date().toISOString();

  noteToTrash.isTrashed = true;
  noteToTrash.trashedAt = now;
  noteToTrash.updatedAt = now;

  await writeNotes(notes);

  return res.status(200).json({
    message: 'Note moved to trash successfully',
    data: noteToTrash,
  });
}

