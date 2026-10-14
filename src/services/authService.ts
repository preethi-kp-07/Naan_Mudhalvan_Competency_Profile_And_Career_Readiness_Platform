import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

const AUTH_USER_KEY = 'nm_demo_user';
const AUTH_TOKEN_KEY = 'nm_auth_token';

class AuthService {
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch {
        this.currentUser = INITIAL_USERS[0]; // Default to student Preethi S.
      }
    } else {
      this.currentUser = INITIAL_USERS[0]; // Default to student Preethi S.
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(this.currentUser));
      localStorage.setItem(AUTH_TOKEN_KEY, 'demo-jwt-student-token-preethi');
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public subscribe(listener: (user: User | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l(this.currentUser));
  }

  public login(email: string, _password?: string, requestedRole?: UserRole): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user: User | undefined;

        if (requestedRole) {
          user = INITIAL_USERS.find(u => u.role === requestedRole);
        } else {
          user = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        }

        if (!user && email.includes('admin')) {
          user = INITIAL_USERS.find(u => u.role === 'admin');
        } else if (!user) {
          user = INITIAL_USERS[0]; // Fallback to student
        }

        if (user) {
          this.currentUser = user;
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
          localStorage.setItem(AUTH_TOKEN_KEY, `demo-jwt-${user.role}-${user.id}`);
          this.notify();
          resolve(user);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 300);
    });
  }

  public register(studentData: {
    fullName: string;
    collegeEmail: string;
    registerNumber: string;
    department: string;
    yearOfStudy: number;
    password?: string;
  }): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user-stu-${Date.now()}`,
          name: studentData.fullName,
          email: studentData.collegeEmail,
          role: 'student',
          registerNumber: studentData.registerNumber,
          department: studentData.department,
          yearOfStudy: studentData.yearOfStudy,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        };

        this.currentUser = newUser;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
        localStorage.setItem(AUTH_TOKEN_KEY, `demo-jwt-student-${newUser.id}`);
        this.notify();
        resolve(newUser);
      }, 350);
    });
  }

  public logout(): Promise<void> {
    return new Promise((resolve) => {
      this.currentUser = null;
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      this.notify();
      resolve();
    });
  }

  public switchDemoRole(role: UserRole): User {
    const target = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    this.currentUser = target;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(target));
    localStorage.setItem(AUTH_TOKEN_KEY, `demo-jwt-${target.role}-${target.id}`);
    this.notify();
    return target;
  }
}

export const authService = new AuthService();
