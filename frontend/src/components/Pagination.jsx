import React from "react";

const Pagination = ({ page, setPage, nextPage, prevPage }) => {
  const handleClick = (direction) => {
    if (direction === "next") {
      setPage((currentPage) => {
        return nextPage === undefined ? currentPage : currentPage + 1;
      });
    }
    if (direction === "prev") {
      setPage((currentPage) => {
        return prevPage === undefined ? currentPage : currentPage - 1;
      });
    }
  };

  return (
    <div className="pagination">
      <i
        onClick={() => handleClick("prev")}
        className={`fa-solid fa-chevron-left ${prevPage ? "active" : ""}`}
      ></i>
      <div className="page">
        <p>{page}</p>
      </div>
      <i
        onClick={() => handleClick("next")}
        className={`fa-solid fa-chevron-right ${nextPage ? "active" : ""}`}
      ></i>
    </div>
  );
};

export default Pagination;
