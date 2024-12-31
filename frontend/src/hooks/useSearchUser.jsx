import { useState, useEffect } from 'react';
import UseApi from './UseApi';
import { ChatState } from '../Components/Context/ChatProvider';

const useSearchUser = (endpoint, initialSearch = '') => {
  const [search, setSearch] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = UseApi();
  const { user } = ChatState();

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await api.get(`${endpoint}?search=${search}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const handleHide = () => {
    setSearch('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (search.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return {
    search,
    setSearch,
    searchResults,
    loading,
    setLoading,
    handleHide
  };
};

export default useSearchUser;