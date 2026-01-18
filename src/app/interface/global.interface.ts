export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: UserFormData) => void;
  updateUser: (id: number, user: UserFormData) => void;
  deleteUser: (id: number) => void;
  getUser: (id: number) => User | undefined;
}

export interface ToastMessage {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}