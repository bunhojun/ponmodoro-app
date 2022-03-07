import { useState } from "react";

export type ShowProgressBar = () => void;
export type CloseProgressBar = () => void;

export const useProgressBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showProgressBar = () => {
    setIsLoading(true);
  };
  const closeProgressBar = () => {
    setIsLoading(false);
  };
  return {
    isLoading,
    showProgressBar,
    closeProgressBar,
  };
};
