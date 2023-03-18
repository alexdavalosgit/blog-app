#React Vite Blog Application 
This is a simple blog application built with React Vite. It allows users to create, read, update, and delete blog posts. Users can also log in with a username and password, which is hashed using bcrypt. The application uses Node.js and Express for the server, MongoDB for the database, and Bootstrap and CSS for styling.

Installation To install the application, first clone the repository:

git clone https://github.com/your-username/your-repo.git

Then, navigate to the project directory and install the dependencies:

cd your-repo npm install

You will also need to create a .env file in the root directory of the project and add your MongoDB connection string and session secret:

MONGODB_URI= 
SESSION_SECRET=

Usage To start the application, run:

npm start This will start the server and the client, and the application will be available at http://localhost:3000.

#Features 
User Authentication 
Users can log in with a username and password. The password is hashed using bcrypt for security. The application uses local session storage to save user data, so users will remain logged in even if they refresh the page.

Blog Posts
Users can create, read, update, and delete blog posts. Blog posts consist of a title, content, and author. Users can only edit and delete posts that they have created.

Technologies Used: 
React Node.js Express MongoDB Bootstrap CSS bcrypt 

Contributing If you would like to contribute to the project, please open a pull request on GitHub.
