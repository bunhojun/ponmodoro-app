import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { TodoType, UserType } from "../contexts/user/UserContext";

const config = {
  apiKey: "AIzaSyDmqrehVAYs5kin62ptwj_508jDiSd6BUs",
  authDomain: "ponmodoro.firebaseapp.com",
  databaseURL: "https://ponmodoro.firebaseio.com",
  projectId: "ponmodoro",
  storageBucket: "ponmodoro.appspot.com",
  messagingSenderId: "379869812380",
  appId: "1:379869812380:web:29da73e69b29c7b6573f59",
  measurementId: "G-DPRDXGVY26",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(provider);

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: UserType
): Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> => {
  if (!userAuth) return undefined;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return userRef;
};

export const addTodo = async (
  todoContent: string,
  currentUser: UserType | null
): Promise<void> => {
  if (!currentUser) return;
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const id = new Date().getTime();
  await userRef.update({
    todos: {
      ...currentUser.todos,
      [id]: {
        done: false,
        todo: todoContent,
      },
    },
  });
};

export const deleteTodo = async (
  todoId: string,
  currentUser: UserType | null
): Promise<void> => {
  if (!currentUser) return;
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const { todos } = currentUser;
  if (todos) {
    delete todos[todoId];
  }
  await userRef.update({
    todos: {
      ...todos,
    },
  });
};

export const updateTodo = async (
  idOfTodoToUpdate: string,
  newTodoContent: TodoType,
  currentUser: UserType
): Promise<void> => {
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const { todos } = currentUser;
  await userRef.update({
    todos: {
      ...todos,
      [idOfTodoToUpdate]: newTodoContent,
    },
  });
};

export const changeCompletionStatus = async (
  todoId: string,
  currentUser: UserType | null
): Promise<void> => {
  if (!currentUser) return;
  if (
    window.confirm("Do you want to change the completion status of this task?")
  ) {
    if (currentUser.todos) {
      const todoToCheckOrUncheck = currentUser.todos[todoId];
      todoToCheckOrUncheck.done = !todoToCheckOrUncheck.done;
      await updateTodo(todoId, todoToCheckOrUncheck, currentUser);
    }
  }
};

export const signOut = async (): Promise<void> => {
  if (window.confirm("Do you want to sign out?")) {
    await auth.signOut();
    localStorage.removeItem("currentUser");
  }
};

export const deleteAccount = async (): Promise<void> => {
  if (window.confirm("Do you want to delete this account?")) {
    const { currentUser } = auth;
    if (currentUser) {
      currentUser
        .delete()
        .then(() => {
          localStorage.removeItem("currentUser");
        })
        .catch((e) => {
          alert(e);
        });
    }
  }
};

export default firebase;
