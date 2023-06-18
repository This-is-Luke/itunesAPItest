README: iTunes API App

This application allows users to search the iTunes API for content based on a search term and media type. The search results can be added to a list of favorites.

How to Use the App

The app has two main sections: a search form and a favorites list. Users can enter a search term and select a media type (e.g., movie, podcast, music, etc.) in the search form. Clicking the "Search" button fetches results from the iTunes API. The search results are displayed in a list, and each item can be added to the favorites list by clicking the "Add to Favorites" button. Items in the favorites list can be removed by clicking the "Remove from Favorites" button.

Installation Instructions

To install and run the app on your local machine, follow these steps:

Clone the repository to your local machine. (https://github.com/This-is-Luke/itunesAPItest)
Navigate to the project directory.
In the backend folder run npm i
navigate to the frontend folder inside the backend folder and also run npm i
Running the App Locally while in the frontend folder use npm start

The server will listen on port 3001 by default. If you want to use a different port, set the PORT environment variable before running the command.
Open a web browser and navigate to http://localhost:3001 (or the port you specified) to access the app.

Security Measures

Enabled CORS middleware to handle cross-origin requests.
Used the helmet middleware to add security-related headers to the HTTP response.
Handled errors in the main API route and returned a generic error message to avoid exposing sensitive information.
Used a generic error handling middleware for the app to log the error message and return a 500 error response with a generic message.

Testing
To run tests for this application, follow these steps:

Ensure you have installed all required dependencies as mentioned in the Installation Instructions.
In the backend directory, run npm test to execute the tests for the server.
In the frontend directory, run npm test to execute snapshot for the UI
Tests have been written to ensure that the application works as expected and to provide confidence in its functionality.

Live site

I did upload it to my site and use npm run build to build the file needed to upload to my hosting service but I get a MIME type error,
I do have a meeting scheduled for sunday and will ask about this error in the meeting, I will not be uploading it to heroku as they charge to have it running now.
https://www.thisisluke.co.za/projects/itunesapp/build/index.html