import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const user = User.buildUser({ name: "NAME", age: 20 });

const root = document.querySelector("#root");

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw "Root element not found";
}
