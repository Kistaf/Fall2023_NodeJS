import { users } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { User } from "../types/entities.ts";
import { eq } from "drizzle-orm";

// type UserRepository = {
//   createUser: (uid: string, email: string) => Promise<User | undefined>;
// };

const createUserRepository = () => {
  const createUser = async (
    uid: string,
    email: string,
    avatarURL: string
  ): Promise<User | undefined> => {
    try {
      const user = await db
        .insert(users)
        .values({
          id: uid,
          email: email,
          avatarURL,
        })
        .returning();
      if (!user) return undefined;
      return user[0];
    } catch (error) {
      return undefined;
    }
  };

  const userByEmail = async (email: string) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  };

  return {
    createUser,
    userByEmail,
  };
};

export default createUserRepository();
