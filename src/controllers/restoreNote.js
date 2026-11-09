// to be handled by: Okorie Peter

import { readNotes, writeNotes} from '../utils/fileStorage.js';

// PATCH /api/notes/:id/restore
// PLACEHOLDER: replace the line inside this function with your code. Keep the function name.
export async function restoreNote(req, res) {
  const notes = await readNotes();

  const noteId = req.params.id;

  const note = notes.find((item) => item.id === noteId);

  if(!note){
     return res.status(404).json({error: "Note not found"});
  }

  if(!note.isTrashed){
    return res.status(400).json({error: "Note is not in trash"});
  }

  note.isTrashed = false;
  note.trashedAt = null;
  note.updatedAt = new Date().toISOString();

  await writeNotes(notes);

  return res.status(200).json({message: "Note restored successfully", data: note});
}
