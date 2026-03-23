export type UserType =
  | {
      email: string;
      id: string;
      username: string;
      provider: string;
      varify?: string | null;
      password?: string | null;
      createdat?: string | null;
      updateat?: string | null;
    }
  | null
  | undefined;
