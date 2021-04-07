import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

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

      // If there is a 'path' property on object property
      // Then call router method with url, middlewares, and a function
      // e.g. get('/auth/login', isAuth, getLogin())
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
