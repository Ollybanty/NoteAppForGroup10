// to be handled by: Oniwon Faith
import { readNotes, writeNotes } from '../utils/fileStorage.js';
// POST /api/notes/bulk-delete
// PLACEHOLDER: replace the line inside this function with your code. Keep the function name.
export async function bulkDelete(req, res) {
  const { ids } = req.body;
  const notes = await readNotes()

  const allIdsExist = ids.every(id => notes.some(note => note.id === id));
  if (allIdsExist === false) {
    return res.status(404).json({ error: "Note not found" });
  }

  const updatedNotes = notes.filter(note => !ids.includes(note.id));
  await writeNotes(updatedNotes);

  res.status(200).json({ message: 'Notes deleted successfully' });
}
