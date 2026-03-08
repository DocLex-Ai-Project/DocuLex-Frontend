interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type { AuthResponse };