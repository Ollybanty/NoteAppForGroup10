// to be handled by: Suru Emmanuel

// PLACEHOLDER: a simple version so other files can use this function today.
// It only hides trashed notes and handles ?archived=true and ?favorite=true.
// Replace it with the full version (filter, search, sort, paginate). Keep the function name
// and the shape it returns: { notes, pagination }.

export function applyListOptions(notes, query) {
  // Hide trashed
  let results = notes.filter((note) => !note.isTrashed);

  // Archived / favorite
  results = results.filter((note) => note.archived === (query.archived === 'true'));
  if (query.favorite === 'true') results = results.filter((note) => note.favorite);

  // Tag
  if (query.tag) {
    results = results.filter((note) => note.tag === query.tag);
  }

  // Search using title or content, ignoring case
  if (query.search) {
    const text = query.search.toLowerCase();
    results = results.filter(
      (note) =>
        (note.title || '').toLowerCase().includes(text) ||
        (note.content || '').toLowerCase().includes(text),
    );
  }

  // Sorting
  const allowed = ['createdAt', 'updatedAt', 'title'];
  const field = allowed.includes(query.sort) ? query.sort : 'updatedAt';
  const direction = query.order === 'asc' ? 1 : -1;

  results.sort((a, b) => {
    if (a[field] < b[field]) return -1 * direction;
    if (a[field] > b[field]) return 1 * direction;
    return 0;
  });

  // Pinned notes first
  const pinned = results.filter((note) => note.pinned);
  const others = results.filter((note) => !note.pinned);
  results = [...pinned, ...others];

  // Pagination (Am assuming that limit default 10 and max limit 50)
  let page = Number(query.page) || 1;
  let limit = Number(query.limit) || 10;
  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 50) limit = 50;

  const total = results.length;
  let totalPages = Math.ceil(total / limit);
  if (totalPages < 1) totalPages = 1;

  const start = (page - 1) * limit;

  return {
    notes: results.slice(start, start + limit),
    pagination: { page, limit, total, totalPages },
  };
}
