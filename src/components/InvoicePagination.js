import { Pagination } from "react-bootstrap";

function InvoicePagination(props) {
    let currentPage = 2;
    let numberOfPages = 8;
    let paginationItems = [];
    for (let number = 1; number <= numberOfPages; number++) {
      paginationItems.push(
        <Pagination.Item key={number} active={number === currentPage}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <Pagination className='justify-content-center fixed-bottom mb-4'>
        <Pagination.First />
        <Pagination.Ellipsis disabled />
        {paginationItems}
        <Pagination.Ellipsis disabled />
        <Pagination.Last />
      </Pagination>
    )
};

export default InvoicePagination;