# Factory Tycoon API
This is an API for a clicker game called Factory Tycoon. It allows users to create an account, earn points by clicking on the game's main button, and purchase upgrades with their points.

## Endpoints
## POST /users
Creates a new user with a unique token and initializes their points to 0.

### Request body
**name**: a string with the user's name

### Response

**token**: a string with the user's unique token
**points**: a number with the user's current points
**upgrade**: an empty array
## GET /users/:token
Returns the user's information, including their name, token, current points, and purchased upgrades.

### Response
**name**: a string with the user's name
**token**: a string with the user's unique token
**points**: a number with the user's current points
**upgrades**: an array of strings with the user's purchased upgrades

## PATCH /users/:token
Updates the user's points and/or purchased upgrades.

### Request body
**points**: a number with the user's new points

**upgrade** (optional): a string with the name of the upgrade the user wants to purchase

**Response**

**name**: a string with the user's name

**token**: a string with the user's unique token

**points**: a number with the user's current points

**upgrade**: an array of strings with the user's 
purchased upgrades

## Technologies Used
Node.js

Express

MongoDB

TypeScript


## Installation
Clone this repository

Install dependencies with npm install

Set up a MongoDB database and configure the connection string in a .env file

Start the server with npm start or npm run dev (for development mode)


## License
This project is licensed under the mozila.