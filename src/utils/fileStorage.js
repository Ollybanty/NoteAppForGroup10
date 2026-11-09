// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// noteApp/data/notes.json (this file is in src/utils, so we go up two folders)
const NOTES_FILE = path.join(import.meta.dirname, '..', '..', 'data', 'notes.json');

// Returns all notes as an array. Returns [] if the file doesn't exist yet.
export async function readNotes() {
  try {
    const text = await readFile(NOTES_FILE, 'utf8');
    if (text.trim() === '') return [];
    return JSON.parse(text);
  } catch (error) {
    if (error.code === 'ENOENT') return []; // file not found (first run)
    throw error;
  }
}

// Saves the whole array, replacing what was in the file.
export async function writeNotes(notes) {
  await mkdir(path.dirname(NOTES_FILE), { recursive: true }); // create data/ if missing
  await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}
