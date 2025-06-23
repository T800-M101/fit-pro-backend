# # Base image
# FROM node:20-alpine

# # Set working directory
# WORKDIR /app

# # Copy dependencies files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your NestJS app
# COPY . .

# # Build the app
# RUN npm run build

# # Expose port
# EXPOSE 3000

# # Start the app
# CMD ["node", "dist/main"]
