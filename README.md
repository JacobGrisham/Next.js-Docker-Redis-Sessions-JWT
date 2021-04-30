# Face Recognition A.I.: React, Code Analysis, Docker, PostgreSQL, Redis, Cookies, and JWT
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Coding challenge from the Udemy Course [the Complete Junior to Senior Web Developer Roadmap (2020)](https://www.udemy.com/course/the-complete-junior-to-senior-web-developer-roadmap/)
I wrote the code in docker-compose.yml and Dockerfile. The other files were provided by the instructor. This application detects multiple faces using a machine-learning API.

## 💡Lessons Learned
- React
- Code Analysis
- Docker
- PostgreSQL
- Redis
- Cookies
- Sessions with JSON Web Tokens (JWT)

## 🚀 Getting Started
To run this project locally:
1. In your terminal, navigate to the root folder of Front End and run the following commands
```
$ npm install
$ npm start
```
2. Make sure you have docker installed and running on your computer
3. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API. You can grab a Clarifai API key [here](https://www.clarifai.com/)
5. You will also need to update Line 22 in server.js to your client app port (i.e. 3001)
6. Copy and paste the following into your browser of choice: localhost:3001 or whatever number you chose
7. In your terminal, navigate to the root folder of Back End and run the following commands
```
$ npm install
$ npm start
```

**Important:** if you are getting conflict erros, you should run `docker stop <container name>` that is already running in the background.
**Important:** if you are getting other erros, you should run `docker-compose down` to bring everything down, and start over.

## 🕹 How to Use
Sign up for account and paste image urls into the input field. The output is a blue box around the head of person in the image. The blue box signifies the detection of a face.

- To access backend's bash:
Run `docker-compose exec smart-brain-api bash`

- To access postgres: (adjust PORT number if needed)
Run  `psql postgres://<username>:<password>@localhost:5432/smart-brain`

- To access redis:
Run `docker-compose exec redis redis-cli`

## 📣 Reference
- Section 10: Code Analysis, Section 11: Docker, Section 12: Redis, Section 13: Sessions + JWT of the Udemy Course [the Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)