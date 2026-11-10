// to be handled by: Okorie Peter

import { readNotes, writeNotes } from '../utils/fileStorage.js';
import { randomUUID } from 'node:crypto';

export async function duplicateNote(req, res) {
  const notes = await readNotes();
  const noteId = req.params.id;
  const originalNote = notes.find((item) => item.id === noteId);

  if (!originalNote) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const newId = randomUUID();
  const now = new Date().toISOString();

  const duplicatedNote = {
    ...originalNote,
    id: newId,
    title: originalNote.title + ' (Duplicate)',
    pinned: false,
    archived: false,
    favorite: false,
    isTrashed: false,
    trashedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  notes.push(duplicatedNote);

  await writeNotes(notes);

  return res.status(201).json({ message: 'Note duplicated successfully', data: duplicatedNote });
}
