import InvoiceList from './components/InvoiceList';
import { Container, Pagination, Button } from "react-bootstrap";
import { PlusLg, List, CardList } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const invoices  = [
    { id: 7, number: 7, date: '2022-12-01', period: 'Nov 2022', quantity: 176, cost: 4048.00 },
    { id: 8, number: 8, date: '2022-12-23', period: 'Dec 2022', quantity: 176, cost: 4048.00 },
    { id: 9, number: 9, date: '2023-02-01', period: 'Jan 2023', quantity: 160, cost: 3680.00 },
    { id: 7, number: 7, date: '2022-12-01', period: 'Nov 2022', quantity: 176, cost: 4048.00 },
    { id: 8, number: 8, date: '2022-12-23', period: 'Dec 2022', quantity: 176, cost: 4048.00 },
    { id: 9, number: 9, date: '2023-02-01', period: 'Jan 2023', quantity: 160, cost: 3680.00 },
    { id: 7, number: 7, date: '2022-12-01', period: 'Nov 2022', quantity: 176, cost: 4048.00 },
    { id: 8, number: 8, date: '2022-12-23', period: 'Dec 2022', quantity: 176, cost: 4048.00 },
    { id: 10, number: 10, date: '2023-02-06', period: 'Feb 2023', quantity: 160, cost: 3680.00 }
  ];

  // Pagination items
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
    <Container fluid>

      {/* Left menu */}
      <Button variant="light" size="lg" className='p-3 mx-2 border border-1 
        rounded-circle shadow position-fixed'>
        <List size='30' className='text-black-50'/>
      </Button>

      {/* Main Content */}
      <div className='w-75 mx-auto mt-3 border border-1 rounded-3 shadow'>
        <header className='p-4 d-flex justify-content-between'>
          <h1>Invoices</h1>
          <Button variant="primary" className='mt-1 mb-1 ps-3 pe-4'>
            <PlusLg /> Create
          </Button>
        </header>

        <InvoiceList invoices={invoices} />

        <Pagination className='justify-content-center'>
          <Pagination.First />
          <Pagination.Ellipsis disabled />
          {paginationItems}
          <Pagination.Ellipsis disabled />
          <Pagination.Last />
        </Pagination>
      </div>


    </Container>
  );
}

export default App;
