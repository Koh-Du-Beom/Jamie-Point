import { useState, useEffect } from "react";
import axios from "axios";

const useGetDataFromBE = (pageType: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/zs/${pageType}`);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageType]);

  return { data, loading };
};

export default useGetDataFromBE;
