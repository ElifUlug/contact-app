// Database bilgi ekleme,bilgiyi alma, bilgi silme ve değiştirme
import firebase from "./firebase";
import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import Toastify from "./toast";

// Bilgi Ekleme
export const AddUser = (info) => {
  //db optional
  const db = getDatabase();
  const userRef = ref(db, "connect");
  const newUserRef = push(userRef);

  set(newUserRef, {
    username: info.username,
    phoneNumber: info.phoneNumber,
    gender: info.gender,
  });
};


export const useFetch = () => {
  const [isLoading, setIsLoading] = useState();
  const [contactList, setContactList] = useState();

  useEffect(() => {
    setIsLoading(true);

    const db = getDatabase();
    const userRef = ref(db, "connect");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const connectArray = [];

      for (let id in data) {
        connectArray.push({ id, ...data[id] });
      }
      setContactList(connectArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, contactList };
};

// Bilgi silme
export const DeleteUser = (id) => {
  const db = getDatabase();
  const userRef = ref(db, "connect");
  remove(ref(db, "connect/" + id));

  Toastify("User information deleted");
};


export const EditUser = (info) => {
  const db = getDatabase();
  const updates = {};

  updates["connect/" + info.id] = info;
  return update(ref(db), updates);
};
