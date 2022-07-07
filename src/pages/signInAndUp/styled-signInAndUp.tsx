import { ReactNode } from "react";
import styles from "./styled-signInAndUp.module.css";

const SignInAndUpContainer = ({ children }: { children: ReactNode }) => (
  <div className={styles.signInAndUpContainer}>{children}</div>
);

export default SignInAndUpContainer;
