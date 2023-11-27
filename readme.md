# CHICBAGS

## Technologies Used

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB database
- EJS

### Backend /Frontend

### Functionality

1. for user:

- login/logout
- productlist
- product details
- create /cancel order
- add/remove wishlist
- update profile

1. for admin

- add/remove product
- display product

#### Setup & Run the Project

Please check MongoDB Compass by connecting to a server <code>mongodb://localhost:27017</code>

Change database connection string in constant.js

1. Open a terminal in the root of the repository
1. Run <code>npm init -y</code>
1. Run <code>npm i</code>
1. Open new teminal
1. Run <code>cd data</code>
1. Run <code>node seedScript.cjs</code>
1. Inside old terminal
1. Open a terminal in the root of the repository
1. Run <code>node index.js</code>

open your browser

1. Run <code>http://localhost:5000/product/dashboard</code>

You know it works if the terminal shows "Server running on port {port 5000}" and "Connected to mongodb".

User credential :

- username: "User",
- password: 123

Admin credential

- username: "Admin",
- password: 123
