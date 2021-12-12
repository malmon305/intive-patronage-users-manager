# User manager app - entry for Intive Patronage 2021

React app created as an entry for Intive Patronage project.  It's a users management application that uses the following technology stack:
- typescript
- react
- material-ui
- react-router
- react-hook-form
- notistack
- json-server

## What features does it have?
The application contains two views:
- Users list view - to present a list of users with their hobbies
- User edit view - used to edit user information and also to add new user

All features required by Patronage program are inside, including sorting by appropriate columns, filtering, multi-select, form validation.

## How to run it?

To start both json-server (server containing mock data for the application) and application you can use the single command `npm run startWithMock`. Alternatively, you will need two terminal windows one to run `npm start` to start the application and the second to run `npm run mock` to start json-server. After that open  [http://localhost:3000](http://localhost:3000) to view it in the browser.
