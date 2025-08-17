// File: auth_handlers.go
// Description: This file contains the handlers specifically for user authentication,
// including registration and login.

package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// RegisterHandler handles new user registration.
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	// Decode the incoming JSON request body into a User struct
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if user.Username == "" || user.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	// Hash the password for secure storage
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Insert the new user into the database
	query := `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id`
	err = DB.QueryRow(query, user.Username, hashedPassword).Scan(&user.ID)
	if err != nil {
		// This could be a unique constraint violation (username already exists)
		http.Error(w, "Failed to register user. Username may already be taken.", http.StatusInternalServerError)
		return
	}

	log.Printf("Registered new user: %s (ID: %d)", user.Username, user.ID)

	// Do not send password or hash back to the client
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// LoginHandler handles user login.
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds User // Use the User struct to capture login credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var storedUser User
	// Retrieve the user from the database by username
	query := `SELECT id, username, password_hash FROM users WHERE username = $1`
	err := DB.QueryRow(query, creds.Username).Scan(&storedUser.ID, &storedUser.Username, &storedUser.PasswordHash)

	if err != nil {
		if err == sql.ErrNoRows {
			// User not found, send a generic error to prevent username enumeration
			http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	// Check if the provided password matches the stored hash
	if !CheckPasswordHash(creds.Password, storedUser.PasswordHash) {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	log.Printf("User logged in successfully: %s (ID: %d)", storedUser.Username, storedUser.ID)

	// For a real application, you would generate and return a JWT (JSON Web Token) here.
	// For this milestone, we'll just return a success message.
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
}
