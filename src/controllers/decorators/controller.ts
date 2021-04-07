import 'reflect-metadata';

// Decorator for a class to add root route like '/' before all get, post etc.
// Target is the constructor function of the class
// Iterate through all keys or properties, methods of the prototype of that class
// Look for 'path' metadata property
export function controller(routePrefix: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata('path', target.prototype, key);
    }
  };
}
