import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

// Middleware type comes from express RequestHandler
// Decorator for middlewares our routes might have
// Factory decorator that returns a decorator function
// Middlewares is a metadata property if it exists or an empty array
// Add the middlewares array back to objects metadata 'middleware' property
// with previous array contents using spread and add the new middleware to array
export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
