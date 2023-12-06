### SOCIAL MEDIA BACKEND API
This a a REST API that is developed using ExpressJS Framework and MongoDB as the Database
The System allows the users to publish Blog posts with an Image and a Description

### Controllers

Controllers are responsible for handling incoming requests and returning responses to the client.
Here we store our 2 Controllers: User Controllers and blog Controllers

### model

Here we have the User and Blog Model. Inside the User Model I have added a security layer using Crypto.
I have encrypted the User email when storing in the Database and decrypted it while retrieving

### routes

Here is where our Routes have been handled. Links with the Controllers


### index.js

The file to run the server and the MongoDB Database

### package.json

The packages to install so as to run the application locally