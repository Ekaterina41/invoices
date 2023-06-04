import React, { useState } from 'react';
import InvoiceList from './components/InvoiceList';
import { Container, Pagination, Button, Offcanvas, Nav, Modal, Form, Row, Col } from "react-bootstrap";
import { PlusLg, List } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [invoices, setInvoices] = useState([
    { id: 1, number: 1, date: '2022-12-01', period: '2022-11', quantity: 176, cost: 4048.00 },
    { id: 2, number: 2, date: '2022-12-23', period: '2022-12', quantity: 176, cost: 4048.00 },
    { id: 3, number: 3, date: '2023-02-01', period: '2023-01', quantity: 160, cost: 3680.00 },
    { id: 4, number: 4, date: '2022-12-01', period: '2022-11', quantity: 176, cost: 4048.00 },
    { id: 5, number: 5, date: '2022-12-23', period: '2022-12', quantity: 176, cost: 4048.00 },
    { id: 6, number: 6, date: '2023-02-01', period: '2023-01', quantity: 160, cost: 3680.00 },
    { id: 7, number: 7, date: '2022-12-01', period: '2022-11', quantity: 176, cost: 4048.00 },
    { id: 8, number: 8, date: '2022-12-23', period: '2022-12', quantity: 176, cost: 4048.00 },
    { id: 10, number: 10, date: '2023-02-06', period: '2023-02', quantity: 160, cost: 3680.00 }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [newInvoice, setNewInvoice] = useState(
    {id: null, number: null, date: '', period: '', quantity: 0, cost: 0}
  );

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

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  // Form utils
  const currentDate = new Date();
  const defaultInvoiceDate = currentDate.toISOString().split('T')[0];
  
  const prevMonthDate = new Date(currentDate);
  prevMonthDate.setMonth(currentDate.getMonth()-1);
  const defaultInvoicePeriod = prevMonthDate.toISOString().substring(0, 7);

  // const [invoiceNumber, setInvoiceNumber] = useState(1);
  // const [invoiceQuantity, setInvoiceQuantity] = useState(0);
  // const [invoiceCost, setInvoiceCost] = useState(0.00);

  // TODO - add improved validation
  // function handleNumInput(maxLength, updateStateFunction) {
  //   return (event) => {
  //     updateStateFunction((oldVal) => 
  //       event.target.value.length <= maxLength ? event.target.value : oldVal)
  //   }
  // }

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

        <InvoiceList invoices={invoices} openModal={openModal} />

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
          <Modal.Title>Invoice #{selectedInvoice ? selectedInvoice.number : 0}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="ps-4">
          <Row>
            <Col sm={9}>
              <Row className="mb-3">
                {/* <Form.Group as={Col} controlId="formInvoiceNumber" className="mb-3"> */}
                <Col xs={3}>
                  <Form.Label>Number</Form.Label>
                  <Form.Control type="number" 
                    value={selectedInvoice ? selectedInvoice.number : 0}/>
                </Col>
                {/* </Form.Group> */}
                {/* <Form.Group as={Col} controlId="formInvoiceDate" className="mb-3"> */}
                <Col xs={4}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" 
                    value={selectedInvoice ? selectedInvoice.date : defaultInvoiceDate}/>
                </Col>
                {/* </Form.Group> */}
              </Row>
              <Row className="mb-4">
                <Col xs={4}>
                  <Form.Label>Period</Form.Label>
                  <Form.Control type="month" 
                    value={selectedInvoice ? selectedInvoice.period : defaultInvoicePeriod}/>
                </Col>
                <Col xs={3}>
                  <Form.Label>Quantity, hours</Form.Label>
                  <Form.Control type="number" value={selectedInvoice ? selectedInvoice.quantity : 0}/>        
                </Col>
                <Col  xs={4}>
                  <Form.Label>Cost, $</Form.Label>
                  <Form.Control type="number"value={selectedInvoice ? selectedInvoice.cost : 0}/>
                </Col>
              </Row>
            </Col>

            <Col className="border-start">
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="mb-2">
                  Save
                </Button>
                <Button variant="primary" className="mb-2" disabled>
                  Generate PDF
                </Button>
              </div>
            </Col>
          </Row>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default App;
