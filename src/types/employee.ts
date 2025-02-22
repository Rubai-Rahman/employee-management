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
  _id: string;
  employeeId: number;
  fullName: FullName;
  phone: string;
  email: string;
  address: Address;
  department: string;
  status: 'active' | 'inactive';
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};
