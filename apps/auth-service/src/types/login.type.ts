export type LogInUserType = {
  id: string;
  email: string;
  username: string;
  provider: string;
  varify: boolean; // (you probably meant "verify")
  password: string;
  createdat: Date;
  updateat: Date | null;
};
