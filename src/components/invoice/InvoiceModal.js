import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import CreateInvoiceForm from './forms/CreateInvoiceForm';
import EditInvoiceForm from './forms/EditInvoiceForm';

function InvoiceModal(props) {

  const price = 23;

  // Input data
  const invoices = props.invoices;
  const setInvoices = props.setInvoices;
  const selectedInvoice = props.selectedInvoice;
  const setSelectedInvoice = props.setSelectedInvoice;
  const showModal = props.showModal;
  const setShowModal = props.setShowModal;

  // Functions
  const countNewInvoice = () => {
    const currentDate = new Date();
    const defaultInvoiceDate = currentDate.toISOString().split('T')[0];

    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(currentDate.getMonth() - 1);
    const defaultInvoicePeriod = prevMonthDate.toISOString().substring(0, 7);

    const defaultInvoiceNumber = invoices[invoices.length - 1]?.number + 1;

    return {
      id: 0,
      number: defaultInvoiceNumber,
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

  const onShowModal = () => {
    if (!selectedInvoice) {
      setNewInvoice(countNewInvoice);
    }
  }

  const handleCloseModal = () => {
    setSelectedInvoice(null);
    setShowModal(false);
  }

  const [newInvoice, setNewInvoice] = useState(countNewInvoice);

  return (
    <Modal id='invoice-modal' show={showModal} onShow={onShowModal} onHide={handleCloseModal} backdrop='static' keyboard={false}
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