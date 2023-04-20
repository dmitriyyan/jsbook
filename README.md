# JSBook

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

All of your changes get saved to the file you opened JBook with.


## Project Overview

This project is a monorepo containing several packages:

- `cli`: a command-line interface package
- `local-api`: an API package for interacting with a local server
- `local-client`: a web client package for interacting with the API

The root package contains configuration for the monorepo, and uses Lerna to manage the packages.

## Packages
### cli
The cli package provides a command-line interface for running and building the local development environment.

### local-api
The local-api package provides a local API server that can be used to proxy requests to remote servers and provide local data.

### local-client
The local-client package provides a web-based client for interacting with the local API server.

## Scripts
Each package has its own set of scripts defined in its `package.json` file. The following are the scripts defined in the root `package.json` file:
- `npm start`: runs the start script in each package in parallel.

## Installation
To install and run the project, follow these steps:

1. Clone the repository and navigate to the project root directory.
2. Run `npm install` to install all dependencies.
3. Run `npm run start` to start the local development environment.