import React, { useState } from 'react';
import InvoiceList from './components/InvoiceList';
import { Container, Pagination, Button, Offcanvas, Nav, Modal, Form, Row, Col } from "react-bootstrap";
import { PlusLg, List } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const invoices  = [
    { id: 1, number: 1, date: '2022-12-01', period: 'Nov 2022', quantity: 176, cost: 4048.00 },
    { id: 2, number: 2, date: '2022-12-23', period: 'Dec 2022', quantity: 176, cost: 4048.00 },
    { id: 3, number: 3, date: '2023-02-01', period: 'Jan 2023', quantity: 160, cost: 3680.00 },
    { id: 4, number: 4, date: '2022-12-01', period: 'Nov 2022', quantity: 176, cost: 4048.00 },
    { id: 5, number: 5, date: '2022-12-23', period: 'Dec 2022', quantity: 176, cost: 4048.00 },
    { id: 6, number: 6, date: '2023-02-01', period: 'Jan 2023', quantity: 160, cost: 3680.00 },
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

  // Menu utils
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  // Modal utils
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Form utils
  const currentDate = new Date();
  const defaultInvoiceDate = currentDate.toISOString().split('T')[0];
  
  const prevMonthDate = new Date(currentDate);
  prevMonthDate.setMonth(currentDate.getMonth()-1);
  const defaultInvoicePeriod = prevMonthDate.toISOString().substring(0, 7);

  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const handleNumInput = (e) => {
      setInvoiceNumber((oldVal) => e.target.value.length <= 5 ? e.target.value : oldVal)
  }

  return (
    <Container fluid>

      {/* Left menu sidebar */}
      <Button variant="light" size="lg" onClick={handleShowMenu} 
        className='p-3 mx-2 border border-1 rounded-circle shadow position-fixed'>
        <List size='30' className='text-black-50'/>
      </Button>

      <Offcanvas show={showMenu} onHide={handleCloseMenu} className='w-25'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className='flex-column'>
            <Nav.Item>
              <Nav.Link disabled>Invoices</Nav.Link>
            </Nav.Item> 
            <Nav.Item>
              <hr/>
            </Nav.Item> 
          </Nav>
          {/* <li class="border-top my-3"></li> */}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className='w-75 mx-auto mt-3 border border-1 rounded-3 shadow'>
        <header className='p-4 d-flex justify-content-between'>
          <h1>Invoices</h1>
          <Button variant="primary" onClick={handleShowModal} className='mt-1 mb-1 ps-3 pe-4'>
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop='static' keyboard={false}
        size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Invoice #</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formInvoiceNumber">
                <Form.Label>Invoice number</Form.Label>
                <Form.Control type="number" value={invoiceNumber} onChange={handleNumInput}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formInvoiceDate">
                <Form.Label>Document date</Form.Label>
                <Form.Control type="date" defaultValue={defaultInvoiceDate}/>
              </Form.Group>
            </Row>

            <Form.Group controlId="formInvoicePeriod" className="mb-3" >
              <Form.Label>Period</Form.Label>
              <Form.Control type="month" defaultValue={defaultInvoicePeriod}/>
            </Form.Group>
            <Form.Group controlId="formInvoiceQuantity" className="mb-3" >
              <Form.Label>Quantity, hours</Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
            <Form.Group controlId="formInvoiceCost" className="mb-3" >
              <Form.Label>Cost, $</Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default App;
