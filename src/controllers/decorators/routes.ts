// Enable using metadata. Gives access to global Reflect object.
import 'reflect-metadata';

// Factory decorator that takes url path as argument
// and returns decorator.
// First argument target prototype of class
// Second key name of class property, method or accessor
// Third descriptor of property (eg. writable etc.)
// defineMetadata
// first argument is the name or key of metadata property to be added
// second the value of the metadata key
// third the class prototype where it is added
// fourth the key or name of property in that class where metadata is added
export function get(path: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, target, key);
  };
}
