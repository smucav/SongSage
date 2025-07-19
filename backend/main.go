package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Song represents a song entity
type Song struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Album  string `json:"album"`
	Year   int    `json:"year"`
}

func main() {
	// Define the songs endpoint
	http.HandleFunc("/songs", songsHandler)

	// Start the server
	log.Println("Server starting on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func songsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Sample data
	songs := []Song{
		{ID: 1, Title: "Tizita", Artist: "Muluken Melesse", Album: "Ethiopian Hits", Year: 1973},
		{ID: 2, Title: "Yene Habesha", Artist: "Betty G", Album: "Manew Fitsum", Year: 2015},
		{ID: 3, Title: "Ere Mela Mela", Artist: "Mahmoud Ahmed", Album: "Ere Mela Mela", Year: 1974},
		{ID: 4, Title: "Tikur Sew", Artist: "Teddy Afro", Album: "Tikur Sew", Year: 2012},
		{ID: 5, Title: "Abebayehosh", Artist: "Aster Aweke", Album: "Aster", Year: 1989},
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")

	// Encode and send response
	if err := json.NewEncoder(w).Encode(songs); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
