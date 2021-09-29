import 'reflect-metadata';
const metadataKey = 'exposed';

export function exposed(target, propertyKey) {
    Reflect.defineMetadata(metadataKey, true, target, propertyKey);
}

export function isExposed<T>(instance: T, propertyKey: string) {
  
  return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
}