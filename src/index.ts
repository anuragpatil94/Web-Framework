import axios from "axios";
import { User } from "./models/User";

const user1 = new User({ id: 1 });
user1.set({ name: "NewName", age: 23 });
user1.save();
// const user2 = new User({ name: "New User", age: 22 });
// user2.save();
