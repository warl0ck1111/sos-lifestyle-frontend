export interface UserI {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
}


export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}



export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}


export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}



export interface UpdateAppUserProfileRequest {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

export interface UpdateAppUsersEmailRequest {
  oldEmail: string;
  newEmail: string;
}



