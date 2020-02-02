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
}
