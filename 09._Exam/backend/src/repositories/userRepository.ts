import { users } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { User } from "../types/entities.ts";

type UserRepository = {
  createUser: (uid: string, email: string) => Promise<User | undefined>;
};

const createUserRepository = (): UserRepository => {
  const createUser = async (
    uid: string,
    email: string
  ): Promise<User | undefined> => {
    try {
      const user = await db
        .insert(users)
        .values({
          id: uid,
          email: email,
        })
        .returning();
      if (!user) return undefined;
      return user[0];
    } catch (error) {
      return undefined;
    }
  };

  return {
    createUser,
  };
};

export default createUserRepository();
