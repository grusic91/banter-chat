# Banter - React-Redux-chat-app
Banter is simple messages app made with **JavaScript, React, Redux, MongoDb, Node.js, axios**. Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). App. API calls from client to server are handled by axios with Promises. [Open app preview](http://banter-chat-app.herokuapp.com/)

___
## Motivation
I want to make simple chat app when I learning React, Redux, and handling api calls with Promises. It is a nice project for my Portfolio.
___

## Technologies - used in Project

* **JavaScript**
* **ReactJs** - Application is bootstrapped with **creat-react-app**
* **Redux** - managing application state.
* **redux-thunk** - dispatching actions
* **axios** - Promise based HTTP client for the browser and node.js
* **MongoDB** - database, host in the cloud with **MongoDB Atlas**,
* **mongoose** - MongoDB object modeling tool designed to work in an asynchronous environment with Node.js.
* **Node.js and Express** - for backend api routes
* **SCSS** - styles
* **heroku** - hosting application.

## Get started

* If you just want check the app click on [Open app](http://banter-chat-app.herokuapp.com/)

### Run application on local machine

1. If you don't have pre-installed install:

      - NodeJs from https://nodejs.org/en/
      - git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2. Go to terminal and create or/and navigate to folder where you want to initialize project<br />

3. clone or download zip

      - copy link provided from clone or download button
      - run command in terminal: `git clone <coppied_link>`
      - install npm: `npm install` to get node_modules installed<br />

4. Run app on localhost: `npm run start-dev` and application will run on **localhost:3000**<br />

If you want to use and manipulate with data from MongoDB, you should create your own [Atlas MongoDB account](https://www.mongodb.com/cloud/atlas) and porivde credentials in folder: `server/config/`, where you need to create folder `dev.js` and provide credentials there like:

```
If you want to use the application you also need to create this environment variables

module.exports = {
  DB_URI: "your mongo db uri from Atlas",
  SECRET_KEY: "your secret key from atlas",
}
```


## Folder structure for front-end in /src

* **/componetns** - folder for react components that are not directly connectet to redux store
* **/containers** - folder for react components that are connected to redux store
* **/hocs** - higher order component that wrap another component for (Authenticate)
* **/images** - images that are used in page (default profile img)
* **/store** - redux related logic
* **/store/actionTypes** - actionTypes
* **/store/actions** - action creators
* **/store/reducers** - redux reducers
* **/store/services** - auth logic that relates to communicate with API
* **/styles** - all styles files are here <br />

## Folder structure for back-end in /server

* **/index.js** - core of backend, respnsible to start server
* **/config** - for mongodb atlas
* **/handlers/auth** - auth user route handlers
* **/handlers/error** - error message handler
* **/handlers/messages** - handle message create, delete
* **/middleware** - authentication and authorization middlewares
* **/models/index.js** - connect to mongo db
* **/models/user.js** - User model
* **/models/message.js** - Message model
* **/routes/** - message and authentication routes

---
## Available Scripts

In the project directory, you can run:

### `npm run start-dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



---
Background photos are from [Unsplash](https://unsplash.com/s/photos/books) created by amazing artists:
Cristina Gottardi
@cristina_gottardi
