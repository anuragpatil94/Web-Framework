import { UserForm } from "./views/UserForm";
import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ name: "NAME", age: 20 });

const root = document.querySelector("#root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw "Root element not found";
}
