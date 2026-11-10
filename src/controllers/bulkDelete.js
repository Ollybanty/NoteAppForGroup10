// to be handled by: Oniwon Faith
import { readNotes, writeNotes } from '../utils/fileStorage.js';
// POST /api/notes/bulk-delete
// PLACEHOLDER: replace the line inside this function with your code. Keep the function name.
export async function bulkDelete(req, res) {
  const { ids } = req.body;
  const notes = await readNotes()

  // const allIdsExist = ids.every(id => notes.some(note => note.id === id));
  // if (allIdsExist === false) {
  //   return res.status(404).json({ message: "Note not found" });
  // }

  const missingIds = ids.filter(
    id => !notes.some(note => note.id === id)
  );
  const missingMessages = missingIds.map(
    id => `${id} does not exist.`
  );

  const validIds = ids.filter(
    id => notes.some(note => note.id === id)
  );

  const alreadyTrashedIds = ids.filter(
    id => notes.some(note => note.id === id && note.isTrashed)
  );
  const trashedMessages = alreadyTrashedIds.map(
    id => `${id} is already trashed.`
  );

  const eligibleIds = validIds.filter(
    id => !alreadyTrashedIds.includes(id)
  );

  const filteredNotes = notes.filter(note => eligibleIds.includes(note.id) && !note.isTrashed);
  const updatedNotes = filteredNotes.map(note => ({
    ...note,
    isTrashed: true,
    trashedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  const remainingNotes = notes.filter(
    note => !eligibleIds.includes(note.id)
  );

  const finalNotes = [...remainingNotes, ...updatedNotes]
  await writeNotes(finalNotes);

  return res.status(200).json({
    message: 'Bulk trash operation completed',
    trashedCount: updatedNotes.length,
    missingMessages: missingMessages,
    trashedMessages: trashedMessages
  });
}
