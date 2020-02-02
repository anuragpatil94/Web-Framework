import { User } from "./models/User";

const user = new User({ name: "ANurag", age: 20 });

user.on("change", () => {
  console.log("This is a Callback");
});
user.on("save", () => {
  console.log("Save");
});

user.trigger("save");
console.log(user);
