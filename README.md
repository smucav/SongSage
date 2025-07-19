# SongSaga

**SongSaga** is a full-stack application to manage a list of songs, built with a **React** frontend and a **Go** backend. The frontend interacts with a REST API to perform CRUD operations on songs.

---

## 📁 Project Structure

```
SongSaga/
├── backend/
│   ├── main.go         # Go backend server
│   ├── go.mod          # Go module file
│   └── go.sum          # Go dependencies
├── frontend/           # React frontend (to be implemented)
└── README.md           # Project documentation
```

---

## ⚙️ Backend Setup Instructions

### ✅ Prerequisites

* Install **Go** (version **1.21** or later): [Download Go](https://go.dev/dl/)
* Ensure **Go** is added to your system `PATH`.

---

### 🚀 Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Initialize the Go module (if not already done):

   ```bash
   go mod init SongSaga/backend
   ```

3. Run the server:

   ```bash
   go run main.go
   ```

The server will start on [http://localhost:8080](http://localhost:8080).

---

## 🧪 Testing the API

Use **curl**, **Postman**, or your browser to test the endpoints:

### ✅ GET all songs (paginated)

```bash
curl "http://localhost:8080/songs?page=1&limit=10"
```

**Response:**

```json
[
  {"ID": 1, "Title": "Tizita", "Artist": "Muluken Melesse", "Album": "Ethiopian Hits", "Year": 1973},
  {"ID": 2, "Title": "Yene Habesha", "Artist": "Betty G", "Album": "Manew Fitsum", "Year": 2015},
]
```

### ✅ POST a new song

```bash
curl -X POST http://localhost:8080/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"Ere Mela Mela","artist":"Mahmoud Ahmed","album":"Ere Mela Mela","year":1974}'
```

**Response:**

```json
{"ID": 3, "Title": "Ere Mela Mela", "Artist": "Mahmoud Ahmed", "Album": "Ere Mela Mela", "Year": 1974},
```

### ✅ PUT update a song

```bash
curl -X PUT http://localhost:8080/songs/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Tizita Updated","artist":"Muluken Melesse","album":"Ethiopian Hits","year":1974}'
```

**Response:**

```json
{"ID": 1, "Title": "Tizita", "Artist": "Muluken Melesse", "Album": "Ethiopian Hits", "Year": 1974},
```

### ✅ DELETE a song

```bash
curl -X DELETE http://localhost:8080/songs/1
```

**Response:** `(204 No Content)`

---

## 📌 API Endpoints

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/songs?page=X&limit=Y` | Retrieve paginated songs |
| POST   | `/songs`                | Create a new song        |
| PUT    | `/songs/:id`            | Update a song by ID      |
| DELETE | `/songs/:id`            | Delete a song by ID      |

**Notes:**

* Pagination defaults: `page=1`, `limit=10` (max 100).
* POST/PUT require valid JSON with `title`, `artist`, `album`, and `year` (1900–2025).
* Errors return appropriate HTTP status codes (e.g., 400, 404).

---

## 🚧 Next Steps

* Set up the React frontend with manual Webpack configuration.
* Implement a paginated song list with a stunning, responsive UI.
* Add CRUD functionality with polished forms and animations.
* Document Webpack setup and frontend development process.
