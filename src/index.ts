import { User } from "./models/User";

const user1 = new User({ name: "aNu", age: 123 });
console.log(user1.get("name"));
