/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { withFirebase } from '../Firebase';

const AdminPage = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });

    return () => {
      // remove the listener to fetch all users above to avoid memory leaks
      firebase.users().off();
    };
  }, []);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default withFirebase(AdminPage);
