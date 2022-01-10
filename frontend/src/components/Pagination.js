import React, { useState } from "react";

function usePagination(itemLength, items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(itemLength / itemsPerPage);

  function currentData() {
    // const begin = (currentPage - 1) * itemsPerPage;
    // const end = begin + itemsPerPage;
    // return items.slice(begin, end);
    return items;
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
