import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { User, UserContextType, UserFormData } from "../interface/global.interface";

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = useCallback((userData: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      ...userData,
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
    setUsers(prev => [newUser, ...prev]);
  }, [users]);

  const updateUser = useCallback((id: number, userData: UserFormData) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  const getUser = useCallback((id: number) => {
    return users.find(user => user.id === id);
  }, [users]);

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUsers };

