# Todo-app

Code Academy 2022 - Week 5+6 Assigment

## Backend side

### Run:

- Set up **.env** -> refer .env.example

  ```sh
  cp .env.example .env
  ```

- Install the dependencies

  ```sh
  npm install
  ```

- Run database migration

  ```sh
  npx sequelize-cli db:migrate
  ```

- Start server (auto development mode)
  ```sh
  npm start
  ```

## Frontend side

### Run:

- Set up **.env** -> refer .env.example

  ```sh
  cp .env.example .env
  ```

- Install the dependencies

  ```sh
  npm install
  ```

- Start server (auto development mode)
  ```sh
  npm start
  ```
## Run Using docker
  
- Prequisite: docker

 ```
docker compose up -d
 ```
 
- This will create and run 3 containers (frontend, backend, postgresDB)

