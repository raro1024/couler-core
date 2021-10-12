import 'reflect-metadata';
const metadataKey = 'exposed';
const startUpTaskKey = 'startUpTask';
var tasks=[]
export function exposed(target, propertyKey) {
    Reflect.defineMetadata(metadataKey, true, target, propertyKey);
}

export function isExposed<T>(instance: T, propertyKey: string) {
  
  return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
}
export function startUpTask(target, propertyKey) {
  
  Reflect.defineMetadata(startUpTaskKey, true, target, propertyKey);
  tasks.push([target,propertyKey])
}

export function getstartUpTasks() {
  return tasks;
}
