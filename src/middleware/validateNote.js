// to be handled by: Oladele
// DO NOT EDIT: Guys please do not touch this file, the whole team depends on it. If you need a change here or you intend on making any change to the file, please let's talk about it together first. That's why I added comments where necessary, for easy understanding Thank you :).

// As agreed together as a team, this is the Rules for each note:
//   title     string, required, 1 to 100 characters (spaces at the ends removed)
//   content   string, required, max 5000 characters
//   tags      array of strings, optional, max 10 (saved lowercase, no duplicates)
//   color     null or one of COLORS. Only allowed on update, not on create
//   pinned, archived, favorite   true or false. Only allowed on update
// id, isTrashed, trashedAt, createdAt and updatedAt are set by the server, never by the user.

export const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray'];

// Used on POST /api/notes and PATCH /api/notes/:id
export function validateNote(req, res, next) {
  const body = req.body;
  const isCreating = req.method === 'POST';

  // 1. The body must be a JSON object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Request body must be a JSON object' });
  }

  const errors = []; // collect every problem, so the client can fix them all at once

  // 2. Only allow fields the client is permitted to send
  const allowed = isCreating
    ? ['title', 'content', 'tags']
    : ['title', 'content', 'tags', 'color', 'pinned', 'archived', 'favorite'];

  for (const field of Object.keys(body)) {
    if (!allowed.includes(field)) {
      errors.push(`"${field}" is not allowed${field === 'color' ? ' when creating a note' : ''}`);
    }
  }

  // 3. Required fields (only when creating)
  if (isCreating) {
    for (const field of ['title', 'content']) {
      if (body[field] === undefined) errors.push(`"${field}" is required`);
    }
  }

  // 4. title and content must be strings, within the limits
  for (const field of ['title', 'content']) {
    if (body[field] !== undefined && typeof body[field] !== 'string') {
      errors.push(`"${field}" must be a string`);
    }
  }
  if (typeof body.title === 'string' && body.title.trim() === '') {
    errors.push('"title" cannot be empty');
  }
  if (typeof body.title === 'string' && body.title.trim().length > 100) {
    errors.push('"title" must be 100 characters or less');
  }
  if (typeof body.content === 'string' && body.content.length > 5000) {
    errors.push('"content" must be 5000 characters or less');
  }

  // 5. tags: an array of non empty strings, at most 10
  if (body.tags !== undefined) {
    if (!Array.isArray(body.tags)) {
      errors.push('"tags" must be an array of strings, e.g. ["school", "maths"]');
    } else if (body.tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
      errors.push('every tag must be a non empty string');
    } else if (body.tags.length > 10) {
      errors.push('a note can only have up to 10 tags');
    }
  }

  // 6. color: null (to remove it) or one of the allowed colours
  if (body.color !== undefined && body.color !== null && !COLORS.includes(body.color)) {
    errors.push(`"color" must be null or one of: ${COLORS.join(', ')}`);
  }

  // 7. pinned, archived, favorite must be true or false
  for (const field of ['pinned', 'archived', 'favorite']) {
    if (body[field] !== undefined && typeof body[field] !== 'boolean') {
      errors.push(`"${field}" must be true or false`);
    }
  }

  // 8. An update must change something
  if (!isCreating && Object.keys(body).length === 0) {
    errors.push('send at least one field to update');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // 9. Tidy the data before the controller uses it
  if (body.title !== undefined) body.title = body.title.trim();
  if (body.tags !== undefined) {
    const cleaned = body.tags.map((tag) => tag.trim().toLowerCase()); // " School " → "school"
    body.tags = [...new Set(cleaned)]; // a Set removes duplicates
  }

  next();
}
