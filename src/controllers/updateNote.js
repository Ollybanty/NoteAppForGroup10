// to be handled by: Omeh Kingsley

import { readNotes, writeNotes } from '../utils/fileStorage.js';

// PATCH /api/notes/:id
export async function updateNote(req, res) {
  const notes = await readNotes();
  const { id } = req.params;
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const noteToUpdate = notes[noteIndex];
  const updatedNote = {
    ...noteToUpdate,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  if (updatedNote.tags !== undefined) {
    updatedNote.tags = [...new Set(updatedNote.tags.map((tag) => tag.trim().toLowerCase()))];
  }

  notes[noteIndex] = updatedNote;
  await writeNotes(notes);

  return res.status(200).json({ message: 'Note updated successfully', data: updatedNote });
}
