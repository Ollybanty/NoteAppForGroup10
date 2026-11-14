# Note App

A REST API for creating and managing notes, built with Node.js and Express. Notes are saved in a JSON file.

**Project number:** 10

---

## How to install and run the project

You need [Node.js](https://nodejs.org) installed.

```bash
npm install
npm run dev
```

The server starts on **http://localhost:3500**. Check that it's running by opening
**http://localhost:3500/api/health** in your browser.

| Command                | What it does                                |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Starts the server and restarts it on save   |
| `npm start`            | Starts the server                           |
| `npm run format`       | Formats all the code with Prettier          |
| `npm run format:check` | Lists files that aren't formatted correctly |

---

## List of all endpoints with example request/response

All note endpoints start with `http://localhost:3500/api/notes`.

| Method | Endpoint                   | What it does                                       | Success |
| ------ | -------------------------- | -------------------------------------------------- | ------- |
| GET    | `/api/health`              | Checks that the server is running                  | 200     |
| POST   | `/api/notes`               | Creates a note                                     | 201     |
| GET    | `/api/notes`               | Gets notes, with search, filter, sort and pages    | 200     |
| GET    | `/api/notes/:id`           | Gets one note                                      | 200     |
| PATCH  | `/api/notes/:id`           | Updates a note                                     | 200     |
| DELETE | `/api/notes/:id`           | Deletes a note forever                             | 200     |
| PATCH  | `/api/notes/:id/pin`       | Pins or unpins a note                              | 200     |
| PATCH  | `/api/notes/:id/archive`   | Archives or unarchives a note                      | 200     |
| PATCH  | `/api/notes/:id/favorite`  | Adds or removes a note from favourites             | 200     |
| POST   | `/api/notes/:id/duplicate` | Makes a copy of a note                             | 201     |
| PATCH  | `/api/notes/:id/trash`     | Moves a note to the trash                          | 200     |
| PATCH  | `/api/notes/:id/restore`   | Brings a note back from the trash                  | 200     |
| GET    | `/api/notes/trash`         | Gets the notes in the trash                        | 200     |
| DELETE | `/api/notes/trash`         | Deletes everything in the trash forever            | 200     |
| POST   | `/api/notes/bulk-delete`   | Moves many notes to the trash at once              | 200     |
| GET    | `/api/notes/favorites`     | Gets favourite notes                               | 200     |
| GET    | `/api/notes/archived`      | Gets archived notes                                | 200     |
| GET    | `/api/notes/tags`          | Gets every tag and how many notes use it           | 200     |
| GET    | `/api/notes/stats`         | Gets counts of notes (total, pinned, trashed, ...) | 200     |

### How notes behave

- **Trashed notes count as not found.** Every endpoint returns `404` for a note in the trash, except the trash endpoints (view trash, restore, empty trash, delete forever).
- **The trash is cleared after 30 days.** Notes that have been in the trash for more than 30 days are deleted for good the next time someone views the trash or the stats.
- **Archived notes are hidden from the main list.** Use `GET /api/notes?archived=true` or `GET /api/notes/archived` to see them. Archiving a note also unpins it.
- **Pinned notes always come first** in `GET /api/notes`.
- **Errors** always come back as `{ "error": "..." }`. Validation errors also include a `details` list.

### The note object

Every endpoint that returns a note returns it in this shape:

```json
{
  "id": "3b241101-e2bb-4255-8caf-4136c566a962",
  "title": "Our first note",
  "content": "We are working on a new note app",
  "tags": ["school", "project"],
  "color": null,
  "pinned": false,
  "archived": false,
  "favorite": false,
  "isTrashed": false,
  "trashedAt": null,
  "createdAt": "2026-11-08T10:15:30.000Z",
  "updatedAt": "2026-11-08T10:15:30.000Z"
}
```

| Field                                                    | Rules                                                                               |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `title`                                                  | Required when creating. Text, 1 to 100 characters                                   |
| `content`                                                | Required when creating. Text, up to 5000 characters                                 |
| `tags`                                                   | Optional. Up to 10, saved in lowercase without duplicates                           |
| `color`                                                  | Update only. `null` or one of: red, orange, yellow, green, blue, purple, pink, gray |
| `pinned`, `archived`, `favorite`                         | Update only. `true` or `false`                                                      |
| `id`, `isTrashed`, `trashedAt`, `createdAt`, `updatedAt` | Set by the server. You can't send these                                             |

In the examples below, `{ ...note }` means a full note object like the one above.

### Health check

`GET /api/health`

Response `200`:

```json
{
  "status": "ok",
  "time": "2026-11-08T10:15:30.000Z"
}
```

### Create a note

`POST /api/notes`

Request body (`title` and `content` are required, `tags` is optional):

```json
{
  "title": "Our first note",
  "content": "We are working on a new note app",
  "tags": ["School", "project"]
}
```

Response `201`:

```json
{
  "message": "Note created successfully",
  "data": {
    "id": "3b241101-e2bb-4255-8caf-4136c566a962",
    "title": "Our first note",
    "content": "We are working on a new note app",
    "tags": ["school", "project"],
    "color": null,
    "pinned": false,
    "archived": false,
    "favorite": false,
    "isTrashed": false,
    "trashedAt": null,
    "createdAt": "2026-11-08T10:15:30.000Z",
    "updatedAt": "2026-11-08T10:15:30.000Z"
  }
}
```

Response `400` (missing title and content):

```json
{
  "error": "Validation failed",
  "details": ["\"title\" is required", "\"content\" is required"]
}
```

Response `400` (the body is not valid JSON):

```json
{
  "error": "Your JSON is not valid"
}
```

### Get all notes

`GET /api/notes`

Trashed and archived notes are left out. Pinned notes come first. You can add any of these to the URL:

| Query      | Example           | What it does                                      |
| ---------- | ----------------- | ------------------------------------------------- |
| `search`   | `?search=meeting` | Title or content contains the word (ignores case) |
| `tag`      | `?tag=school`     | Only notes with that tag                          |
| `favorite` | `?favorite=true`  | Only favourite notes                              |
| `archived` | `?archived=true`  | Only archived notes                               |
| `sort`     | `?sort=title`     | `createdAt`, `updatedAt` (default) or `title`     |
| `order`    | `?order=asc`      | `asc` or `desc` (default)                         |
| `page`     | `?page=2`         | Which page (default 1)                            |
| `limit`    | `?limit=5`        | Notes per page (default 10, max 50)               |

Example: `GET /api/notes?tag=school&sort=title&order=asc&page=1&limit=1`

Response `200`:

```js
{
  "data": [{ ...note }],
  "count": 1,
  "pagination": {
    "page": 1,
    "limit": 1,
    "total": 3,
    "totalPages": 3
  }
}
```

`count` is how many notes are on this page. `total` is how many notes matched in all.

### Get one note

`GET /api/notes/:id`

Response `200`:

```js
{
  "data": { ...note }
}
```

Response `404` (wrong id, or the note is in the trash):

```json
{
  "error": "Note not found"
}
```

### Update a note

`PATCH /api/notes/:id`

Send only the fields you want to change:

```json
{
  "title": "Our updated note",
  "color": "blue"
}
```

Response `200`:

```js
{
  "message": "Note updated successfully",
  "data": { ...note }
}
```

Response `400` (field not allowed, or a wrong value):

```json
{
  "error": "Validation failed",
  "details": [
    "\"id\" is not allowed",
    "\"color\" must be null or one of: red, orange, yellow, green, blue, purple, pink, gray"
  ]
}
```

Response `400` (empty body):

```json
{
  "error": "Validation failed",
  "details": ["send at least one field to update"]
}
```

### Delete a note forever

`DELETE /api/notes/:id`

This works on any note, including notes in the trash. It can't be undone.

Response `200`:

```json
{
  "message": "Note deleted permanently"
}
```

### Pin or unpin a note

`PATCH /api/notes/:id/pin`

No body needed. Each call switches `pinned` between `true` and `false`.

Response `200`:

```js
{
  "message": "Pin status updated",
  "data": { ...note }
}
```

### Archive or unarchive a note

`PATCH /api/notes/:id/archive`

No body needed. Each call switches `archived` between `true` and `false`. Archiving also unpins the note.

Response `200`:

```js
{
  "message": "Note archived successfully",
  "data": { ...note }
}
```

When unarchiving, the message is `"Note unarchived successfully"`.

### Add or remove a favourite

`PATCH /api/notes/:id/favorite`

No body needed. Each call switches `favorite` between `true` and `false`.

Response `200`:

```js
{
  "message": "Favorite status updated",
  "data": { ...note }
}
```

### Duplicate a note

`POST /api/notes/:id/duplicate`

No body needed. The copy gets a new id, `(Duplicate)` added to its title, and starts unpinned, unarchived and not a favourite.

Response `201`:

```js
{
  "message": "Note duplicated successfully",
  "data": { ...note }
}
```

Response `400` (the note is in the trash):

```json
{
  "error": "Cannot duplicate a note that is in the trash"
}
```

### Move a note to the trash

`PATCH /api/notes/:id/trash`

Response `200`:

```js
{
  "message": "Note moved to trash successfully",
  "data": { ...note }
}
```

Response `400`:

```json
{
  "error": "Note is already in trash"
}
```

### Restore a note from the trash

`PATCH /api/notes/:id/restore`

Response `200`:

```js
{
  "message": "Note restored successfully",
  "data": { ...note }
}
```

Response `400`:

```json
{
  "error": "Note is not in trash"
}
```

### View the trash

`GET /api/notes/trash`

Notes trashed more than 30 days ago are deleted first, so they never show here.

Response `200`:

```js
{
  "message": "Trashed notes retrieved successfully",
  "data": [{ ...note }],
  "count": 1
}
```

### Empty the trash

`DELETE /api/notes/trash`

Deletes every note in the trash forever. It can't be undone.

Response `200`:

```json
{
  "message": "1 note(s) deleted permanently",
  "data": { "deletedCount": 1 }
}
```

### Bulk delete (move many notes to the trash)

`POST /api/notes/bulk-delete`

This moves the notes to the **trash**, so they can still be restored. To delete them forever, empty the trash.

```json
{
  "ids": ["497170f9-91d0-4162-9bd7-ba57da377873", "wrong-id"]
}
```

Response `200`:

```json
{
  "message": "1 note(s) moved to trash",
  "data": {
    "trashedIds": ["497170f9-91d0-4162-9bd7-ba57da377873"],
    "notFound": ["wrong-id"],
    "alreadyTrashed": []
  }
}
```

Response `400` (`ids` missing, empty, or not a list of ids):

```json
{
  "error": "\"ids\" array of note ids cannot be empty"
}
```

### Favourite notes

`GET /api/notes/favorites`

Response `200`:

```js
{
  "data": [{ ...note }],
  "count": 1
}
```

### Archived notes

`GET /api/notes/archived`

Response `200`:

```js
{
  "data": [{ ...note }],
  "count": 1
}
```

### All tags

`GET /api/notes/tags`

Tags from trashed notes are left out. The most used tag comes first.

Response `200`:

```json
{
  "data": [
    { "tag": "school", "count": 2 },
    { "tag": "project", "count": 2 },
    { "tag": "home", "count": 1 }
  ],
  "count": 3
}
```

### Stats

`GET /api/notes/stats`

`total` includes notes in the trash. `active` is every note that isn't in the trash.

Response `200`:

```json
{
  "data": {
    "total": 3,
    "active": 3,
    "favorites": 1,
    "archived": 0,
    "pinned": 1,
    "trashed": 0,
    "tags": 3
  }
}
```

### Unknown URL

Any URL that doesn't exist, e.g. `GET /api/banana`

Response `404`:

```json
{
  "error": "Route not found: GET /api/banana"
}
```

---

## How to raise a Pull Request

Nobody pushes directly to `dev` or `main`. Create your own branch from `dev`, push it, then open a Pull Request (PR) into `dev`.

```bash
git switch dev && git pull
git switch -c feat/your-feature
# ...make your changes...
npm run format
git add <your files>
git commit -m "feat: what you did"
git push -u origin feat/your-feature
```

| Branch name          | Use it for    |
| -------------------- | ------------- |
| `feat/what-it-does`  | A new feature |
| `fix/what-it-fixes`  | A bug fix     |
| `chore/what-changed` | Setup, config |
| `docs/what-changed`  | README, notes |

Every PR description must answer these three questions:

```markdown
## Why are you raising this PR?

<!-- The problem it solves or the feature it adds -->

## What changes are you making?

<!-- A short list of what you did -->

## What files do your changes touch?

<!-- Every file you added or changed -->
```

Before you open the PR, test your changes in Postman, run `npm run format`, and check that `git status` shows only the files you worked on.

### Team rules for code

1. A note in the trash counts as not found: `if (!note || note.isTrashed)` returns `404`, except on the trash endpoints.
2. Respond with `{ message, data }`, and use `{ error }` for errors.
3. Keep the first line of every file: `// to be handled by: <name>`.
4. One feature per branch, always created from the latest `dev`. Once your PR is merged, delete the branch.
5. Commit messages start with the type: `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`.

---

## Files you must not edit

The whole team depends on these files, so only Oladele (team lead) changes them. If you need something changed in one of them, ask in the group chat.

| File                                           | Why                                                   |
| ---------------------------------------------- | ----------------------------------------------------- |
| `src/server.js`, `src/app.js`                  | Start the app and connect everything in order         |
| `src/routes/notes.routes.js`                   | Every URL and the controller it runs                  |
| `src/middleware/` (all four files)             | Logging, validation, 404s and error handling          |
| `src/utils/fileStorage.js`                     | The only file that reads and writes `data/notes.json` |
| `package.json`, `package-lock.json`            | Packages and scripts. Only the lead installs packages |
| `.gitignore`, `.prettierrc`, `.prettierignore` | Project settings                                      |

Every other file has an owner in its first line (`// to be handled by: ...`). Only edit the files with your name on them.

---

## Team member names and what each person built

| #   | Name                     | What they built                                                                                                        |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | Oladele Ogunyemi         | Team lead. Server, app, routes, create note, get all notes, validation, file storage, logger, not found, error handler |
| 2   | Orji Onyinyechi          | Move to trash, view trash (with Oladele)                                                                               |
| 3   | Okorie Peter Chinecherem | Duplicate note, restore from trash                                                                                     |
| 4   | Oniwon Faith             | Delete note, bulk delete                                                                                               |
| 5   | Omeh Kingsley            | Update note, stats                                                                                                     |
| 6   | Tayo Ajibade             | Empty trash, auto-delete after 30 days                                                                                 |
| 7   | Oladunni Amos Abimbola   | Pin note, archive note                                                                                                 |
| 8   | Ovie Toby                | Favourite note, favourites list, archived list                                                                         |
| 9   | Suru Emmanuel            | Get one note, search, filter, sort and pagination                                                                      |
| 10  | Omajuwa Leslie           | Get all tags (with Oladele), Postman collection (with Oladele)                                                         |
