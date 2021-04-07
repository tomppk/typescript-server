import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';

// Decorator for a class to add root route like '/' before all get, post etc.
// Target is the constructor function of the class
// Create instance of express Router with our own AppRouter class
// Iterate through all keys or properties, methods of the prototype of that class
// Look for 'path' metadata property
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata('path', target.prototype, key);

      // If there is a 'path' property on object property
      // Then call e.g. get('/auth/login', getLogin())
      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
