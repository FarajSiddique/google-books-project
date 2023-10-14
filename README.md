# BookBuddy Project

This project is a web application that integrates with the Google Books API and New York Times API and provides users with an experience with searching and sharing books with friends.

## Features

- **Google Books Integration**: Search for books using the Google Books API and view detailed information about each book.
- **New York Times Bestsellers**: View a list of bestsellers from the New York Times.
- **User Authentication**: Sign up, log in, and manage your profile. Forgot your password? No worries, reset it with ease.
- **User Dashboard**: Once logged in, users can view their dashboard with personalized content.
- **Private Routes**: Some routes are protected and only accessible to authenticated users.
- **User Profile Management**: Update your profile information and view your personal details.
- **Bookshelf**: Each user has their own customizable bookshelf, with the capability of sharing books with friends as well. 
  
## Components

- `App.js`: Main application component.
- `BookDetail.js`: Component to display detailed information about a book.
- `BookDetailNYT.js`: Component to display details of a New York Times bestseller.
- `Bookshelf.js`: Component to manage and display a user's bookshelf.
- `Dashboard.js`: User's main dashboard.
- `ForgotPassword.js`: Component to assist users in resetting their password.
- `GoogleBooks.js`: Component to search and display results from the Google Books API.
- `Login.js`: User login component.
- `NYTBooks.js`: Component to display a list of New York Times bestsellers.
- `PrivateRoute.js`: Component to handle private routes accessible only to authenticated users.
- `Signup.js`: User signup component.
- `UpdateProfile.js`: Component to update user profile details.
- `UserProfile.js`: Component to display user profile information.

## Contexts

- `AuthContext.js`: Provides authentication-related functionalities and states.

## Firebase Integration

The application uses Firebase for user authentication. The configuration and initialization can be found in `firebase.js`.

