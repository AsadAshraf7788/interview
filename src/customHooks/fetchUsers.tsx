import { useState, useEffect } from "react";

interface userFetchHookProps {
  page: number;
  resultsPerPage: number;
}
const useFetchUsers = ({ page, resultsPerPage }: userFetchHookProps) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}`
        );
        const data = await response.json();
        setUsers(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, resultsPerPage]);

  return { users, loading, error };
};

export default useFetchUsers;
