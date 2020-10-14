import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';

export const useFirestore = () => {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const unsubscribe = db
      .collection('items')
      .orderBy('date')
      .onSnapshot((snap) => {
        let fetched = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        let budget = snap.docs.map((doc) => {
          return doc.data().amount;
        });

        setItems(fetched);
        setBudget(
          budget.length > 0 && budget.reduce((acc, curr) => acc + curr),
          0
        );
      });
    return unsubscribe;
  }, []);

  const addItem = async (item, amount) => {
    await db.collection('items').add({
      ...item,
      amount,
    });
  };

  const deleteItem = async (id) => {
    await db.collection('items').doc(id).delete();
  };

  return { items, addItem, budget, deleteItem };
};
