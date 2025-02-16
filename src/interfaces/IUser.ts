export type IUser = {
  phone_number: string;
  first_name: string;
  last_name: string;
  sex: string;
  role: string;
  verified: boolean;
  profile_picture?: string;
  date_of_birth?: Date;
};
