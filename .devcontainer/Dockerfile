FROM node:18

# Install necessary tools
# Tools needed for VS Code Server + Postgres
RUN apt-get update && apt-get install -y \
    postgresql-client \
    curl \
    tar \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Define working directory
WORKDIR /workspace

# Copy package.json first and install dependencies
# This takes advantage of Docker cache and speeds up future rebuilds
COPY package*.json ./
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Expose application port
EXPOSE 3000

# Entrypoint handles migrations and starts the app
COPY .devcontainer/entrypoint.sh .
RUN chmod +x ./entrypoint.sh
#ENTRYPOINT ["./entrypoint.sh"]

# Default command executed by entrypoint
CMD ["npm", "run", "start:dev"]
