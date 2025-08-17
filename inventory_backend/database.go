// File: database.go
// Description: This file handles all interactions with the PostgreSQL database. It encapsulates all SQL
// queries, making the rest of the application agnostic to the specific database implementation.

package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	_ "github.com/lib/pq"
)

var DB *sql.DB // A global variable to hold the database connection pool.

// InitDB initializes the database connection pool.
func InitDB() {
	// Render provides a single DATABASE_URL environment variable.
	// We will use this directly if it exists.
	connStr := os.Getenv("DATABASE_URL")

	// Fallback to local .env file if DATABASE_URL is not set (for local development)
	if connStr == "" {
		connStr = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_NAME"),
		)
	} else {
		// ** THIS IS THE FIX **
		// If we are using the DATABASE_URL from Render, ensure SSL is required.
		// Render's databases require secure connections.
		if !strings.Contains(connStr, "sslmode") {
			connStr += "?sslmode=require"
		}
	}

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to open database connection:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Successfully connected to the database.")
	createTables()
}

// createTables executes the SQL to create necessary tables if they don't already exist.
func createTables() {
	// SQL for inventory_items table
	createInventoryTableSQL := `
    CREATE TABLE IF NOT EXISTS inventory_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        quantity INT NOT NULL,
        description TEXT
    );`

	// SQL for users table
	createUsersTableSQL := `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    );`

	_, err := DB.Exec(createInventoryTableSQL)
	if err != nil {
		log.Fatal("Failed to create inventory_items table:", err)
	}

	_, err = DB.Exec(createUsersTableSQL)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}

	log.Println("Tables checked/created successfully.")
}
