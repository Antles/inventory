// File: auth.go
// Description: This file contains utility functions for handling password security,
// specifically hashing and checking passwords using the bcrypt algorithm.

package main

import "golang.org/x/crypto/bcrypt"

// HashPassword takes a plain-text password and returns its bcrypt hash.
func HashPassword(password string) (string, error) {
	// bcrypt.GenerateFromPassword handles creating a salt and hashing the password.
	// The second argument is the cost factor; a higher number is more secure but slower.
	// DefaultCost (10) is a good balance.
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash compares a plain-text password with a stored bcrypt hash.
func CheckPasswordHash(password, hash string) bool {
	// bcrypt.CompareHashAndPassword securely compares the two without revealing the password.
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil // Returns true if the password matches the hash, false otherwise.
}
