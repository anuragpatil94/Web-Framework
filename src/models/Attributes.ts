import { UserProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) {}

  /**
   *
   * So lets just say that T is UserProps
   * so T = {
   * id?:number,
   * name?:string,
   * age?:number
   * }
   * Now K here is key of T which is [id|name|age]
   * Then T[k] would be [number|string|number]
   *
   * Hence, if K is id T[k] would be number, if K is name T[k] would be string
   *
   * Basically the K can be one of the properties at one time
   */
  /**
   * Second Fix Converting a function into a arrow function
   * automatically bounds it to the Class.
   * Why we need this
   * if it was not an arrow function then the function it is called from will become this.
   * like here this function is called from `user` by reference
   * this will be user because we are actually calling it as a function there.
   * like get() we do in user
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
