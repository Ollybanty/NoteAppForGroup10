// to be handled by: Tayo Ajibade

// DELETE /api/notes/trash
// emptyTrash will permanently delete every note that is in the trash
import { readNotes, writeNotes } from '../utils/fileStorage.js';

export async function emptyTrash(req, res) {
  // Get all notes from the file
  const allNotes = await readNotes();
  const notesToKeep = allNotes.filter((note) => !note.isTrashed);
  // Work out how many notes were removed
  const deletedCount = allNotes.length - notesToKeep.length;
  if (deletedCount > 0) {
    await writeNotes(notesToKeep);
  }
  res.json({
    message: `${deletedCount} note(s) deleted permanently`,
    data: { deletedCount },
  });
}
