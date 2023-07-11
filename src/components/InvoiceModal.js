import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import CreateInvoiceForm from './forms/invoice/CreateInvoiceForm';
import EditInvoiceForm from './forms/invoice/EditInvoiceForm';

function InvoiceModal(props) {

  const price = 23;

  // Input data
  const invoices = props.invoices;
  const setInvoices = props.setInvoices;
  const selectedInvoice = props.selectedInvoice;
  const setSelectedInvoice = props.setSelectedInvoice;
  const showModal = props.showModal;
  const setShowModal = props.setShowModal;

  // New invoice utils
  const currentDate = new Date();
  const defaultInvoiceDate = currentDate.toISOString().split('T')[0];

  const prevMonthDate = new Date(currentDate);
  prevMonthDate.setMonth(currentDate.getMonth() - 1);
  const defaultInvoicePeriod = prevMonthDate.toISOString().substring(0, 7);

  // Functions
  const countNewInvoice = () => {
    return {
      id: 0,
      number: 0,
      date: defaultInvoiceDate,
      period: defaultInvoicePeriod,
      vacations: 0,
      workdays: 22,
      total: 0,
      vat: 0,
      ttp: 0,
      invoiceEntries: [
        {
          id: 1,
          serviceName: "The services of software development from 01.06.2023 to 30.06.2023",
          quantity: 0,
          cost: 0
        }
      ]
    };
  }

  const handleCloseModal = () => {
    setSelectedInvoice(null);
    setNewInvoice(countNewInvoice());
    setShowModal(false);
  }

  const [newInvoice, setNewInvoice] = useState(countNewInvoice);

  return (
    <Modal id='invoice-modal' show={showModal} onHide={handleCloseModal} backdrop='static' keyboard={false}
      size='lg'>
      <Modal.Dialog id="invoice-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Invoice #{selectedInvoice ? selectedInvoice.number : newInvoice.number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            selectedInvoice
              ? <EditInvoiceForm invoices={invoices} setInvoices={setInvoices} handleCloseModal={handleCloseModal}
                selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} price={price} />
              : <CreateInvoiceForm invoices={invoices} setInvoices={setInvoices} handleCloseModal={handleCloseModal}
                newInvoice={newInvoice} setNewInvoice={setNewInvoice} price={price} />
          }
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}

export default InvoiceModal;