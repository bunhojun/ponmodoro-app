import { ReactNode, useContext } from "react";
import CurrentUserContext from "../../contexts/user/UserContext";
import { Inner } from "../common-style/common-style";

type Props = {
  children: ReactNode;
};

export const AuthedPage = ({ children }: Props): JSX.Element => {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser?.id) {
    return <Inner />;
  }
  return <>{children}</>;
};
