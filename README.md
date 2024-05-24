![workflow status](https://github.com/csci312-s24/project-killington/actions/workflows/node.js.yml/badge.svg)

Purpose:
A platform designed to offer a streamlined experience for accessing and crafting recipes, both personal and from others.

Deployed application:
https://killington.csci312.dev/

How to run locally:

1: Have docker installed
2: Install all required development dependencies with "npm install" in your terminal
3: Create a file .env.development.local with your local postgres database
Ex: DATABASE_URL= postgres://postgres:postgres@localhost:5432/postgres

4: In order to authenticate with google its required that you provide the following in your .env.local:
GOOGLE_CLIENT_SECRET=SOMEKEY
GOOGLE_CLIENT_ID=SOMEKEY

    You can get Google client secret and ID here:
    https://console.developers.google.com/apis/credentials

5: Run the local development server using "npm run dev" on mac

5.5: If you're on windows you'll likely need to run the following:
npm run predev (with docker opened)
npm next dev

6: With the local development running in a seperate terminal run to migrate and seed the database
npx knex migrate:latest
npx knex seed:run (should you want our example data)

7: Feel free to stop the development server. You can now run local development with:
npx next dev (on windows)
npm run dev (on mac)
