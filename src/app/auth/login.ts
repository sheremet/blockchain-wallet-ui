export interface ILoginRequest {
  username: string;
  password: string;
}

interface IUserDetails {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface ILoginResponse {
  account: {
    token: string;
    user: IUserDetails;
  };
}
