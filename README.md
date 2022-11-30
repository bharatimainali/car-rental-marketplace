# 🚗 Car rental marketplace

## Prerequisites

-   Node.js v14 or v16 (preferred), download from [here](https://nodejs.org/en/download/releases/).
-   Node package manager (npm), comes bundled with Node.js.
-   Make sure you installed Node.js build tools during Node.js installation, by checking "Automatically install the necessary tools.".
-   Have cloned or downloaded this repository, unzipping the file if needed.

## To run the app

Open the folder in a text editor that has a built-in terminal, e.g. Visual Studio Code. Open a terminal, and run the following commands:

-   `npm ci` to install all required dependencies. If any warnings about deprecated dependencies show, these can be safely ignored.
-   `npm run setup` to automatically setup the database and insert mock data.
-   `npm start` to start the application. Open a web browser and go to http://localhost:3000 to view the web application.

## Running tests

-   `npm test` will initiate Jest to run all tests specified in `/test` folder. Results will be outputted in terminal.
-   `npm run coverage` will generate coverage report in `/coverage`, and also display table of summary in terminal. To view a webpage of the coverage report, open the file `/coverage/lcov-report/index.html` in a web browser.
-   If any tests fail, please run `npm run setup` to reset database and user data, and try again.

## Resetting data

-   The `npm run setup` command automatically resets the database and clears user generated data, regenerating the database with fresh data. Uploaded items such as images are also deleted.
-   Run `npm start` as normal, and the app will be as you opened it for the first time.

## Troubleshooting

-   If you experience any issues, it is probably because dependencies was not successfully installed, or you are using an unsupported version of Node.js or npm. Make sure Node.js v14 or v16 are installed (`node -v` will show version), version 16 being preferred. If dependencies fail to install through `npm ci`, the command `npm install` may be used.
