import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps> {
  template = () => {
    return `
      <h1>User Form</H1>
      <div>User Name:  ${this.model.get("name")}</div>
      <div>User Age:  ${this.model.get("age")}</div>
        `;
  };
}
