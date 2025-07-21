# 🎵 SongSaga — Song Manager

This project is a **full-stack application** to manage a list of songs.
It demonstrates my frontend skills using **React**, **Redux Toolkit**, **Redux-Saga**, **Emotion**, **Styled System**, and a **custom Webpack setup**.

---

## 📌 **Features**

- ✅ Display paginated list of songs (title, artist, album, year, etc.)
- ✅ CRUD operations (Create, Read, Update, Delete) with REST API
- ✅ State management with **Redux Toolkit**
- ✅ API side effects with **Redux-Saga**
- ✅ Theming & responsive styling with **Emotion** + **Styled System**
- ✅ Custom **Webpack configuration** (no CRA)

---

## ⚙️ **Backend**

* The backend is a simple Go HTTP server exposing `/songs` endpoints.
* Supports:

  * `GET /songs?page=&limit=` for pagination.
  * `POST /songs` to add new songs.
  * `PUT /songs/:id` to update a song.
  * `DELETE /songs/:id` to delete a song.
* **CORS** is configured to allow requests from the frontend.

---

## ⚙️ **Frontend Setup**

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

## 🛠️ Webpack Configuration

**No CRA:** Webpack is configured manually (`webpack.config.js`).

Features:

* Handles `.jsx` files via Babel.
* Uses `dotenv-webpack` to inject environment variables (`API_BASE_URL`).
* Uses `HtmlWebpackPlugin` to generate `index.html`.
* Custom rule for images/SVGs can be added easily.
* The config ensures a clean dev workflow with `webpack-dev-server`.

---

## ✅ Testing

This project includes:

* **Unit tests:** for the Redux slice (`songsSlice`).
* **Component tests:** for `AddSong` form using React Testing Library.

All tests are run with Jest + `jest-environment-jsdom`.

**Run all tests:**

```bash
npx jest
```
---

## 🚀 Bonus Points

- ✅ Manual Webpack config
- ✅ Pagination
- ✅ Tests with Jest
- ✅ Clear commit history with conventional commits
- ✅ Ready for deployment — can be hosted on Netlify/Vercel

---

## 📝 How I verified it works

* Manually tested CRUD + pagination in the browser.
* Checked backend logs for requests.
* Ran Jest unit and component tests (`npx jest`).
* Debugged using Chrome DevTools & console logs.

---

## 📂 Project Structure

```
SongSaga/
├── backend/
│   ├── main.go         # Go backend server
│   ├── go.mod          # Go module file
│   └── go.sum          # Go dependencies
├── frontend/
|   ├── src/
|   │   ├── app/         # store.js, theme.js
|   │   ├── features/    # Redux slice & saga
|   │   ├── pages/       # AddSong, EditSong, SongList
|   │   ├── components/  # Styled Button etc.
|   ├── public/
|   │   └── index.html
|   ├── webpack.config.js
|   ├── .env
|   ├── babel.config.js
|   ├── jest.config (in package.json)
└── README.md           # Project documentation
```
---

## ✅ Run it locally

1. Clone this repo.
2. `npm install`
3. Start backend: `go run main.go`
4. Start frontend: `npx webpack serve`
5. Visit [http://localhost:3000](http://localhost:3000)
