export interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface LogForm {
  email: string;
  password: string;
}
export interface RatingForm {
  id: number;

  message: string;
  rate: number;
  name: string;

  userId: number;

  productId: number;
}
