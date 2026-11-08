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

> This will be added as we progress with the project.

### Health check

`GET /api/health`

```json
{
  "status": "ok",
  "time": "2026-11-08T10:15:30.000Z"
}
```

---

## Team member names and what each person built

| #   | Name                     | What they built                                                                                                   |
| --- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Oladele Ogunyemi         | Team lead. Server, app, routes, create note, get all notes, stats, file storage, logger, not found, error handler |
| 2   | Orji Onyinyechi          | Move to trash, view trash                                                                                         |
| 3   | Okorie Peter Chinecherem | Duplicate note, restore from trash                                                                                |
| 4   | Oniwon Faith             | Delete note, bulk delete                                                                                          |
| 5   | Omeh Kingsley            | Update note, validation                                                                                           |
| 6   | Tayo Ajibade             | Empty trash                                                                                                       |
| 7   | Oladunni Amos Abimbola   | Pin note, archive note                                                                                            |
| 8   | Ovie Toby                | Favourite note                                                                                                    |
| 9   | Suru Emmanuel            | Get one note, search, filter, sort and pagination                                                                 |
| 10  | Omajuwa Leslie           | Get all tags                                                                                                      |
