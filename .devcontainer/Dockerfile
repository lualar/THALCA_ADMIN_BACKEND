FROM node:20

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
COPY .env .
COPY prisma ./prisma
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Expose application port
EXPOSE 3000

# Entrypoint handles migrations and starts the app
#COPY .devcontainer/entrypoint.sh .
#RUN chmod +x ./entrypoint.sh
#ENTRYPOINT ["./entrypoint.sh"]
# ...
RUN apt-get update && apt-get install -y netcat-traditional
# ...
COPY .devcontainer/wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh
#CMD ["wait-for-db.sh"]

# Default command executed by entrypoint
#CMD ["npm", "run", "start:dev"]
