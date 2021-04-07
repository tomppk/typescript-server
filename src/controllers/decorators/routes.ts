// Enable using metadata. Gives access to global Reflect object.
import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// Factory decorator that takes url path as argument and returns decorator
// This factory decorator is wrapped inside another function that takes in the
// http method (get, post etc.) as argument and passes it down to decorator
// First argument target prototype of class
// Second key name of class property, method or accessor
// Third descriptor of property (eg. writable etc.)
// defineMetadata
// first argument is the name or key of metadata property to be added
// second the value of the metadata key
// third the class prototype where it is added
// fourth the key or name of property in that class where metadata is added
// Add two metadata properties 'path' and the http method to use

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

// Create and export all our different HTTP methods
// When we call routeBinder with 'get' it is going to return a factory decorator
// The factory decorator has a reference back to method argument
// All the possible HTTP routes to use are defined in Methods enum so we
// always know which values they can have
export const get = routeBinder(Methods.Get);
export const put = routeBinder(Methods.Put);
export const post = routeBinder(Methods.Post);
export const del = routeBinder(Methods.Del);
export const patch = routeBinder(Methods.Patch);
