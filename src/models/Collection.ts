import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";
import Axios, { AxiosResponse } from "axios";

export class Collection {
  models: User[] = [];
  private events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    Axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      response.data.forEach((model: UserProps) => {
        const user = User.buildUser(model);
        this.models.push(user);
      });

      this.trigger("change");
    });
  }
}
