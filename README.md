# Car Rental Reservation System Backend

This repository contains the backend implementation for a Car Rental Reservation System, built using TypeScript, Express.js, and MongoDB with Mongoose ODM.

## Features

- **Authentication & Authorization**
  - User signup and login with JWT authentication.
  - Role-based access control (admin and user roles).

- **Car Management**
  - Create, read, update, and delete cars (soft delete).
  - List all cars and get details of a specific car.
  - Admin-exclusive functionality.

- **Booking Management**
  - Users can book cars for specific dates and times.
  - Admins can view all bookings, calculate total costs, and mark bookings as returned.

- **Error Handling**
  - Centralized error handling with descriptive error messages.
  - Differentiates between validation errors, duplicate entries, and other errors.

- **Transaction & Rollback**
  - Ensures data integrity during critical operations like booking and returning cars.

- **RESTful API**
  - Well-defined API endpoints for seamless interaction.
  - Includes query parameters and request body specifications.

## Technology Stack

- **TypeScript**: Language used for development.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for storing application data.
- **Mongoose**: ODM library for MongoDB and data validation.
