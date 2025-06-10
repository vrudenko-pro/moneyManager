export interface Expense {
  amount: string;
  category: string;
  date: string;
  id: string;
  title: string;
}

export interface UserData {
  userId: string;
  data: Expense[];
}
