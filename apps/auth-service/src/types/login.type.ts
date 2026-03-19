export type JwtPayload = {
  id: string;
  email: string;
  username: string;
  provider: string;
  varify: boolean; // (you probably meant "verify")
  createdat: Date;
  updateat: Date | null;
};

export type LogInUserType = {
  password: string;
} & JwtPayload;
