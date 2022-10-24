import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const addBookmark = async (user, item) => {
  try {
    const uid = user.uid;

    const userRef = doc(db, "users", uid);
    const bookmarkRef = collection(userRef, "bookmarks");

    await addDoc(bookmarkRef, item);
  } catch (error) {
    console.log(error);
  }
};

const checkBookmark = async (user, slug) => {
  try {
    const uid = user.uid;
    const userColRef = collection(db, "users", uid, "bookmarks");
    const qSnap = await getDocs(userColRef);
    const dataBookmark = qSnap.docs.map((data) => {
      return { id: data.id, ...data.data() };
    });

    const check = dataBookmark.find((item) => item.slug == slug);

    if (!check) return { found: false, data: null };

    return { found: true, data: check };
  } catch (error) {
    console.log(error);
  }
};

const removeBookmark = async (user, docid) => {
  try {
    const uid = user.uid;
    const deleteDocRef = doc(db, "users", uid, "bookmarks", docid);

    await deleteDoc(deleteDocRef);
  } catch (error) {
    console.log(error);
  }
};

const getBookmarkbyUser = async (user) => {
  try {
    const uid = user.uid;
    const userColRef = collection(db, "users", uid, "bookmarks");
    const qSnap = await getDocs(userColRef);

    const dataBookmark = qSnap.docs.map((data) => {
      return { id: data.id, ...data.data() };
    });

    return dataBookmark;
  } catch (error) {
    console.log(error);
  }
};

export { addBookmark, checkBookmark, removeBookmark, getBookmarkbyUser };
