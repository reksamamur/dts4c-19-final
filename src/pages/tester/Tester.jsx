import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useState } from "react";

const Search = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  // console.log(user);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async () => {
    try {
      const data = {
        nama: "ini nama dari data admin",
        link: "ini link asda",
      };

      if (user) {
        const uid = user.uid;

        const userRef = doc(db, "users", uid);
        const bookmarkRef = collection(userRef, "bookmarks");

        await addDoc(bookmarkRef, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      if (user) {
        const uid = user.uid;

        const userColRef = collection(db, "users", uid, "bookmarks");
        const qSnap = await getDocs(userColRef);

        const newData = qSnap.docs.map((data) => {
          return { id: data.id, ...data.data() };
        });

        console.log(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLike = async () => {
    try {
      if (user) {
        const uid = user.uid;

        const data = {
          nama: "5 mantap",
          link: "5 mantap",
          likeby: uid,
        };

        const likeRef = collection(db, "likes");
        await addDoc(likeRef, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesbyUser = async () => {
    try {
      if (user) {
        const uid = user.uid;

        const likesColRef = collection(db, "likes");
        const qSnap = await getDocs(likesColRef);

        const newData = qSnap.docs.map((data) => {
          return { id: data.id, ...data.data() };
        });

        const byUser = newData.filter((obj) => {
          if (obj.likeby == uid) {
            return { obj };
          }
        });

        console.log(byUser);

        const count = byUser.reduce((accumulator, value) => {
          return {
            ...accumulator,
            [value.link]: (accumulator[value.link] || 0) + 1,
          };
        }, {});

        console.log(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesbyAll = async () => {
    try {
      if (user) {
        const likesColRef = collection(db, "likes");
        const qSnap = await getDocs(likesColRef);

        const newData = qSnap.docs.map((data) => {
            return { id: data.id, ...data.data() };
        });

        const count = newData.reduce((accumulator, value) => {
          return {
            ...accumulator,
            [value.link]: (accumulator[value.link] || 0) + 1,
          };
        }, {});

        console.log(count)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookmark = async () => {
    try {
      if (user) {
        const uid = user.uid;

        const deleteDocRef = doc(
          db,
          "users",
          uid,
          "bookmarks",
          "UXtQwqZZc0Y76lKOZx5X"
        );

        await deleteDoc(deleteDocRef)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        Tester,{" "}
        {user ? <button onClick={handleLogout}>Sign out</button> : <></>}
        <div>
          add data by user <button onClick={addData}>Add</button>
        </div>
        <div>
          get data by user <button onClick={getData}>Get</button>
        </div>
        <div>
          add Like <button onClick={addLike}>Add Like</button>
        </div>
        <div>
          get Vote by user{" "}
          <button onClick={getLikesbyUser}>Get Vote by user</button>
        </div>
        <div>
          get Vote by all{" "}
          <button onClick={getLikesbyAll}>Get Vote by all</button>
        </div>
        <div>
          remove bookmark
          <button onClick={removeBookmark}>Remove Bookmark</button>
        </div>
      </div>
    </>
  );
};

export default Search;
