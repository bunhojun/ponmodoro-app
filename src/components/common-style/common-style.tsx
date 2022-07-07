import { ReactNode } from "react";
import styles from "./common-style.module.css";

type CommonStyle = {
  children: ReactNode;
  className?: string;
};

export const Wrapper = ({ children, className }: CommonStyle) => (
  <div className={`${styles.wrapper} ${className}`}>{children}</div>
);

export const Container = ({ children, className }: CommonStyle) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
);

export const Centering = ({ children, className }: CommonStyle) => (
  <div className={`${styles.centering} ${className}`}>{children}</div>
);

export const Inner = ({ children, className }: CommonStyle) => (
  <div className={`${styles.inner} ${className}`}>{children}</div>
);

export const Form = ({ children, className }: CommonStyle) => (
  <form className={`${styles.form} ${className}`}>{children}</form>
);
