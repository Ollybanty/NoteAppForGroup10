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
  if(originalNote.isTrashed){
     return res.status(400).json({ error: 'Cannot duplicate a note that is in the trash' });
  }

  const newId = randomUUID();
  const now = new Date().toISOString();


  const duplicatedNote = {
    ...originalNote,
    id: newId,
    title: (originalNote.title + ' (Duplicate)').slice(0, 100),
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
