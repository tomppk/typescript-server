import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, RequestHandler, NextFunction } from 'express';

// Look at req.body and make sure that all the different keys exist inside body
// If they are not return a response error message and call next function
// Middleware to check that all the different keys are available
// Returns a function that serves as a middleware
function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }
    next();
  };
}

// Decorator for a class to add root route like '/' before all get, post etc.
// Target is the constructor function of the class
// Create instance of express Router with our own AppRouter class
// Iterate through all keys or properties, methods of the prototype of that class
// Look for 'path' metadata property with url path
// And 'method' property with http method (get, post etc.). Possible methods
// defined in Methods.ts enum so Typescript knows for certain which values
// it can have so that Typescript does not give it value any and error for
// router[method] because this could be anything if not defined in enum
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );

      // If there is no middleware then middlewares is an empty array
      const middlewares =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];

      // Get array of all the keys of the class that is properties, methods,
      // accessors eg. ['email', 'password']
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ||
        [];

      // Middleware to check that all the class or object keys or properties
      // exist inside the req.body object
      const validator = bodyValidators(requiredBodyProps);

      // If there is a 'path' property on object property
      // Then call router method with url, middlewares, validator middleware
      // and a function
      // e.g. get('/auth/login', isAuth, getLogin())
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
