import React, { useState } from 'react';
import InvoiceList from './components/invoice/InvoiceList';
import InvoicePagination from './components/InvoicePagination';
import InvoiceSideMenu from './components/InvoiceSideMenu';
import InvoiceModal from './components/InvoiceModal';
import { Container, Button } from "react-bootstrap";
import { PlusLg, List } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [invoices, setInvoices] = useState([
    // { id: 1, number: 1, date: '2022-12-01', period: '2022-11', quantity: 176, cost: 4048.00 },
    // { id: 2, number: 2, date: '2022-12-23', period: '2022-12', quantity: 176, cost: 4048.00 },
    // { id: 3, number: 3, date: '2023-02-01', period: '2023-01', quantity: 160, cost: 3680.00 }
  ]);

  // Menu utils
  const [showMenu, setShowMenu] = useState(false);

  // Modal utils
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  return (
    <Container fluid className='h-100'>

      {/* Left menu sidebar */}
      <Button variant="light" size="lg" onClick={() => setShowMenu(true)} 
        className='p-3 mx-2 border border-1 rounded-circle shadow position-fixed'>
        <List size='30' className='text-black-50'/>
      </Button>

      <InvoiceSideMenu showMenu={showMenu} setShowMenu={setShowMenu} />

      {/* Main Content */}
      <div className='w-75 mx-auto mt-3 border border-1 rounded-3 shadow' style={{height: "95vh"}}>
        <header className='p-4 d-flex justify-content-between'>
          <h1>Invoices</h1>
          <Button variant="primary" onClick={() => setShowModal(true)} className='mt-1 mb-1 ps-3 pe-4'>
            <PlusLg /> Create
          </Button>
        </header>

        <InvoiceList invoices={invoices} openModal={openModal} />

        <InvoicePagination/>
      </div>

      <InvoiceModal invoices={invoices} setInvoices={setInvoices} 
        selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} 
        showModal={showModal} setShowModal={setShowModal}/>

    </Container>
  );
}

export default App;
