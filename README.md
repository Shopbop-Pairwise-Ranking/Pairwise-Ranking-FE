# Pairwise Ranking Frontend

## Demo Link

The frontend is live and deployed at: [Amazon CloudFront](https://d2h7mbvn5z1qtj.cloudfront.net)

## Repository Link

[GitHub Repository](https://github.com/Shopbop-Pairwise-Ranking/Pairwise-Ranking-FE)

---

## Project Overview

The **Pairwise Ranking Frontend** is part of a fashion discovery platform for **Shopbop**, an Amazon company. It provides an intuitive interface for users to compare and rank fashion items dynamically. The frontend seamlessly integrates with the backend APIs to fetch product data, rankings, and trending information, offering an engaging and interactive shopping experience. This application is built using Angular and follows modern design practices for scalability.

### Key Features

- **Interactive Ranking System**: Allows users to compare two items at a time and rank them based on preferences.
- **Leaderboard View**: Displays the top-ranked items categorized by clothing type or gender.
- **User Authentication**: Includes login and signup functionalities to secure user data.
- **API Integration**: Fetches product data, rankings, and trending information dynamically.

---

## Setup Steps

### Prerequisites

- **Node.js**: Ensure Node.js is installed (version 14.x or higher).
- **Angular CLI**: Install Angular CLI globally:
  ```bash
  npm install -g @angular/cli
  ```
- **Environment Variables**: Ensure backend API endpoints are accessible and update the `environment.ts` file accordingly.

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Shopbop-Pairwise-Ranking/Pairwise-Ranking-FE.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Pairwise-Ranking-FE
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

   The application will run on `http://localhost:4200/` by default.

5. Build the project for production (optional):

   ```bash
   ng build --prod
   ```

The frontend is deployed at: [Amazon CloudFront](https://d2h7mbvn5z1qtj.cloudfront.net)

---

## How the Code Works

### Code Structure

The project is organized into the following key components:

#### Configurations

- **angular.json**: Project configuration for Angular CLI.
- **tsconfig.json**: TypeScript configuration for project compilation.
- **environment.ts**: Environment-specific variables for API integration.

#### Components

- **navbar**: Implements the navigation bar for the application.
- **product-ranking**: Provides the core ranking interface for comparing items.
- **leaderboard**: Displays ranked items by category.
- **login**: Implements the login interface for user authentication.
- **signup**: Facilitates user registration.
- **trending**: Shows trending products based on user rankings.
- **footer**: Displays the footer section with basic application details.

#### Services

- **auth.service.ts**: Handles user authentication by integrating with the backend.
- **product-ranking.service.ts**: Manages API calls for fetching product ranking data and submitting user rankings.
- **trending.service.ts**: Fetches trending product information from the backend.

#### Interfaces

- **product.ts**: Defines the structure for product-related data.
- **ranking.ts**: Specifies the data format for ranking submissions.
- **user.ts**: Details user-related data structures.

#### Pages

- **home**: Landing page introducing the ranking system.
- **product-ranking**: Main interface for comparing and ranking products.
- **leaderboard**: Displays top-ranked products by category.
- **login**: Authentication page for user login.
- **signup**: Registration page for new users.
- **trending**: Showcases trending products.

#### Assets

- **assets/images**: Stores static images used in the application.

---

## What Works and What Doesn’t

### What Works

- **Interactive Ranking System**: Users can rank products effectively.
- **Leaderboard**: Displays rankings dynamically based on user activity.
- **API Integration**: Communicates effectively with the backend for data retrieval and submission.

### What Doesn’t Work

- **Responsive Design**: Currently, the app does not adjust seamlessly for desktop and mobile platforms.
- **Error Handling**: Needs improvement for better handling of API failures or invalid inputs.
- **Accessibility**: Some UI components need enhancements for accessibility compliance.
- **Performance Optimization**: Large datasets may affect loading times; pagination or lazy loading could be implemented.

---

## Next Steps

1. **Enhance Error Handling**: Improve error messages and fallback mechanisms for API issues.
2. **Optimize Performance**: Implement lazy loading for large datasets.
3. **Add Unit and Integration Tests**: Increase test coverage for critical components and services.
4. **Improve Accessibility**: Ensure compliance with WCAG standards.
5. **Implement Responsive Design**: Make the app fully functional on all devices, including desktops and mobiles.
6. **Analytics Integration**: Add tracking to monitor user interactions and optimize user experience.
7. **Dark Mode**: Introduce a dark mode for improved usability.

---
