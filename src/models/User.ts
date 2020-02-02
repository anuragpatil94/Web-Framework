import Axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

// To make a property optional ?:
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  attributes: Attributes<UserProps>;
  // No need to create interface since Eventing is Hardcoded
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  constructor(public attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
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
