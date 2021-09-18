# Brew4You Online Coffee Shop

## About the webiste

An website of Brew4You coffee shop that allows coffee lovers get the beloved drinks ready right in front of their doors. With an advanced payment integrated system and modern user interface, our website will provide you an enjoyable and creative experience while you're visitng our website.

## Before you start

### If you newly cloned it from github

1. Create `.env` file from `.env.example` file
1. `npm install` to install node packages for server
1. `cd frontend` && `npm install` to install node packages for client
1. `npm run data:import` to seed static data for products,staffs and users.
1. `npm run dev` to run the application, default URL is [3000](http://localhost:3000/)

## Other commands

1. `npm run data:import` to destroy and seed fresh data
2. `npm run data:destroy` to clear all data in the database
3. `npm run compile-css` to compile `css` style
4. `npm run start` to run `server` separately in `production` mode, default URL is [5000](http://localhost:5000/)
5. `npm run server` to run `server` separately in `development` mode, default URL is [5000](http://localhost:5000/)
6. `npm run client` to run `client` separately

If you have any other questions/concerns, post in in Microsoft Teams so all the team members can see it

Only create pull request into `develop` branch, `master` branch is stable - workable code. Please branch off from `develop` only.
