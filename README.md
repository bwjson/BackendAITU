# FinanceApp

SimpleFinanceApp is a web application designed to help users manage their finances effectively. It provides a user-friendly interface to track expenses, view financial insights, and plan budgets.

## Features

- **User Authentication**: Secure user sign-up and sign-in using JWT tokens.
- **Dashboard**: Users can view their account balance in dashboard.
- **User Management**: View and search other users.
- **Money Transfer**: Transfer funds between users with robust transaction management using MongoDB sessions to ensure consistency.
- **Error Handling**: Comprehensive error messages and state management.
- **Random Fund Assignment**: New users are assigned a random fund amount between 1 and 10,000 upon account creation.


## API Endpoints

### Users

- **POST /api/v1/user/signup**: Create a new user account.
- **POST /api/v1/user/signin**: Authenticate a user and return a JWT token.
- **PUT /api/v1/user**: Update user details (requires authentication).
- **GET /api/v1/user/bulk**: Retrieve a list of users with optional filtering.


### Account

- **GET /api/v1/account/balance**: Retrieve the account balance of the authenticated user (use authentication middleware).
- **POST /api/v1/account/transfer**: Transfer funds between users (use authentication middleware).

To run locally:
`npm install`
`node index.js`

To run using Docker:
`docker build -t node_app .`
`docker run -p 3000:3000 node_app`

Frontend:
`npm install`
`npm run dev`

