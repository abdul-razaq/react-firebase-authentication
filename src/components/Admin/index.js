/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { withFirebase } from '../Firebase';

const AdminPage = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    setLoading(true);

    firebase.users().on('value', snapshot => {
      setUsers(snapshot.val());
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default withFirebase(AdminPage);
