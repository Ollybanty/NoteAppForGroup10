// to be handled by: Omajuwa Leslie
import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes/tags
export async function getTags(req, res) {
  const notes = await readNotes();
  const counts = {};

  notes.forEach((note) => {
    if (!note.isTrashed) {
      note.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });

  // we need an array to sort, so convert the object first, then sort by count
  const tags = Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  return res.status(200).json({ data: tags, count: tags.length });
}
