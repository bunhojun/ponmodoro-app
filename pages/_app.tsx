import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import CurrentUserContext, { UserType } from "../src/contexts/user/UserContext";
import { CssBaseline } from "@material-ui/core";
import { auth, createUserProfileDocument } from "../src/firebase/firebase";
import { Inner, Wrapper } from "../src/components/common-style/common-style";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentUserStorage =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || '{"":""}')
      : {};
  const [currentUser, setCurrentUser] = useState<UserType>(currentUserStorage);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot((snapShot) => {
            const snapshotData = snapShot.data();
            if (snapshotData && !snapshotData.todos) {
              snapshotData.todos = {};
            }
            const currentUserData = {
              ...snapshotData,
              id: snapShot.id,
            };
            setCurrentUser(currentUserData);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(currentUserData)
            );
          });
        }
      } else {
        setCurrentUser({});
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  useEffect(() => {
    if (!currentUser.id) {
      router.replace("/signin");
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <React.StrictMode>
        <CssBaseline />
        <Wrapper>
          <Component {...pageProps} />
          <footer>
            <Inner>&#169; Hojun Bun</Inner>
          </footer>
        </Wrapper>
      </React.StrictMode>
    </CurrentUserContext.Provider>
  );
}

export default MyApp;
