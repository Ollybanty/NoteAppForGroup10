// to be handled by: Tayo Ajibade

// DELETE /api/notes/trash
// emptyTrash will permanently delete everynote that is in the trash
import { readNotes, writeNotes } from '../utils/fileStorage.js'

export async function emptyTrash(req, res, next) {

  try{
    // get all notes rom the ffiiile
    const allNotes = await readNotes();
    const notesToKeep = [];
    for (const note of allNotes) {
      if(note.isTrashed === true) {
        //meaning note is in the trash already, do nothing
      } else {
        notesToKeep.push(note);
      }
    }
    // Here, we work out how many notes were removed
    const deletedCount = allNotes.length - notesToKeep.length;
    if (deletedCount > 0) {
      await writeNotes(notesToKeep);
    }
    // Reply to request
    res.status(200).json({
      message: 'Trash emptied',
      deletedCount: deletedCount,
    });
  } catch (error) {
    next(error)
  }
}
