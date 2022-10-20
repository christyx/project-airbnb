# AirBnB Clone -- AirBBB

live site: https://project-airbnb-christy.herokuapp.com/

This is a clone of AirBnB using Javascript, React and Redux for the frontend, Express and Sequelize for the backend.

## Launch the application locally:

1. Clone from GitHub repository and run npm install in both the frontend and backend directories.
2. Create a ".env" file in the "backend" directory using the ".env.example" as a guide
3. In the "backend" directory, run the migration and seeder files using the following commands:
"npx dotenv sequelize db:migrate"
"npx dotenv sequelize db:seed:all"
4. Run "npm start" in both the "frontend" and "backend" directories

## Features

1. CRUD feature Spots (Create, Read, Update, AND Delete)
2. feature Reviews

## Example of the main page

![airbnb-mainpage]

[airbnb-mainpage]: ./mainPage.png

## User Authentication
- Sign Up
- Login / logout
- Demo User Login
