import { Eventing } from "./Eventing";
import Axios, { AxiosResponse } from "axios";

// T - Class
// P - Props
export class Collection<T, P> {
  models: T[] = [];
  private events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: P) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    Axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      response.data.forEach((model: P) => {
        this.models.push(this.deserialize(model));
      });

      this.trigger("change");
    });
  }
}
