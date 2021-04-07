import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

// Factory decorator that returns a decorator function
// Use spread operator as we do not know how many keys
// there will be. eg. ['email', 'password', 'username']
export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
  };
}
