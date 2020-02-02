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

const user1 = User.buildUser({ id: 1 });
user1.on("change", () => {
  console.log(user1);
});
// user1.save();
user1.fetch();
// console.log(user1.get("name"));
