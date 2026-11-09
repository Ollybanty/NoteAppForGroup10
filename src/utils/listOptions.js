// to be handled by: Suru Emmanuel

// PLACEHOLDER: a simple version so other files can use this function today.
// It only hides trashed notes and handles ?archived=true and ?favorite=true.
// Replace it with the full version (filter, search, sort, paginate). Keep the function name
// and the shape it returns: { notes, pagination }.
export function applyListOptions(notes, query) {
  let results = notes.filter((note) => !note.isTrashed);
  results = results.filter((note) => note.archived === (query.archived === 'true'));
  if (query.favorite === 'true') results = results.filter((note) => note.favorite);

  return {
    notes: results,
    pagination: { page: 1, limit: results.length, total: results.length, totalPages: 1 },
  };
}
