import useFetch from "./useFetch";
import { DB_URL } from "../../../apiConfig";

const useGetDbData = (endpoint) => {
  const { data, loading, error } = useFetch(`${DB_URL}/${endpoint}`);

  if (loading) return { data: null, loading: true, error: null };
  if (error) return { data: null, loading: false, error };

  return { data, loading: false, error: null };
};

export default useGetDbData;
