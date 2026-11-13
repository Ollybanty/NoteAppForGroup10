import { readNotes } from '../utils/fileStorage.js';

// GET /api/notes/stats
export async function getStats(req, res) {
  const notes = await readNotes();

  const totalNotes = notes.length;
  const activeNotes = notes.filter((note) => !note.isTrashed).length;
  const favoriteNotes = notes.filter((note) => note.favorite && !note.isTrashed).length;
  const archivedNotes = notes.filter((note) => note.archived && !note.isTrashed).length;
  const pinnedNotes = notes.filter((note) => note.pinned && !note.isTrashed).length;
  const trashedNotes = notes.filter((note) => note.isTrashed).length;

  const uniqueTags = new Set(notes.flatMap((note) => (Array.isArray(note.tags) ? note.tags : [])));

  return res.status(200).json({
    data: {
      total: totalNotes,
      active: activeNotes,
      favorites: favoriteNotes,
      archived: archivedNotes,
      pinned: pinnedNotes,
      trashed: trashedNotes,
      tags: uniqueTags.size,
    },
  });
}
