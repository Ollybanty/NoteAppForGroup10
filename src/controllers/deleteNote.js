// to be handled by: Oniwon Faith
import { readNotes, writeNotes } from '../utils/fileStorage.js';
// DELETE /api/notes/:id
export async function deleteNote(req, res) {
  const { id } = req.params;
  const notes = await readNotes();

  const noteToDelete = notes.find((note) => note.id === id);
  if (noteToDelete === undefined) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updatedNotes = notes.filter((note) => note.id !== id);
  await writeNotes(updatedNotes);

  res.status(200).json({ message: 'Note deleted permanently' });
}
