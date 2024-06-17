import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={(event, value) => onPageChange(value)}
      color="primary"
      size="large"
    />
  );
};

export default Pagination;
