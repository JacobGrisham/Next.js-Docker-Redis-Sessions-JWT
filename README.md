# Face Recognition A.I.: React, Code Analysis, Docker, PostgreSQL, Redis, Cookies, and JWT
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Coding project from the Udemy Course [the Complete Junior to Senior Web Developer Roadmap (2020)](https://www.udemy.com/course/the-complete-junior-to-senior-web-developer-roadmap/)
I wrote the code in docker-compose.yml and Dockerfile. The other files were provided by the instructor. This application takes images as input and detects multiple faces using a machine-learning API as output.

## 💡 Lessons Learned
- Code Analysis: working with legacy codebases
- Client Side Rendering (CSR) vs Server Side Rendering (SSR)
- Next.js `Link` component for client-side rendering
- Next.js shared components for reducing duplication of code among pages
- Next.js `getServerSideProps` for API calls
- Dockerfile and `docker` CLI commands
- docker-compose.yml and `docker-compose` CLI commands to orchestrate services during development
- PostgreSQL in Docker: creating postgres directory with Dockerfile and `CREATE TABLE` commands in login.sql and users.sql to generate sql tables in Docker container
- Redis
- Cookies
- Sessions with JSON Web Tokens (JWT)
- Conventional Commits

## 🤔 Senior Software Engineer Considerations
- ### Client Side Rendering (CSR) vs Server Side Rendering (SSR)
  - #### CSR
    - Files are sent from the server to the client without any rendering (like downloading and executing javascript)
    - Once files are processed, some subsequent requests don't need to make another request to the server because it's already downloaded
  - #### SSR
    - A fully-rendered page is sent from the server to the client. Javascript is downloaded and executed in the background
  - #### Benefits of CSR:
    - Easing load on the servers results in faster responses from the server
    - Snappier user experience once the website is loaded
    - Native-like application since there are no full page reloads
    - (Possible drawback as well) Depending on the user's device and internet connection, can be faster than the server
    - Great for large applications since the server's CPU doesn't hold up the event loop
  - #### Benefits of SSR:
    - Faster initial loading
    - Optimizing search engine optimization (SEO)
    - Great for static sites with text
  - #### SSR React Libraries
    - Next.js: optimal for dynamic applications. The 'work' happens on the server
    - Gatsby.js: optimal for static text-based websites. The 'work' happens on the developer's machine
  
- ### Monolithic vs Microservices Architectures
  - In a monolithic architecture, everything (the database, the back-end API, the front-end client, etc.) is housed on a single server.
  - In a microservices architecture, services are split among servers, often in such a way that there is one service per server.
- ### Why use Docker, and What Came Before It?:
  - Docker is solution that ensures that developers all work in the same environment such that the version number of libraries, dependencies, operating systems, etc. are all the same. This decreases the time spent on on-boarding new team members and debugging merged code conflicts due to different development environments.
  - Before Docker, there were virtualized machines, such as VMware or VirtualBox. Virtual Machines were like having multiple computers (with thier own operating system, kernel, virtual hardware, and software) nested within a master computer. All of these nested computers caused slower runtimes in development and production.
  - Docker utilizes the idea of containers. Containers are a light-weight option compared to virtual machines since they leverage the host operating system. Removing the redundancy of operating systems unlocks faster runtimes.
    - Containers: use the host operating system to generate an isolated environment and to run services defined in an Image.
    - Image: is a file with instructions for the container to run certain operations, such as "install Node.js, install dependencies, and then run this application". [DockerHub](https://hub.docker.com/search?q=&type=image) is a good resource for boilerplate Docker Images
  - Docker is also a solution that allows time-efficient horizontal scalability of services on production servers since Docker Images can be replicated quickly.

## 🚀 Getting Started
### To run this project on your system:
1. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API. You can grab a Clarifai API key [here](https://www.clarifai.com/)
2. Make sure you have [Docker](https://docs.docker.com/get-docker/) installed and running on your computer
3. Make sure you have [PostgreSQL](https://www.postgresql.org/download/) installed and running on your computer. If you installed PostgreSQL with [Homebrew](https://brew.sh/), then you can start PostgreSQL with `brew services start postgresql`
4. In your terminal, navigate to the root folder of Back_End run `docker-compose up` (you will have to run `docker-compose up --build` for the first setup phase)
5. In your terminal, navigate to the root folder of Front_End and install node_modules with `npm install`, then run `npm start` to run the client. React should prompt you to start this server on http://localhost:3001/.

**⚠️ Important:** if you are getting conflict errors, you should run `docker stop <container name>` that is already running in the background.
**⚠️ Important:** if you are getting other errors, you should run `docker-compose down` to bring everything down, and start over.

### To contribute to this project on your system:
- In your terminal, navigate to the root folder of this repository and run `npm install`
- To make git commits, run `npm run commit` to ensure your commit follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines

### To access the Docker services on your system:
- To access the back-end-api service bash, run `docker-compose exec Back_End bash` while container is up and running in the background
- To access the postgres service via the CLI, run  `psql postgres://<username>:<password>@localhost:5432/smart-brain` (adjust PORT number if needed)
- Alternatively, to access the postgres service with a GUI application like [PSeqeul](http://www.psequel.com/):
  - ![PSequel Database Connection Screenshot](img/psequel-connection-screenshot.png)
- To access the redis service, run `docker-compose exec redis redis-cli`

## 📝 Lecture Notes
- ### Dockerfile and Docker CLI commands
  - `docker build -t name_of_container .` to create the container
  - `docker run -it name_of_container` to access the shell of the container
  - `docker run -it -d name_of_container` to run container in background and `docker exec -it container_id_hash bash` to access the bash of the container
  - `docker stop container_id_hash` to stop the container
  - `docker ps` to print read-out of containers running
  - `docker run -it -p 3000:3001 name_of_container` for port forwarding. The `-p` stands for port, `3000` represents the port of the container, and `3001` represents the port on your local machine. You can now visit [localhost:3001](http://localhost:3001)
- ### Docker-Compose CLI commands
  - `docker-compose up --build` to create the container
  - `docker-compose up -d` to run container in background and `docker-compose exec name_of_container bash` to access the bash of the container
  - `docker-compose down` to stop all services
## 📣 Reference
- Section 8: SPA vs Server Side Rendering, Section 10: Code Analysis, Section 11: Docker, Section 12: Redis, Section 13: Sessions + JWT of the Udemy Course [the Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)