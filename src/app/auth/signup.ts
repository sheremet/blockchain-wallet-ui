export interface ISignupRequest {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

export interface ISignupForm extends ISignupRequest {
  confirmPassword: string;
}

export interface ISignupResponse {
  id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
}
