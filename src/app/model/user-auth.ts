

export interface AuthenticationRequest {
  username: string;
  password: string;
}


export interface AuthenticationResponse {
  role: string;
  status: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  lastLogin: string; // Assuming you'll convert the LocalDateTime to a string
  emailAddress: string;
  accessToken: string;
  refreshToken: string;
}



export interface ApiSuccessResponse<T> {
  status: string;
  data:T
}
