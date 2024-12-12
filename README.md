# Pairwise-Ranking-FE

## Project Overview
The **Pairwise Ranking Frontend** is part of a fashion discovery platform for Shopbop, an Amazon company. It offers users an intuitive interface to compare and rank fashion items in a pairwise ranking system. The data collected is used to display leaderboards of popular items by category, providing an engaging and interactive shopping experience. This frontend is built with Angular and integrates with Shopbop's API for real-time product updates.

## Features

- **Interactive Ranking System:** Users can compare two items at a time and rank them based on preferences.
- **Leaderboard View:** Displays the top-ranked items categorized by clothing type or gender.
- **User Authentication:** Login and signup functionalities to secure user data.
- **API Integration:** Fetches product data, rankings, and trending information dynamically.
- **Responsive Design:** Seamlessly adjusts for desktop and mobile interfaces.

## Key Components

### Configurations
- **`angular.json`:** Project configuration for Angular CLI.
- **`tsconfig.json`:** TypeScript configuration for project compilation.
- **`environment.ts`:** Environment-specific variables for API integration.

### Components
- **`banner-top`:** Displays a promotional or navigational banner at the top of the application.
- **`footer`:** Contains the footer section of the application, providing copyright information.
- **`image-card`:** A reusable component to display individual product images and details.
- **`navbar`:** Implements the navigation bar for the application.
- **`product-card`:** Represents individual products in the ranking interface.
- **`rank-card`:** Shows details of ranked items, used in the leaderboard view.

### Interfaces
- **`latest-ranking-response.ts`:** Defines the structure of the API response for the latest rankings.
- **`matchups.ts`:** Specifies the data structure for ranking matchups between items.
- **`product.ts`:** Details the product data structure fetched from the API.

### Services
- **`auth.service.ts`:** Manages user authentication, including login and signup operations.
- **`product-ranking.service.ts`:** Handles API calls for fetching product ranking data, submitting matchups, and retrieving leaderboard results.

### Pages
- **`category-clothing`:** Displays items filtered by specific clothing categories.
- **`category-gender`:** Lists items categorized by gender (e.g., men's and women's fashion).
- **`home`:** The main landing page that introduces the pairwise ranking system.
- **`login`:** Allows users to log into their accounts.
- **`product-ranking`:** The core ranking page where users can compare and rank items.
- **`signup`:** Facilitates new user registration.
- **`trending`:** Shows a list of currently trending products based on user interactions.

### Assets
- **`assets/images`:** Contains static images used in the application.

## Development Instructions

### Development Server
Run `ng serve` for a development server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you make changes to the source files.

### Code Scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests
Run `ng test` to execute the unit tests using Karma.

### Running End-to-End Tests
Run `ng e2e` to execute end-to-end tests. Ensure a testing package is installed for this feature.

## Repo Contents
- **`angular.json`:** Configuration file for Angular CLI.
- **`package.json` and `package-lock.json`:** Lists project dependencies.
- **`src/`:** Contains all source files, including:
  - **`app/`:** Application logic with components, services, interfaces, and routes.
  - **`assets/`:** Static files like images.
  - **`environments/`:** Configuration files for different environments.
- **`README.md`:** Documentation for the frontend project.

## Further Help
For additional Angular CLI help, run `ng help` or visit the [Angular CLI documentation](https://angular.io/cli).
