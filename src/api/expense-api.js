import firestore from '@react-native-firebase/firestore';

export const addNewExpense = async (userId, doc) => {
  try {
    const newExpense = await firestore()
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .doc();
    newExpense.set({ id: newExpense.id, ...doc });
    return { id: newExpense.id, ...doc };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const getUserData = async userId => {
  try {
    const userData = await firestore()
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .get()
      .then(doc => doc?.docs.map(doc => doc?.data()));
    return { userId, data: userData };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const editExpense = async (userId, docId, doc) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .doc(docId)
      .set({ id: docId, ...doc });
    return { id: docId, ...doc };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const removeExpense = async (userId, docId) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .doc(docId)
      .delete();
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
