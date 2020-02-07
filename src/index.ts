import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.querySelector("#root");
  if (root) {
    new UserList(root, users).render();
  } else {
    throw "Root element not found";
  }
});

users.fetch();
