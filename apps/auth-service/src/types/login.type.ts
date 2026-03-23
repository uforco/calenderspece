export type JwtPayload = {
  id: string;
  email: string;
  username: string;
  provider: string;
  varify: boolean; // (you probably meant "verify")
  createdat: Date;
  updateat: Date | null;
  iat: string | number;
  exp: string | number;
};

export type LogInUserType = {
  password: string;
} & JwtPayload;
