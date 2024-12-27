

# Movie lobby app

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movie-app.git
    cd movie-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create mongo db and keep the url - use your local mongo db
    ```env
    mongodb+srv://mohammadirfany93:${process.env.DB_PASSWORD}@movie.lyelo.mongodb.net/?retryWrites=true&w=majority&appName=movielobby app1
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

## Environment Variables mondo db URL

Make sure to set the following URL in your `.index.ts` file:
- mongodb+srv://mohammadirfany93:${process.env.DB_PASSWORD}@movie.lyelo.mongodb.net/?retryWrites=true&w=majority&appName=movielobby app1


## API Endpoints

### Signup

**Endpoint:** `POST /users/signup`

 - for info.... Refer postman collection. Import it in postman!

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
            "role": "user"  // optional default user role
        }
```
```json
-- payload for admin user
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

### Signin - Normal user login

**Endpoint:** `POST /users/signin -`Normal user login

 - for info.... Refer postman collection. Import it in postman!

```json
        {
            "email": "user@gmail.com",
            "password": "irfan@123"
        }
```
**Response:**

- below is the token after successful login in the app, When we decode this token user info is stored in the token payload, like email , role...etc.. (refer : www.jwt.io/)


```json
        {
            "message": "Signin successfully",
            "userToken":         
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI2NzZkZTExYmYwYzBmY2ZkMzFiMGJlNTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTI3MzQ2MSwiZXhwIjoxNzM1Mjc0MDYxfQ.RsyOYM7WYUjILGitm8AskWPzMmWxxUYKoP-a9UvQV54",
            "email": "user@gmail.com"
        }
```


### Signin - Admin user login

**Endpoint:** `POST /users/signin -`Normal user login

 - for info.... Refer postman collection. Import it in postman!

```json
        {
            "email": "admin@gmail.com",
            "password": "irfan@123",
        }
```
**Response:**

- below is the token after successful login in the app, When we decode this token user info is stored in the token payload, like email , role...etc.. (refer : www.jwt.io/)


```json
        {
            "message": "Signin successfully",
            "userToken":         
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI2NzZkZTExYmYwYzBmY2ZkMzFiMGJlNTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTI3MzQ2MSwiZXhwIjoxNzM1Mjc0MDYxfQ.RsyOYM7WYUjILGitm8AskWPzMmWxxUYKoP-a9UvQV54",
            "email": "admin@gmail.com"
        }
```

# Movies apis
## List of APIs
* /movies GET method, 
    - Access for both normal [user] and [admin] user ['user','admin']
    * URL : http://localhost:3000/movies

    * header { Authorization : '\<any  token>'};

    **Response:**
    ```json
    [
        {
        "title": "movie d1d",
        "genre": "genre 1",
        "rating": 3,
        "link": "www.movie.com",
        "id": "676dc1710c1bfedbe975b3a5"
        }
    ]
    ```

 Refer post man collection more info.
###
* /search GET method, 
    - Access for both normal [user] and [admin] user ['user','admin']
    * URL : http://localhost:3000/movies/search?title=movie 1&genre=genre 1

    * header { Authorization : '\<any token>'};

    **Response:**
    ```json
    [
        {
        "title": "movie 1",
        "genre": "genre 1",
        "rating": 3,
        "link": "www.movie.com",
        "id": "676dc1710c1bfedbe975b3a5"
        }
    ]
    ```

 Refer post man collection more info.





 Refer post man collection more info.
###
* /search POST method, 
    - Access for only admin user - ['admin']
    * URL : http://localhost:3000/movies
    
    * header { Authorization : '\<admin token>'};

    **Request:**
    ```json

    {
    "title": "movie 1",
    "genre": "genre 1",
    "rating": 3,
    "link": "www.movie.com",
    }

    ```

    **Response:**
    ```json
    
    {
    "title": "movie 1",
    "genre": "genre 1",
    "rating": 3,
    "link": "www.movie.com",
    "id": "676dc1710c1bfedbe975b3a5"
    }

    ```

 Refer post man collection more info.




 Refer post man collection more info.
###
* /search PUT method, 
    - Access for only admin user - ['admin']
    * URL : http://localhost:3000/movies/{{id}}
    
    * header { Authorization : '\<admin token>'};

    **Request:**
    ```json
    {
    "title": "movie 1 updated",
    "genre": "genre 1",
    "rating": 4,
    "link": "www.movie.com",
    "id": "676dc1710c1bfedbe975b3a5"
    }

    ```

    **Response:**
    ```json
    
    {
    "title": "movie 1 updated",
    "genre": "genre 1",
    "rating": 1,
    "link": "www.movie.com",
    "id": "676dc1710c1bfedbe975b3a5"
    }

    ```

 Refer post man collection more info.





 Refer post man collection more info.
###
* /search DELETE method, 
    - Access for only admin user - ['admin']
    * URL : http://localhost:3000/movies/{{id}}
    
    * header { Authorization : '\<admin token>'};

    **Request:**
    ```json
        {
        
        }
    ```
    **Response:**
    ```json

    Delete 
       
    ```

    status : 200

 Refer post man collection more info.

# Run Test cases
    
        npm run test
    
## make sure node version above 22.X



## Technologies Used

The Movie lobby app project utilizes the following technologies:

- Visual Studio Code
- Node.js
- Express.js
- TypeScript

These technologies were chosen for their ability to efficiently develop and build scalable web applications. Visual Studio Code provides a powerful and customizable development environment, while Node.js and Express.js enable server-side JavaScript execution. TypeScript enhances the development process by adding static typing and other advanced features to JavaScript.

To get started with the project, make sure you have Visual Studio Code installed and configured. Install Node.js and set up the project dependencies using npm. Then, you can start coding in TypeScript using Express.js to build the backend of the Movie lobby app application.
