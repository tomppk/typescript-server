import express from 'express';

// Make the one copy of Router our project will have
// We can associate all our different routes and files to use this one Router
// Private no code outside this class can access it
// Static can access this without needing to create an
// instance of AppRouter class
export class AppRouter {
  private static instance: express.Router;

  // Check if there is instance of AppRouter
  // If not then create one and return it
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
