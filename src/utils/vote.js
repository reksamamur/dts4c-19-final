import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const addVotes = async (user, item) => {
  try {
    const uid = user.uid;

    const data = {
      likeby: uid,
      item: item,
    };

    const voteRef = collection(db, "votes");

    await addDoc(voteRef, data);
  } catch (error) {
    console.log(error);
  }
};

const getVoted = async () => {
  try {
    const votedColRef = collection(db, "votes");
    const qSnap = await getDocs(votedColRef);

    const snapData = qSnap.docs.map((data) => {
      return { id: data.id, ...data.data() };
    });

      const sItems = snapData.map((obj) => obj.item);
      
      if (sItems.length < 1) return null;

    const groupData = sItems.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value.slug]: (accumulator[value.slug] || 0) + 1,
      };
    }, {});

    const reformGroup = Object.keys(groupData).map((key) => {
      return {
        slug: key,
        total: groupData[key],
      };
    });

    const max = reformGroup.reduce(function (prev, current) {
      return prev.total > current.total ? prev : current;
    });

    const findMaxed = sItems.find((item) => item.slug == max.slug);

    return findMaxed;
  } catch (error) {}
};

export { addVotes, getVoted };
