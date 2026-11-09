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

All note endpoints start with `http://localhost:3500/api/notes`. More endpoints will be added here as each feature is merged.

| Method | Endpoint      | What it does                      | Success |
| ------ | ------------- | --------------------------------- | ------- |
| GET    | `/api/health` | Checks that the server is running | 200     |
| POST   | `/api/notes`  | Creates a note                    | 201     |
| GET    | `/api/notes`  | Gets all notes (except trashed)   | 200     |

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
  "message": "Note created",
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

Tags are saved in lowercase, without duplicates.

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

Response `200`:

```json
{
  "data": [
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
  ],
  "count": 1
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

| #   | Name                     | What they built                                                                                                               |
| --- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | Oladele Ogunyemi         | Team lead. Server, app, routes, create note, get all notes, stats, validation, file storage, logger, not found, error handler |
| 2   | Orji Onyinyechi          | Move to trash, view trash                                                                                                     |
| 3   | Okorie Peter Chinecherem | Duplicate note, restore from trash                                                                                            |
| 4   | Oniwon Faith             | Delete note, bulk delete                                                                                                      |
| 5   | Omeh Kingsley            | Update note                                                                                                                   |
| 6   | Tayo Ajibade             | Empty trash, auto-delete after 30 days                                                                                        |
| 7   | Oladunni Amos Abimbola   | Pin note, archive note                                                                                                        |
| 8   | Ovie Toby                | Favourite note                                                                                                                |
| 9   | Suru Emmanuel            | Get one note, search, filter, sort and pagination                                                                             |
| 10  | Omajuwa Leslie           | Get all tags, Postman collection                                                                                              |
