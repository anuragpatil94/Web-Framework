import Axios, { AxiosResponse } from "axios";

// To make a property optional ?:
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// Type Alias
type Callback = () => void;
export class User {
  // To store all the events
  private events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    // since this.events[eventName] can either be array of callbacks or undefined
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }

  fetch(): void {
    Axios.get(`http://localhost:3000/users/${this.get("id")}`).then(
      (response: AxiosResponse): void => {
        this.set(response.data);
      }
    );
  }

  save(): void {
    const id = this.get("id");
    if (id) {
      //put
      Axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      //post
      Axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}
