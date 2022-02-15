import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


export default function CustomPagination({ currentPage, totalPageNumber, handlePageClick }) {
    return (
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Pagination
          count={totalPageNumber}
          page={currentPage}
          onChange={handlePageClick}
        />
      </Stack>
    );
  }