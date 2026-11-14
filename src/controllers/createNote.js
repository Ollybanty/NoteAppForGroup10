// to be handled by: Oladele
import { randomUUID } from 'node:crypto';
import { readNotes, writeNotes } from '../utils/fileStorage.js';

// POST /api/notes
export async function createNote(req, res) {
  const notes = await readNotes();
  const now = new Date().toISOString();

  const note = {
    id: randomUUID(),
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags ?? [],
    color: null,
    pinned: false,
    archived: false,
    favorite: false,
    isTrashed: false,
    trashedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  notes.push(note);
  await writeNotes(notes);

  res.status(201).json({ message: 'Note created successfully', data: note });
}
