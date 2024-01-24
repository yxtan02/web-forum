# Web Forum
A responsive web app that allows users to discuss issues by creating threads and adding comments. <br />
**Link to project:** https://mysite-zoa8.onrender.com
<br />
Name: Tan Yi Xuan

![Homepage](images/homepage.png)


## Built With 💻
| **Frontend**  | **Backend**     |
| ------------- | --------------  |
| - React       | - Ruby on Rails |
| - Typescript  | - PostgreSQL    |
| - Bootstrap   |                 |
| - Material UI |                 |
             

## Key Features ⭐
- Perform CRUD operations on forum threads & comments
- User authentication system using HTTP cookies and sessions
- Search functionality to filter threads


## Installation and Usage 🛠️
1. Clone this repository onto your local machine
2. Navigate to the directory containing your cloned project
3. Install the required dependencies by using: 
```bash
yarn install
bundle install
```
4. Initialise the database by using:
```bash
rails db:create
rails db:migrate
rails db:seed
```
5. Launch the app in development mode by using:
```bash
rails s
```
6. Open http://localhost:3000 to view the app in the browser.
7. You should see a page like this:

![Homepage](images/homepage.png)

## How it works
### Backend
**Backend**
- RESTful API was built using Ruby on Rails to handles CRUD operation on threads and comments through the Post and Comment controllers and models, which is integrated with a PostgreSQL database to store relevant data.

**Frontend**
- React frontend was integrated through API calls to backend using Fetch
- index.tsx file was used as an entry point to render all React components which were bundled by ESBuild.
- Routing using the React router was set up in App.tsx.
- Typescript was used to introduce static typing to catch type-related errors during development
- Styling was done using the BootStrap CSS framework and the navigation bar was built using Material UI components

**Features**
- Only logged-in users can create, edit and delete posts / comments
- Non-logged-in users can only view the webpage
- Threads are tagged with a category and can be filtered through the search bar

**User Registration and Authentication**
- Registrations controller was added to create new user accounts through the User model, which encrypts passwords through the bcrypt gem
- Users can be registered and authenticated without passwords to facilitate ease of discussion
- Session store initializer was added to configure cookies and CORS middleware was setup to handle external HTTP requests
- Sessions controller to create and destroy sessions, and to check whether a user is logged in
- When the user successfully authenticates, a HTTP cookie will be sent to the client and cached, which was be subsequently used to authenticate and authorise API calls to backend

**Deployment on Render**