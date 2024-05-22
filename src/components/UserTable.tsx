import React, { useState } from "react";
import useFetchUsers from "../customHooks/fetchUsers";

const UserTable = () => {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10; // Number of users to fetch per page
  const { users, loading, error } = useFetchUsers({ page, resultsPerPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.login.uuid}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{`${user.name.first} ${user.name.last}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
