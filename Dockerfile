# Use a recent Long-Term Support version of Node.js
FROM node:20

# Install postgresql-client which provides the 'pg_isready' command
# needed by our entrypoint script.
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /workspace

# Copy package manifests first to leverage Docker's build cache
COPY package*.json ./

# Copy the Prisma schema into the container
COPY prisma ./prisma

# Install project dependencies
RUN npm install

# Generate the Prisma Client. This is crucial for the application to work.
RUN npx prisma generate

# Copy the rest of the application source code
COPY . .

# Expose the port the NestJS application will run on
EXPOSE 3000

# Copy our startup script, make it executable, and set it as the entrypoint
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

# Define the default command that the entrypoint will execute after its tasks
CMD ["npm", "run", "start:dev"]