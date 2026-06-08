// [AI Generated Code - Prompt: "Tạo AuthContext quản lý đăng nhập và đăng ký mock dùng LocalStorage bằng Tiếng Việt, đồng bộ danh sách user từ db.json, hỗ trợ biến user và currentUser"]

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: 1,
    name: "Quản trị viên",
    email: "admin@fpt.edu.vn",
    password: "123456",
    role: "admin"
  },
  {
    id: 2,
    name: "Giảng viên John",
    email: "instructor1@fpt.edu.vn",
    password: "123456",
    role: "instructor"
  },
  {
    id: 3,
    name: "Giảng viên Emily",
    email: "instructor2@fpt.edu.vn",
    password: "123456",
    role: "instructor"
  },
  {
    id: 4,
    name: "Học viên Alice",
    email: "student1@fpt.edu.vn",
    password: "123456",
    role: "student"
  },
  {
    id: 5,
    name: "Học viên Bob",
    email: "student2@fpt.edu.vn",
    password: "123456",
    role: "student"
  },
  {
    id: 6,
    name: "Học viên Charlie",
    email: "student3@fpt.edu.vn",
    password: "123456",
    role: "student"
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khởi tạo danh sách người dùng và phiên đăng nhập
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
      setUsers(DEFAULT_USERS);
    } else {
      setUsers(JSON.parse(storedUsers));
    }

    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
    setLoading(false);
  }, []);

  // Phương thức đăng nhập
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (foundUser) {
          const userSession = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
          };
          localStorage.setItem('currentUser', JSON.stringify(userSession));
          setCurrentUser(userSession);
          resolve(userSession);
        } else {
          reject(new Error('Email hoặc mật khẩu không chính xác.'));
        }
      }, 600);
    });
  };

  // Phương thức đăng ký
  const register = (name, email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const latestUsers = JSON.parse(localStorage.getItem('users')) || DEFAULT_USERS;

        const emailExists = latestUsers.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
          reject(new Error('Email này đã được đăng ký trên hệ thống.'));
          return;
        }

        const newUser = {
          id: latestUsers.length > 0 ? Math.max(...latestUsers.map(u => u.id)) + 1 : 1,
          name,
          email,
          password,
          role
        };

        const updatedUsers = [...latestUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        resolve(newUser);
      }, 800);
    });
  };

  // Phương thức đăng xuất
  const logout = () => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      resolve();
    });
  };

  const value = {
    users,
    currentUser,
    user: currentUser, // Hỗ trợ cả 'user' và 'currentUser' để tương thích ngược
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

export default AuthContext;
