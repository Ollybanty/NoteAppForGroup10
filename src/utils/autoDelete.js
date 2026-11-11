// to be handled by: Tayo Ajibade
import { readNotes, writeNotes } from './fileStorage.js';

// This code wil permanently take out notes that have been in the trash for more than a 30-day period.
// In addition to doing this. the code returns only notes that are left.
export async function autoDelete() {
  const allNotes = await readNotes(); //this gets all notes from file
  const oneDay = 24 * 60 * 1000; //converting time to milliseconds
  const thirtyDays = 30 * oneDay;
  const now = Date.now(); //this gets the time right now, in milliseconds
  const notesToKeep = []; //ths initializes an empty list for the notes we hope to keep later

  //iterate through all notes and keep only untrashed notes
  for (const note of allNotes) {
    if (note.isTrashed !== true) {
      notesToKeep.push(note);
      continue;
    }

    //perhaps there is a note with no date label, we want to make provision for that too in our code
    //it should be kept, 'cos we don't know how old it is
    if (note.trashedAt === null) {
      notesToKeep.push(note);
      continue;
    }

    //turn the date text into a number
    const trashedTime = new Date(note.trashedAt).getTime();
    const timeInTrash = now - trashedTime;
    if (timeInTrash > thirtyDays) {
      //do nothing
    } else {
      notesToKeep.push(note);
    }
  }

  //this conditional saves the file only if at least one note was removed
  if (notesToKeep.length !== allNotes.length) {
    await writeNotes(notesToKeep);
  }

  return notesToKeep;
}

