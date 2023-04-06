import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { entities: users, loading, error } = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  } 
  if (loading === 'failed'){
    return <div>{error}</div>;
  }
  return (
    <ul>
      {
        users.map(user => (
          <li key={user.login.uuid}>
            {user.name.first} {user.name.last}
          </li>
        ))
      }
    </ul>
  )
}

export default Users;