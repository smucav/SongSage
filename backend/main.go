package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
)

// Song represents a song entity
type Song struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Album  string `json:"album"`
	Year   int    `json:"year"`
	Genre  string `json:"genre,omitempty"`
}

// SongStore manages songs in memory
type SongStore struct {
	sync.Mutex
	songs  []Song
	nextID int
}

// NewSongStore initializes the store with sample data
func NewSongStore() *SongStore {
	return &SongStore{
		songs: []Song{
			{ID: 1, Title: "Tizitaa", Artist: "Muluken Melesse", Album: "Ethiopian Hits", Year: 1973, Genre: "Traditional"},
			{ID: 2, Title: "Yene Habesha", Artist: "Betty G", Album: "Manew Fitsum", Year: 2015, Genre: "Pop"},
			{ID: 3, Title: "Ere Mela Mela", Artist: "Mahmoud Ahmed", Album: "Ere Mela Mela", Year: 1974, Genre: "Jazz"},
			{ID: 4, Title: "Tikur Sew", Artist: "Teddy Afro", Album: "Tikur Sew", Year: 2012, Genre: "Reggae"},
			{ID: 5, Title: "Abebayehosh", Artist: "Aster Aweke", Album: "Aster", Year: 1989, Genre: "Pop"},
		},
		nextID: 6,
	}
}

// corsMiddleware adds CORS headers to allow requests from the frontend
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "https://songsage.netlify.app")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight OPTIONS requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	store := NewSongStore()

	// Create a new router
	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("/songs", store.handleSongs)
	mux.HandleFunc("/songs/", store.handleSongByID)

	// Wrap the router with CORS middleware
	handler := corsMiddleware(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on :%s...", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}
}

// handleSongs handles GET and POST requests for /songs
func (s *SongStore) handleSongs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case http.MethodGet:
		// Parse pagination parameters
		page, _ := strconv.Atoi(r.URL.Query().Get("page"))
		if page < 1 {
			page = 1
		}
		limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
		if limit < 1 || limit > 100 {
			limit = 10
		}

		s.Lock()
		defer s.Unlock()

		start := (page - 1) * limit
		end := start + limit
		if start >= len(s.songs) {
			json.NewEncoder(w).Encode([]Song{})
			return
		}
		if end > len(s.songs) {
			end = len(s.songs)
		}

		json.NewEncoder(w).Encode(s.songs[start:end])

	case http.MethodPost:
		var song Song
		if err := json.NewDecoder(r.Body).Decode(&song); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Validate input
		if song.Title == "" || song.Artist == "" || song.Year < 1900 || song.Year > 2025 {
			http.Error(w, "Invalid song data", http.StatusBadRequest)
			return
		}

		s.Lock()
		song.ID = s.nextID
		s.nextID++
		s.songs = append(s.songs, song)
		s.Unlock()

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(song)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// handleSongByID handles PUT and DELETE requests for /songs/:id
func (s *SongStore) handleSongByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract ID from URL
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) != 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}
	id, err := strconv.Atoi(parts[2])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodPut:
		var song Song
		if err := json.NewDecoder(r.Body).Decode(&song); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}
		if song.ID != id {
			http.Error(w, "ID mismatch", http.StatusBadRequest)
			return
		}
		if song.Title == "" || song.Artist == "" || song.Year < 1900 || song.Year > 2025 {
			http.Error(w, "Invalid song data", http.StatusBadRequest)
			return
		}

		s.Lock()
		defer s.Unlock()
		for i, sng := range s.songs {
			if sng.ID == id {
				s.songs[i] = song
				json.NewEncoder(w).Encode(song)
				return
			}
		}
		http.Error(w, "Song not found", http.StatusNotFound)

	case http.MethodDelete:
		s.Lock()
		defer s.Unlock()
		for i, sng := range s.songs {
			if sng.ID == id {
				s.songs = append(s.songs[:i], s.songs[i+1:]...)
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		http.Error(w, "Song not found", http.StatusNotFound)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
