// to be handled by: Oladele
import { readNotes } from '../utils/fileStorage.js';
import { applyListOptions } from '../utils/listOptions.js';

// GET /api/notes   (supports ?tag= ?search= ?sort= ?order= ?page= ?limit= ?archived= ?favorite=)
export async function getAllNotes(req, res) {
  const notes = await readNotes();

  // listOptions hides trashed notes, then filters, sorts and splits into pages for us
  const { notes: data, pagination } = applyListOptions(notes, req.query);

  res.json({ data, count: data.length, pagination });
}
