import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceList from './components/invoice/list/InvoiceList';
import InvoicePagination from './components/invoice/InvoicePagination';
import InvoiceSideMenu from './components/invoice/InvoiceSideMenu';
import InvoiceModal from './components/invoice/InvoiceModal';
import { Container, Button } from "react-bootstrap";
import { PlusLg, List } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const invoiceCRUDApiUrl = 'http://localhost:8080/invoice';
  const getAllInvoicesUrl = `${invoiceCRUDApiUrl}/all`

  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = () => {
    console.log("fetchInvoices is called");
    axios.get(getAllInvoicesUrl)
    .then((response) => {
      const invoicesFromServer = response.data;
      setInvoices(invoicesFromServer);
    })
    .catch(error => console.error(`Error retrievig invoices from server: ${error}`));
  }

  // Retrieve invoices from server when component is rendered
  useEffect(() => { 
    console.log("useEffect is running");
    fetchInvoices();
  }, []);

    //[
  //   {
  //     id: 14, 
  //     number: 14,
  //     date: '2023-07-03',
  //     period: '2023-06',
  //     vacations: 0,
  //     workdays: 22,
  //     total: 4048,
  //     vat: 0,
  //     ttp: 4048,
  //     invoiceEntries: [
  //       {
  //         id: 1,
  //         serviceName: "The services of software development from 01.06.2023 to 30.06.2023",
  //         quantity: 176,
  //         cost: 4048
  //       }
  //     ]
  //   }
  // ]);

  // Menu utils
  const [showMenu, setShowMenu] = useState(false);

  // Modal utils
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const openModalForEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const openModalForCreate = () => setShowModal(true);

  return (
    <Container fluid className='h-100'>

      {/* Left menu sidebar */}
      <Button variant="light" size="lg" onClick={() => setShowMenu(true)}
        className='p-3 mx-2 border border-1 rounded-circle shadow position-fixed'>
        <List size='30' className='text-black-50' />
      </Button>

      <InvoiceSideMenu showMenu={showMenu} setShowMenu={setShowMenu} />

      {/* Main Content */}
      <div className='w-75 mx-auto mt-3 border border-1 rounded-3 shadow' style={{ height: "95vh" }}>
        <header className='p-4 d-flex justify-content-between'>
          <h1>Invoices</h1>
          <Button variant="primary" onClick={openModalForCreate} className='mt-1 mb-1 ps-3 pe-4'>
            <PlusLg /> Create
          </Button>
        </header>

        <InvoiceList invoices={invoices} openModalForEdit={openModalForEdit}
          openModalForCreate={openModalForCreate} />

        <InvoicePagination />
      </div>

      <InvoiceModal invoices={invoices} setInvoices={setInvoices}
        selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice}
        showModal={showModal} setShowModal={setShowModal} />

    </Container>
  );
}

export default App;
