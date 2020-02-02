import Axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

// To make a property optional ?:
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  // No need to create interface since Eventing is Hardcoded
  events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
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
