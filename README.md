
# Flight Booking Application

## Introduction

Welcome to the Flight Booking Application – a React Native mobile app that allows users to authenticate, search for flights, and view results.

## Features

1. **Authentication:**
   - Users can securely log in to their accounts.

2. **Flight Search:**
   - Search for flights based on specified criteria such as departure, destination, and date.

3. **Results:**
   - View a list of flight options based on the search criteria.

## Screens

### 1. Login Screen
   - Users can enter their credentials to log in.
   - Secure authentication using email and password.

### 2. Home/Search Screen
   - Input fields for departure, destination, and date.
   - Search button triggers flight search based on user input.

### 3. Results Screen
   - Displays a list of available flights based on the search criteria.
   - Each flight includes details such as flight number, departure time, and airline.


## Project Structure

    src
        - components
        - navigators
        - resources
            - colors
            - config
            - constants
            - images
        - screens
        - services
        - types

- src - This is the root folder when all the business logic and assets and everything is resides in it.
- components - In this folder re-usable components are created.
- navigators - In this folder, all the navigation related files will reside.
- resources - In this folder, all the static assests will reside.
  - colors - all the colors which are used inside the app reside in this folder.
  - config - all the configuration related info will reside in this folder like baseURL, aws urls etc.
  - constants - all the constants which are used for async storage and some static stuff which is repeating in the app will reside here.
  - fonts - all the fonts will reside in this folder.
  - images - all the static images and gifs and videos will reside in this folder.
- screens - all the main screens which are displaying to the user in the application reside in this folder.
- services - helper methods, static data, api endpoints, api methods all reside in this folder.
- types - global file for types mentioned in the screens folder.

## How to run project

- Basic requirements

  - Nodejs installed in your system.
  - Android Studio is installed and configured properly, or else you can go to this url for configuration 👉 [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).
  - Java installed and configured properly.
  - Code editor of your choice (preferred VS Code).
  - Physical android device or emulator, for ios (you should have a macos with the above this configured).

- To run project

  - Install the necessary dependencies with the following command.

    ```nodejs
    // using npm

    npm install

        or

    // using yarn

    yarn

    ```

  - After installing dependencies, now run the metro bundler with the below command.

    ```nodejs
      npm start or npx react-native start

              or

      yarn start or npx react-native start

    ```

  - After running the metro bundler, open another terminal inside this folder and run below command.

    ```nodejs
      npm run android or npx react-native run-android

              or

      yarn run android or npx react-native run-android
    ```

Yayy, That's it!, you have successfully run FlightsSearch project.

## Note

This project is completely written using typescript, so you should have a basic knowledge on how to work with typescript along with that javascript and react-native knowledge.
