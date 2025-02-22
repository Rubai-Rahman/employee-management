export type FullName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
  _id: string;
};

export type Employee = {
  employeeId?: number;
  _id: number;
  fullName: { firstName: string; lastName: string };
  email: string;
  phone: string;
  address: { street: string; city: string; country: string };
  profilePicture?: string;
  department: string;
};
