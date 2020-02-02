import { AxiosPromise, AxiosResponse } from "axios";

export interface ISync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface IModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

export interface IEvents {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: IModelAttributes<T>,
    private events: IEvents,
    private sync: ISync<T>
  ) {}

  /**
   * These are equivalent to get methods
   * This can be done only when events  and attributes are first initialized in constructor.
   * This is because of order of executing constructor and outside initialized variables
   */
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // get on() {
  //   return this.events.on;
  // }
  // get trigger() {
  //   return this.events.trigger;
  // }
  // get get() {
  //   return this.attributes.get;
  // }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id != "number") {
      throw new Error(`Cannot fetch without an id`);
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      /**
       * why not this.attributes.set?
       * i think we can go either way the only difference is
       * that we also want to trigger 'change'
       * */

      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
