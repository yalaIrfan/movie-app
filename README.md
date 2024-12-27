

# Movie Lobby

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movie-lobby.git
    cd movie-lobby
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_CLUSTER=your_db_cluster
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```

## Starting the Application

1. Start the application:
    ```sh
    npm run start
    ```

2. The application will be running on `http://localhost:3000`.

## Development

1. To start the application in development mode with hot-reloading:
    ```sh
    npm run dev
    ```

## Testing

1. To run the tests:
    ```sh
    npm run test
    ```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:
- mongodb+srv://mohammadirfany93:${process.env.DB_PASSWORD}@movie.lyelo.mongodb.net/?retryWrites=true&w=majority&appName=movielobby1


## API Endpoints

### Signup

**Endpoint:** `POST /users/signup`

**Payload:**

```json
    -- payload for normal user

{
    "email": "user@gmail.com",
    "password": "your_password"
}
-------------OR ------------
{
    "email": "user@gmail.com",
    "password": "irfan@123",
    "role": "user"  // optional default user
}
```
    -- payload for admin user
```json
{
    "email": "admin@gmail.com",
    "password": "irfan@123",
    "role": "admin"  
}
```

**Response:**

```json
{
    "email": "user@example.com",
    "role": "user",
    "message": "User created successfully"
}
```


### Signin

**Endpoint:** `POST /users/signin`
```json
{
    "email": "user@example.com",
    "password": "your_password"
}
```
**Response:**

```json
{
    "message": "Signin successfully",
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI2NzZkZTExYmYwYzBmY2ZkMzFiMGJlNTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTI3MzQ2MSwiZXhwIjoxNzM1Mjc0MDYxfQ.RsyOYM7WYUjILGitm8AskWPzMmWxxUYKoP-a9UvQV54",
    "email": "user@gmail.com"
}```


