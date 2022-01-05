import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserData {
  id: string;
  username: string;
}

export interface AuthContextInterface {
  user: UserData | null;

  setUser: Dispatch<UserData | null>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const defaultValue = {};

const AuthContext = createContext<AuthContextInterface>(
  defaultValue as AuthContextInterface
);

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const auth = useAuthFunction();

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export function useLocalStorageState(defaultValue: {}, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue: string | false | null =
      typeof window !== "undefined" && window.localStorage.getItem(key);
    return stickyValue !== null && typeof stickyValue === "string"
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function useAuthFunction() {
  const [user, setUser] = useLocalStorageState({}, "lavaUserId");

  console.log(user);

  return {
    user,
    setUser,
  };
}

export { useAuth, AuthContextProvider };
