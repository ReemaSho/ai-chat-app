import { ReactNode, useState } from "react";

import { AuthContext, User } from "./authContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user] = useState<User>({
    id: 1,
    name: "Reema Alshohof",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
