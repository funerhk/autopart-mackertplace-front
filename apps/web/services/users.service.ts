import type { AuthUser } from "@autoparts/shared";

// Pending backend: TESTING_GUIDE.md does not expose users/profile endpoints yet.
export const usersService = {
  async me(): Promise<AuthUser | null> {
    return null;
  },
};
