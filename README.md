# MERN Stack
MongoDB Express.js React.js Node.js

## Requirements

* Operating System: MacOS or Linux
* [Node.js](https://nodejs.org/) (I recommend installing with [NVM](https://github.com/nvm-sh/nvm))
* [Homebrew](https://brew.sh) (to install MongoDB)

## Quick Start

#### Setup

```bash
npm install

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
```

Start the database
```bash
brew services start mongodb-community
```

#### for Development

Start the client
```
In client folder run
npm start
```

Start the server
```
In server foldre run
node server.js
```



## Setup Instructions

Note: This is now a github template project. This makes copying the contents of the project
into a new repo very simple.

To setup your own project, you will need to copy the contents of this project into a new repo.
You will need to update the content in these files to names of your project and yourself:

* package.json: name, version, description, repository, author, bugs, homepage
* LICENSE: (update to your preferred license)
* client/index.html: description and title
* this README.md

This is also a good time to go through the included libraries to add or remove features that you want.

After this you can commit the files into a new repository and push up to your github.
You can now start updating files in your client to begin working on your own project!

## Technologies

[React](https://facebook.github.io/react/) - View Library

[Axios](https://github.com/axios/axios) - HTTP requests

[Express](http://expressjs.com/) - Node Application Framework

[MongoDB](https://www.mongodb.com/) - Document Database

[Mongoose](http://mongoosejs.com/) - MongoDB Framework

