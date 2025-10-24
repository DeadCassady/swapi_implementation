This is the api that returns data from swapi.com containing info from the star wars movies.Data-loader is my version of a tool for seeding, it contains a function to launch it on start up, currently it's commented. I've made a script to run it, it returns an error that I'm yet to resolve, but it completes it's function successfully

# COPY THE ENV INFO

cp ./.env.example ./.env

# Build the images
docker-compose build

# Start the services
docker-compose up -d

# To stop
docker-compose down

# For production, you might want to use:
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# RUN THE MIGRATIONS

npm run migration:run

# DROP THE MIGRATIONS

npm run migration:revert

# SEED THE INFO INTO THE DATABASE

npm run db:seed

# RUN THE API

npm run start

# TO LAUNCH SWAGGER

http://localhost:3000/api/
