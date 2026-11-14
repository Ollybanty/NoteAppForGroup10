// to be handled by: Orji Onyinyechi
import { autoDelete } from '../utils/autoDelete.js';

// GET /api/notes/trash
export async function getTrash(req, res) {
  const notes = await autoDelete();

  const trashedNotes = notes.filter((note) => note.isTrashed);

  res.json({
    message: 'Trashed notes retrieved successfully',
    data: trashedNotes,
    count: trashedNotes.length,
  });
}
