import { ReactNode, useContext } from "react";
import CurrentUserContext from "../../contexts/user/UserContext";

type Props = {
  children: ReactNode;
};

export const AuthedPage = ({ children }: Props): JSX.Element => {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser?.id) {
    return <></>;
  }
  return <>{children}</>;
};
