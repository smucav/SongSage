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

Use **curl**, **Postman**, or your browser to test the `/songs` endpoint:

```bash
curl http://localhost:8080/songs
```

**Expected Response:**

```json
[
  {"ID": 1, "Title": "Tizita", "Artist": "Muluken Melesse", "Album": "Ethiopian Hits", "Year": 1973},
  {"ID": 2, "Title": "Yene Habesha", "Artist": "Betty G", "Album": "Manew Fitsum", "Year": 2015},
  {"ID": 3, "Title": "Ere Mela Mela", "Artist": "Mahmoud Ahmed", "Album": "Ere Mela Mela", "Year": 1974},
  {"ID": 4, "Title": "Tikur Sew", "Artist": "Teddy Afro", "Album": "Tikur Sew", "Year": 2012},
  {"ID": 5, "Title": "Abebayehosh", "Artist": "Aster Aweke", "Album": "Aster", "Year": 1989}
]
```

---

## 📌 API Endpoints

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/songs` | Retrieve all songs |

✅ **Additional endpoints** (`POST`, `PUT`, `DELETE`) will be added in subsequent steps.

---

## 🚧 Next Steps

* Implement additional CRUD endpoints (`POST`, `PUT`, `DELETE`) for the Go backend.
* Set up the React frontend with **Webpack**, **Redux Toolkit**, **Redux-Saga**, and **Emotion**.
* Document Webpack configuration and further API details.

---

**Happy Coding! 🎶✨**
