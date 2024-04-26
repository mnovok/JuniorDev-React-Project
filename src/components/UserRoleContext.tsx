import React, { createContext, useState, useContext } from 'react';

type UserRole = 'user' | 'admin';

interface UserRoleContextType {
  role: UserRole;
  toggleRole: () => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('user');

  const toggleRole = () => {
    setRole(role === 'user' ? 'admin' : 'user');
  };

  return (
    <UserRoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
