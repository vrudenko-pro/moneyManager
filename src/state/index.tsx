import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Expense, UserData } from '../core/types';

interface AppContextData {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  addCurrentExpense: (data: Expense) => void;
  editCurrentExpense: (data: Expense) => void;
  deleteExpense: (id: string) => void;
  loadExpense: (id: SetStateAction<UserData>) => void;
}

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateContext = createContext<AppContextData | null>(null);

export const StateProvider = ({ children }: StateProviderProps) => {
  const [userData, setUserData] = useState<UserData>({ userId: '', data: [] });

  const loadExpense = (user: SetStateAction<UserData>) => {
    setUserData(user);
  };

  const addCurrentExpense = useCallback(
    (data: Expense) => {
      setUserData({
        ...userData,
        data: [...(userData?.data || {}), data],
      });
    },
    [userData],
  );

  const editCurrentExpense = useCallback(
    (data: Expense) => {
      const itemIndex = userData?.data.findIndex(item => item.id === data.id);
      setUserData({
        ...userData,
        ...(userData.data[itemIndex] = data),
      });
    },
    [userData],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      const newData = userData.data.filter(item => id !== item.id);

      setUserData({
        ...userData,
        data: newData,
      });
    },
    [userData],
  );

  const providerValues = useMemo(
    () => ({
      userData,
      loadExpense,
      setUserData,
      addCurrentExpense,
      editCurrentExpense,
      deleteExpense,
    }),
    [addCurrentExpense, deleteExpense, editCurrentExpense, userData],
  );

  return (
    <StateContext.Provider value={providerValues}>
      {children}
    </StateContext.Provider>
  );
};
