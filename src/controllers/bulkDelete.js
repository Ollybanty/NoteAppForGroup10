// to be handled by: Oniwon Faith
import { readNotes, writeNotes } from '../utils/fileStorage.js';
// POST /api/notes/bulk-delete
// Moves the notes to the trash, so they can still be restored
export async function bulkDelete(req, res) {
  const ids = req.body?.ids;

  if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== 'string')) {
    return res.status(400).json({ error: '"ids" array of note ids cannot be empty' });
  }

  const notes = await readNotes();

  const missingIds = ids.filter((id) => !notes.some((note) => note.id === id));
  const alreadyTrashedIds = ids.filter((id) =>
    notes.some((note) => note.id === id && note.isTrashed),
  );
  const eligibleIds = ids.filter(
    (id) => !missingIds.includes(id) && !alreadyTrashedIds.includes(id),
  );

  // this is done, so the updated notes keep their position in the file
  const now = new Date().toISOString();
  const updatedNotes = notes.map((note) =>
    eligibleIds.includes(note.id)
      ? { ...note, isTrashed: true, trashedAt: now, updatedAt: now }
      : note,
  );

  await writeNotes(updatedNotes);

  res.json({
    message: `${eligibleIds.length} note(s) moved to trash`,
    data: {
      trashedIds: eligibleIds,
      notFound: missingIds,
      alreadyTrashed: alreadyTrashedIds,
    },
  });
}
