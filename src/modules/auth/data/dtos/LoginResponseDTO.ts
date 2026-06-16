export interface LoginResponseDTO {
  token: string;
  refresh_token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
