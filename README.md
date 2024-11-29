ShoppyGlobe API - E-commerce Backend

Project Overview
The ShoppyGlobe API is a backend built using Node.js, Express, and MongoDB for an e-commerce application. This API provides functionality to manage products, shopping cart, user authentication, and authorization. It is designed to handle product listings, cart management, and user sessions securely.

Key Features:
Product Management: CRUD operations on products.
Cart Management: Add, update, and remove items from the cart.
User Authentication: JWT-based user registration and login.
Error Handling & Validation: Validation for product IDs and error handling for API calls.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (with Mongoose ODM)
Authentication: JWT (JSON Web Tokens)
Testing: ThunderClient for API testing

API Endpoints
1. Products
GET /products:
Fetch a list of all products.

Response: List of products in JSON format.
GET /products/:id:
Fetch details of a single product by its ID.

Parameters: id (Product ID)
Response: Product details (name, price, description, stock quantity).
2. Cart
POST /cart:
Add a product to the shopping cart.

Request Body:
json
Copy code
{
  "userId": "user123",
  "productId": "product123",
  "quantity": 2
}
Response: Cart with the added product.
PUT /cart/:id:
Update the quantity of a product in the cart.

Parameters: id (Cart Item ID)
Request Body:
json
Copy code
{
  "quantity": 3
}
Response: Updated cart.
DELETE /cart/:id:
Remove a product from the cart.

Parameters: id (Cart Item ID)
Response: Updated cart.
3. Authentication
POST /register:
Register a new user.

Request Body:

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
Response: Success message or error.
POST /login:
Authenticate a user and return a JWT token.

Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}
Response: JWT token.

MongoDB Integration
MongoDB is used to store data for products and cart items. Here's a breakdown of the collections:

1. Products Collection
Each product has the following fields:

name: String (Product name)
price: Number (Product price)
description: String (Product description)
stock: Number (Stock quantity)
2. Cart Collection
Each cart entry stores the following information:

userId: String (User identifier)
items: Array of objects, each containing:
productId: ObjectId (Product reference)
quantity: Number (Quantity added to the cart)
Authentication & Authorization
JWT Authentication:
POST /register and POST /login are used for user registration and authentication. Upon successful login, a JWT token is returned.
The JWT token must be sent in the Authorization header as Bearer <token> for all protected routes (e.g., cart-related routes).
Protected Routes:
/cart routes are protected, meaning only authenticated users can interact with their cart.
Middleware is used to check for valid JWT tokens.

Setup & Installation
Follow these steps to set up the backend:

Clone the repository:


git clone https://github.com/your-username/shoppyglobe-api.git
cd shoppyglobe-api
Install dependencies:


npm install
Set up MongoDB:

Make sure you have MongoDB running locally or set up a cloud MongoDB instance (e.g., MongoDB Atlas).
Update the MONGODB_URI in your .env file to connect to your MongoDB database.
Set up environment variables: Create a .env file and add the following:

makefile

MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Run the server:


npm start
The server will run at http://localhost:5000 by default.

Testing with ThunderClient
Open ThunderClient in VSCode or any API testing tool (e.g., Postman).
Test the following API endpoints:
GET /products
GET /products/:id
POST /cart
PUT /cart/:id
DELETE /cart/:id
POST /register
POST /login
Make sure to include the JWT token in the Authorization header for protected routes.

Error Handling & Validation
Error Handling:
Each API route has proper error handling for common issues such as invalid product ID, user not found, or database errors.
Validation:
The API validates inputs like the productId, quantity, and required fields in requests. If any required data is missing or invalid, the API returns a 400 status with an appropriate error message.

Project Structure:


/shoppyglobe-api
│
├── /models
│   ├── product.model.js    # Mongoose schema for product
│   ├── cart.model.js       # Mongoose schema for cart
│   └── user.model.js       # Mongoose schema for user
│
├── /routes
│   ├── product.routes.js   # API routes for products
│   ├── cart.routes.js      # API routes for cart
│   └── auth.routes.js      # API routes for authentication
│
├── /middleware
│   └── auth.middleware.js  # JWT authentication middleware
│
├── .env                   # Environment variables (MongoDB URI, JWT secret)
├── .gitignore             # Git ignore file
├── server.js              # Express server setup
└── README.md              # Project documentation
