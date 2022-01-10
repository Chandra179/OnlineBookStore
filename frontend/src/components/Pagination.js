import React, { useState } from "react";

function Pagination() {
    const todos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = todos.slice(indexOfFirstPage, indexOfLastPage);

    function handleClick(e) {
        setCurrentPage(Number(e.target.id))
    }

    const renderItems = currentItems.map((item, index) => {
        return <li key={index}>{item}</li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
            >
                {number}
            </li>
        );
    });

    return (
        <div>
            <ul>
                {renderItems}
            </ul>
            <ul id="page-numbers">
                {renderPageNumbers}
            </ul>
        </div>
    );
}

export default Pagination;