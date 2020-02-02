import { User } from "./models/User";

/**
 * In this Example:
 * 1) we create instance of user with id:1
 * 2) we just have a event change will will notify change
 * 3) fetch data from database from db for id = 1
 * 4) internally trigger change event which we set in step 2
 */
// const user1 = new User({ id: 1 });
// user1.on("change", () => {
//   console.log(user1);
// });
// user1.fetch();

const user1 = new User({ id: 1, name: "Newest Name", age: 54 });
user1.on("save", () => {
  console.log(user1);
});
user1.save();
// console.log(user1.get("name"));
