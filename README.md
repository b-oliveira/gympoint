<h1 align="center">
  <img src="https://github.com/b-oliveira/gympoint/blob/master/frontend/src/assets/logo.svg" title="Gympoint" width="200">
  <br />
  Bootcamp GoStack Gympoint
</h1>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/b-oliveira/gympoint?color=EE4E62">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/b-oliveira/gympoint?color=EE4E62">
  
  <img alt="Stargazers" src="https://img.shields.io/github/stars/b-oliveira/gympoint?color=EE4E62">
</p>


## About the project
This was the final project developed at [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp), an immersive training on NodeJS, ReactJS and React Native technologies. It is a project for gym management.

## Installation
Before you begin, you must have installed PostgreSQL and Redis databases. Rename the file .env.example to .env and configure your development environment. Clone the project and follow the walkthrough.

```bash
git clone https://github.com/b-oliveira/gympoint.git
```

### Back-end

```bash
cd backend

# Install the dependencies
yarn install

# Run the migrations and seeders
yarn sequelize db:migrate
yarn sequelize db:seed:all

# Run the server
yarn dev

# Run the jobs
yarn queue

```

### Front-end

```bash
cd frontend

# Install the dependencies
yarn install

# Run the server
yarn start
```

### Mobile

```bash
cd mobile

# Install the dependencies
yarn install

# Run the metro bundler
react-native start

# Run the app (Android)
react-native run-android
```
Note: The app has been tested on Android only.
