export type User = {
  identity: string;
  password: string;
};

export type NewUser = User & {
  passwordConfirm: string;
};
