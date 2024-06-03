import { useState, useEffect } from "react";

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  };
};

export default usePagination;
