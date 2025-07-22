# 🎵 SongSaga — Song Manager

**SongSaga** is a **full-stack application** to manage a list of songs.
It showcases a modern React frontend with **Redux Toolkit**, **Redux-Saga**, **Emotion**, **Styled System**, and a **custom Webpack setup**, plus a simple **Go backend API**.

---

## 📌 Features

* ✅ Display paginated list of songs (title, artist, album, year, genre)
* ✅ Full CRUD operations (Create, Read, Update, Delete) via REST API
* ✅ Global state management with **Redux Toolkit**
* ✅ API side effects handled with **Redux-Saga**
* ✅ Theming & responsive styling using **Emotion** + **Styled System**
* ✅ Fully custom **Webpack configuration** (no CRA)

---

## ⚙️ Backend

The backend is a lightweight **Go HTTP server** with:

* `GET /songs?page=&limit=` — paginated list
* `POST /songs` — add new song
* `PUT /songs/:id` — update a song
* `DELETE /songs/:id` — delete a song

**CORS** is configured to allow requests from your frontend URL.

---

## ⚙️ Frontend Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the backend

```bash
# From backend folder
go run main.go
```

By default, the backend runs at [http://localhost:8080](http://localhost:8080).

### 3️⃣ Run the frontend

```bash
npx webpack serve
```

The frontend runs at [http://localhost:3000](http://localhost:3000).

---

## 📡 Production Deployment

SongSaga is production-ready!
The recommended deployment is:

* **Frontend** → [Netlify](https://www.netlify.com)
* **Backend** → [Railway](https://railway.app) or any Go-compatible host

✅ **Important for CORS:**
Update your Go CORS middleware to handle both local and production origins:

```go
origin := r.Header.Get("Origin")
if origin == "http://localhost:3000" || origin == "https://songsage.netlify.app" {
  w.Header().Set("Access-Control-Allow-Origin", origin)
}
```

✅ **Important for API calls:**
In **production**, your frontend must fetch the backend with the correct domain.
So set the `API_BASE_URL` as a **Netlify Environment Variable**:

```
API_BASE_URL=https://YOUR-BACKEND.up.railway.app
```

Netlify automatically injects this at build time (thanks to `dotenv-webpack`).

---

## 🛠️ Webpack Configuration

No CRA! 🎉
Webpack is configured manually in `webpack.config.js`:

* Transpiles `.jsx` with Babel
* Loads `.env` values and Netlify environment variables using `dotenv-webpack`
* Generates `index.html` with `HtmlWebpackPlugin`
* Handles static assets (images/SVGs)
* Dev server runs on port 3000 with `historyApiFallback` for routing

---

## ✅ Testing

Includes:

* **Unit tests** for Redux slices (`songsSlice`)
* **Component tests** for `AddSong` form with React Testing Library
* Runs in `jest-environment-jsdom`

Run tests:

```bash
npx jest
```

---

## 📝 How I verified it works

* Manually tested all CRUD operations & pagination in the browser
* Verified backend logs for API requests
* Ran Jest tests with `npx jest`
* Debugged using DevTools console logs

---

## 🚀 Bonus Points

* ✅ Manual Webpack config
* ✅ Connected Redux + Redux-Saga
* ✅ Full CRUD API in Go
* ✅ Ready for multi-environment deploy
* ✅ Clear, conventional commits

---

## 📂 Project Structure

```
SongSaga/
├── backend/
│   ├── main.go         # Go backend server
│   ├── go.mod          # Go module file
│   └── go.sum          # Go dependencies
├── frontend/
│   ├── src/
│   │   ├── app/         # store.js, theme.js
│   │   ├── features/    # Redux slice & saga
│   │   ├── pages/       # AddSong, EditSong, SongList
│   │   ├── components/  # Styled components
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js
│   ├── .env
│   ├── babel.config.js
│   ├── package.json
└── README.md           # Project documentation
```

---

## ✅ Run it locally

1. Clone this repo.
2. `npm install`
3. Start backend: `go run main.go`
4. Start frontend: `npx webpack serve`
5. Visit [http://localhost:3000](http://localhost:3000)

---

**Deployed:** [songsage.netlify.app](https://songsage.netlify.app) 🚀

---

Enjoy! 🎵✨
