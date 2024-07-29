# Netflix Clone Application

Welcome to the Netflix Clone application! This web application is built using React.js for the frontend, Node.js and Express for the backend, and MongoDB for database storage. The application fetches movie data from The Movie Database (TMDb) API and utilizes CRUD operations for user authentication.

## Features

### User Authentication

- **Login and Sign Up:** Users can log in to their accounts or sign up for a new account.
- **Authentication Middleware:** Secure your routes using authentication middleware to ensure that only authenticated users can access certain features.

### Home Page

- **Discover New Movies and TV Shows:** Explore the latest and popular movies and TV shows fetched from the TMDb API.
- **Different Lists:** Categorized lists such as "Now Playing," "Popular," "Top Rated," and "Upcoming" allow users to discover a variety of content.

### Movie and TV Series Pages

- **Detailed Movie Information:** View detailed information about a specific movie, including its synopsis, release date, and more.
- **Genre Filtering:** Filter movies and TV series by genre to find content that matches your preferences.

### My List Page

- **Favorites:** Mark your favorite movies and TV shows to easily access them later.
- **Continue Watching:** Resume watching from where you left off for the shows and movies you are currently watching.
- **Recommendations:** Get personalized recommendations based on your viewing history.
- **Past Movies:** View a list of movies you've watched in the past.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies for the frontend and backend:**

   ```bash
    cd client
    npm install

    cd ../server
    npm install
   ```

3. **Set up your MongoDB database:**

   Create a .env file in the server directory.

   Add your MongoDB connection string:

   ```bash
    MONGODB_URI=your-mongodb-connection-string
   ```

4. **Run the application:**

   Create a .env file in the server directory.

   Add your MongoDB connection string:

   ```bash
    // Run the backend
    npm start

    // Run the front end
    npm start
   ```

5. **Open Application in Browser:**

   Open your browser and navigate to http://localhost:3000 to use the Netflix Clone application.
