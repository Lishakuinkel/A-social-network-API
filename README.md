# A-social-network-API

This Node.js API allows users to perform CRUD operations on social networking data models using MongoDB database. It includes Users, Thoughts, Friends and Reactions data models allowing a simple and scalable way of handling the social networking data without the restrictions of traditional relational databases.

## Technologies Used
This project uses Node.js to work with the backend, Express.js to design and configure the API, Mongoose for creating schema-based data models, Moment package to display dates and Insomnia (API tester)

## Project Walkthrough

[Untitled_ Sep 2, 2023 11_30 AM (1).webm](https://github.com/Lishakuinkel/A-social-network-API/assets/130411719/bb0c52a1-1631-40d1-b95f-c54dc31bdd9a)

Link to the video : https://drive.google.com/file/d/1JmlfzziOEy4FrBrtvHzxu0XbDXlTO6OR/view?pli=1

## Installation 

Clone the repo onto your local machine. 
Then, in the terminal, install all dependencies using ```npm install```

Then start the server on local port ```npm run start```

Test endpoints in API tester such as Insomnia

## Usage
This application allows you to navigate different link routes that display data from the database.

GET/POST routes:
```
http://localhost:3001/api/users
http://localhost:3001/api/thoughts
```

PUT/DELETE routes:
```
http://localhost:3001/api/users/:userId
http://localhost:3001/api/thoughts/:thoughtId
```

POST/DELETE routes:
```
http://localhost:3001/api/users/:userId/friends/:friendId
http://localhost:3001/api/thoughts/:thoughtId/reactions
```

The route above is used to POST a new reaction. If you wish to DELETE a certain reaction you can do so by adding an /:reactionId at the end of the link.


## Contact me
Email me at ltkuinkel@gmail.com

My GitHub is ```https://github.com/Lishakuinkel```
