import { User } from "../models/User.js";
export async function seedUser() {
    const existingUser = await User.findOne();
    if (!existingUser) {
        const user = await User.create({
            name: "Demo User",
        });
        console.log("Seeded user 👤:", user.name);
    }
    else {
        console.log("User already exists 👤");
    }
}
//# sourceMappingURL=seedUser.js.map