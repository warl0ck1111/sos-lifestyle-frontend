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
  dateOfBirth:string
  gender:string
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
  phoneNumber?: string;
  dateOfBirth: string;
  gender: string;
}

export interface UpdateAppUsersEmailRequest {
  oldEmail: string;
  newEmail: string;
}





export interface UsersListResponse {
  id: number
  firstName: string
  lastName: string
  username?: string
  email: string
  phoneNumber: any
  role: string
  dateOfBirth: any
  gender: any
  profilePhotoUrl: any
  locked: boolean
  enabled: boolean
  lastLogin: string
  timeCreated: string
  timeUpdated: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  authorities: Authority[]
}

export interface Authority {
  authority: string
}


