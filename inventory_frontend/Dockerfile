# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.25-alpine

# Install gettext, which provides the 'envsubst' utility
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the Nginx configuration TEMPLATE. We'll process it before starting.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Expose port 80
EXPOSE 80

# The command to run when the container starts.
# This will substitute the BACKEND_HOSTPORT environment variable in our config and then start Nginx.
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_SCHEME} ${BACKEND_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
