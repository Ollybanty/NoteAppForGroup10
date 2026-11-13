// to be handled by: Oladunni Amos Abimbola

// PATCH /api/notes/:id/pin
// PLACEHOLDER: replace the line inside this function with your code. Keep the function name.
// export async function pinNote(req, res) {
//   res.status(501).json({ error: 'Not built yet' });
// }

import React, { useState } from "react";

const [note, setNote] = useState({
  id: "3b241101-e2bb-4255-8caf-4136c566a962",
  title: "Our first note",
  content: "We are working on a new note app",
  isPinned: false
});

const togglePlin = () => {
  setNote({
    ...note,
    isPinned: !note.isPinned
  });
};

return (
  <div>
    <h2>{note.title}</h2>
    <p>{note.content}</p>

    <button onClick={togglePin}>
      {note.isPinned ? "Unpin Note 📌" : "Pin Note 📌"}
    </button>
  </div>
);

export default App;