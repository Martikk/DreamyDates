# Dreamy Dates

## Overview

Welcome to the official website repository of BranFlex. Visit the live site: [Dreamy Dates](https://dreamydates.ca).

Enchanting Moments is an online store dedicated to offering a curated selection of organize your date for unforgettable experiences. Users can browse, select, and purchase type of effortlessly, ensuring memorable moments with loved ones.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./src/Assets/localhost_3000_.png">
  <source media="(prefers-color-scheme: light)" srcset="./src/Assets/localhost_3000_.png">
  <img alt="Dreamy Dates Website" srcset="./src/Assets/localhost_3000_.png">
</picture>

### Problem

In today's busy world, finding unique and memorable experiences date can be challenging. Many people default to traditional dates, which may lack personal touch and emotional value. Enchanting Moments addresses this by providing a platform where users can easily find and book distinctive experiences, making dating more meaningful and special.

### User Profile

- **Primary Users**: Individuals looking for unique date ideas for special occasions such as birthdays, anniversaries, or holidays.
- **Usage**: Users will browse the platform to explore different experience categories, view detailed descriptions and inclusions, and proceed to book and purchase gift certificates.
- **Special Considerations**: 
  - Mobile responsiveness for on-the-go browsing and booking.
  - Simple and secure checkout process.
  - High-quality images and detailed descriptions to help users make informed decisions.

### Features

- **Browsing & Categories**: Users can browse experiences by categories (e.g., adventure, romance, wellness).
- **Product Cards**: Detailed product cards with images, descriptions, what's included, extras, location, and pricing.
- **Booking & Checkout**: Seamless booking process with secure payment gateway.
- **User Profiles**: Users can create profiles to save favorite experiences and track bookings.
- **Search & Filters**: Users can search for experiences and apply filters based on price, location, and type.
- **Reviews & Ratings**: Users can leave reviews and ratings for experiences.

## Implementation

### Tech Stack

- **Frontend**: React.js, SCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Heroku
- **Libraries**:
  - React Router for navigation
  - Axios for API calls
  - Redux for state management
  - Formik for form handling
  - Stripe for payment processing

### APIs

- **External APIs**:
  - ChatGPT to implement a chat bot on the website.
  - Email API (e.g., SendGrid) for sending booking confirmations.
  - Google Maps API for displaying locations.


### Sitemap

- **Home Page**: Overview of featured experiences and categories.
- **Category Pages**: Lists of experiences filtered by category.
- **Product Page**: Detailed view of an experience, including description, inclusions, and booking options.
- **Cart & Checkout**: Pages for reviewing cart items and completing the purchase.
- **User Profile**: User account management and booking history.

### Mockups

Visual mockups will be created using Figma, showcasing the design for key pages including the home page, category pages, product pages, cart, and user profile. Hand-drawn sketches can be provided initially, followed by digital mockups.

### Data

- **Experiences**:
  - ID
  - Title
  - Description
  - Image URL
  - Category
  - What's Included
  - Extras
  - Location
  - Price
- **Users**:
  - ID
  - Name
  - Email
  - Password
  - Favorite Experiences
  - Booking History
- **Bookings**:
  - ID
  - User ID
  - Experience ID
  - Booking Date
  - Status

### Endpoints

- **User Endpoints**:
  - `POST /api/users/register`: Register a new user
  - `POST /api/users/login`: User login
  - `GET /api/users/profile`: Get user profile
  - `PUT /api/users/profile`: Update user profile
- **Experience Endpoints**:
  - `GET /api/experiences`: Get all experiences
  - `GET /api/experiences/:id`: Get a single experience by ID
- **Booking Endpoints**:
  - `POST /api/bookings`: Create a new booking
  - `GET /api/bookings/user/:userId`: Get bookings for a user

### Auth

Authentication will be implemented using JWT (JSON Web Tokens). On successful login, a token will be issued to the user, which will be stored in local storage and used to authenticate subsequent requests. Authorization middleware will ensure protected routes are accessible only to authenticated users.

## Roadmap

### Week 1
- Set up project repository and environment.
- Design database schema.
- Develop frontend layout and basic navigation.
- Implement experience browsing and detailed product pages.
- Set up backend endpoints for experiences.

### Week 2
- Develop booking and checkout process.
- Integrate Stripe for payment processing.
- Final testing and deployment to Heroku.

### Week 3
- Implement user profile management.
- Implement user authentication (register, login, JWT).

### Week 4
- Add search and filter functionality.
- Implement reviews and ratings.
- Final testing and deployment to Heroku.

## Nice-to-haves

- **Wishlist**: Allow users to save experiences to a wishlist.
- **Admin Panel**: Interface for managing experiences and bookings.
- **Notifications**: Email or SMS notifications for booking confirmations and reminders.
- **Advanced Search**: Include additional filters like date, group size, and duration.
- **Social Sharing**: Enable users to share experiences on social media.

## Animations

### Overview

The project includes various animations to enhance user experience and engagement. These animations are implemented using CSS transitions, keyframes, and JavaScript for interactive elements.

### Types of Animations

1. **Hover Effects**:
   - Buttons and links change color and scale up slightly on hover to provide visual feedback.
   - Example:
     ```scss
     .button:hover {
       transform: scale(1.1);
       background-color: #e65c50;
       transition: transform 0.3s, background-color 0.3s;
     }
     ```

2. **Image Fade-In**:
   - Product images fade in when they appear on the screen to create a smooth loading experience.
   - Example:
     ```scss
     .product-image {
       opacity: 0;
       transition: opacity 1s;
     }

     .product-image.visible {
       opacity: 1;
     }
     ```

3. **Raindrop Animation**:
   - Simulated raindrop effect on the background to create a tranquil and immersive atmosphere.
   - Example:
     ```scss
     @keyframes rainDrop {
       0% {
         top: -10%;
         opacity: 0;
       }
       10% {
         opacity: 1;
       }
       100% {
         top: 110%;
         opacity: 0;
       }
     }

     .rain-drop {
       position: absolute;
       width: 2px;
       height: 10px;
       background-color: rgba(255, 255, 255, 0.6);
       animation: rainDrop 2s linear infinite;
       opacity: 0;
     }
     ```

4. **Page Transitions**:
   - Smooth transitions between different pages to maintain a continuous flow.
   - Implemented using React Router transitions.

### Adding Animations

To add animations, follow these steps:

1. Identify the element you want to animate.
2. Apply the appropriate CSS classes or keyframes.
3. Use JavaScript or React hooks to trigger the animation based on user interactions or state changes.

---

Feel free to explore, contribute, and create enchanting moments for everyone!
