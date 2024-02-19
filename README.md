# Springboard Capstone 2 Project

**Title:** HappyHour Interior Design Map  
**Deployment URL:** <https://happyhour-map-app-frontend.onrender.com>  
**APIs:**

- Custom API: HappyHour API (Locally Hosted)
- External API: [Google Maps API](https://developers.google.com/maps)

## Description

HappyHour Interior Design Map is a web application designed to showcase all of the spaces that Bells + Whistles (an LA-based interior design firm) has designed, including spaces that are no longer open. It would be an app for people interested in visiting, rating, liking, commenting on and enjoying spaces the firm has designed. Additionally, the app offers a way for users to geographically visualize these spaces on an interactive map interface.

## Features Implemented

- **User Authentication:**
  - Users can create an account and log in securely. This ensures a personalized experience tailored to their preferences.
- **Search and Filters:**
  - Dynamically search the list of spaces by title, filter by category, city, or neighborhood.
- **Sorting Options:**
  - Dynamically sort the list of spaces based on average ratings to find the highest or lowest rated ones.
- **Space Details:**
  - Dive deeper into each space's specifics by accessing its dedicated page, complete with detailed descriptions, options to like/unlike, mark spaces as visited, show comments, show the address, average ratings, options to rate spaces, and photos.
- **Interactive Map:**
  - Explore the geographical distribution of spaces through an interactive map feature, allowing users to visualize their locations conveniently. Includes a world map that showcases where all the spaces are and a dedicated map of just an individual space.
- **User Profile Management:**
  - Users can access their profiles, view liked or visited spaces, view comments given, and edit personal information as needed.
- **Space Interaction:**
  - Engage with spaces by liking, marking as visited, adding or deleting comments, and rating them, creating a social aspect to the app.
- **Administrator Routes:**
  - Admins have the ability to manage spaces, users, comments, locations, and categories.

## Testing

The tests are located in the backend within a folder named `tests`. Within this folder, each helper, middleware, model, and route has its separate folder containing various tests.

To run the tests individually, you can use Jest in the terminal by executing the command `jest filename`, where `filename` is the name of the specific test file you want to run.

## Standard User Flow

- **Sign Up/Log In:**
  - Users start by signing up or logging into their accounts. Incorrect credentials redirect them appropriately.
- **Spaces Page:**
  - Upon successful authentication, users are directed to the Spaces page, presenting a list of all spaces Bells + Whistles has designed.
- **Exploration:**
  - Users can browse through list of spaces, utilize search and filter options, and sort based on preferences to discover spaces aligned with their interests.
- **Interaction:**
  - Engage with spaces by liking, commenting, rating, and marking as visited to contribute to the community and personalize their experience.
- **Home Page:**
  - Users can navigate to the Home page which features a comprehensive world map showcasing all spaces designed by Bells + Whistles.
- **Further Navigation:**
  - Users can explore individual space pages for detailed information, access the interactive map, manage their profile, and navigate to other relevant sections of the website.

## APIs Used

**Custom-Built API:** 
Provides access to a comprehensive database of spaces designed by Bells + Whistles. This documentation outlines the process of creating and implementing the API, including database setup, authentication using JWT tokens, and development of custom routes and models.

- **Database Setup**
The API utilizes a SQL database to store and manage the compiled data of spaces designed by Bells + Whistles, user information, category types, locations, etc. The database schema includes tables for spaces, users, categories, and locations, among others.
- **Schema Overview**
  - Spaces: Stores information about individual spaces, including title, description, location, category, and ratings.
  - Users: Stores user credentials and authentication tokens.
  - Categories: Contains a list of predefined categories for spaces.
  - Locations: Contains info of predefined location data for spaces.
  - Comments: Stores user comments for a space.
  - Likes: Stores user likes for a space.
  - Visits: Stores user visits for a space.
  - Ratings: Stores user rating for a space.
- **Authentication**
  - Users authenticate by providing their credentials (e.g., username and password) to the authentication endpoint.
  - Upon successful authentication, the server generates a JWT token containing user information and a timestamp.
  - Subsequent requests to protected endpoints include the JWT token in the Authorization header.
  - The server verifies the JWT token and grants access to the requested resources if the token is valid.
- **Routing**
Custom routes are implemented to handle various API endpoints, including those for user authentication, space retrieval, user profile management, and administrative tasks.
- **Models**
Models represent the structure and behavior of data in the database. Custom models are created to interact with database tables and perform CRUD (Create, Read, Update, Delete) operations on data.
- **API Endpoints**
The API exposes a set of endpoints to interact with the underlying database and perform various operations.
  - **Example Endpoints:**
    - POST /api/auth/login: Endpoint for user authentication and login.
    - GET /api/spaces: Endpoint to retrieve a list of spaces.
    - POST /api/spaces: Endpoint to add a new space to the database. (only if admin)
    - PATCH /api/spaces/:id: Endpoint to update an existing space. (only if admin)
    - DELETE /api/spaces/:id: Endpoint to delete a space from the database. (only if admin)

**Google Maps API:**
Primarily leveraging its geocoding capabilities and mapping features. This allows for precise location-based services, including converting addresses into geographic coordinates (geocoding) and displaying spaces on an interactive map for enhanced visualization.

## Technology Stack

- Backend: Node.js, Express.js
- Authentication: JSON Web Tokens (JWT)
- Database: PostgreSQL (for custom API)
- Frontend: CSS, Bootstrap, JavaScript, React.js
- Mapping Library: Google Maps API
- Testing: Jest
