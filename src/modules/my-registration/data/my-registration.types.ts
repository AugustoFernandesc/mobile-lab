export type MyRegistrationResponse = {
  id_student: string;
  id_registration: string;
  plan_name: string;
  monthly_value: number;
  due_day: number;
  discount: number;
  pix_key?: string;
  active: boolean;
};
