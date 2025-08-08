export interface User {
  role: string;
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}
