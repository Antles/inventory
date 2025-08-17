# Stage 1: Build the Go application
# We use a specific Go version for a reproducible build.
FROM golang:1.24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to download dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go application.
# CGO_ENABLED=0 is important for creating a static binary that works in a minimal container.
# -o /app/main creates the compiled binary at /app/main.
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main .

# Stage 2: Create the final, minimal production image
# We use a scratch image which is the smallest possible image, containing only our application.
FROM scratch

# Set the working directory
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/main .

# Expose the port the application runs on
EXPOSE 8080

# The command to run when the container starts
CMD ["/app/main"]
