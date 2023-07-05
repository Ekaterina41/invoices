import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

function InvoiceModal(props) {
    
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
    prevMonthDate.setMonth(currentDate.getMonth()-1);
    const defaultInvoicePeriod = prevMonthDate.toISOString().substring(0, 7);

    // Functions
    const handleCloseModal = () => {
        setSelectedInvoice(null);
        setNewInvoice({id: 0, number: 0, date: defaultInvoiceDate, period: defaultInvoicePeriod, quantity: 0, cost: 0});
        setShowModal(false);
    }

    const createInvoice = () => {
        const generatedId = invoices.length + 1;
        const invoiceWithId = { ...newInvoice, id: generatedId };
        setInvoices([...invoices, invoiceWithId]);
        setNewInvoice({id: 0, number: 0, date: defaultInvoiceDate, period: defaultInvoicePeriod, quantity: 0, cost: 0});
        setShowModal(false);
    };
    
    const updateInvoice = () => {
        const updatedInvoices = invoices.map((invoice) =>
          invoice.id === selectedInvoice.id ? selectedInvoice : invoice
        );
        setInvoices(updatedInvoices);
        setSelectedInvoice(null);
        setShowModal(false);
    };
    
    const deleteInvoice = () => {
        setInvoices(invoices.filter(i => i.id !== selectedInvoice.id));
        setSelectedInvoice(null);
        setShowModal(false);
    }

    const [newInvoice, setNewInvoice] = useState(
        {id: 0, number: 0, date: defaultInvoiceDate, period: defaultInvoicePeriod, quantity: 0, cost: 0}
    );
    
    return(
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
                <Col xs={3}>
                  <Form.Label>Number</Form.Label>
                  <Form.Control type="number" 
                    value={selectedInvoice ? selectedInvoice.number : newInvoice.number}
                    onChange={(e) => selectedInvoice 
                      ? setSelectedInvoice({...selectedInvoice, number: e.target.value}) 
                      : setNewInvoice({ ...newInvoice, number: e.target.value })}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" 
                    value={selectedInvoice ? selectedInvoice.date : newInvoice.date}
                    onChange={(e) => selectedInvoice 
                      ? setSelectedInvoice({...selectedInvoice, date: e.target.value}) 
                      : setNewInvoice({ ...newInvoice, date: e.target.value })}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col xs={4}>
                  <Form.Label>Period</Form.Label>
                  <Form.Control type="month" 
                    value={selectedInvoice ? selectedInvoice.period : newInvoice.period}
                    onChange={(e) => selectedInvoice 
                      ? setSelectedInvoice({...selectedInvoice, period: e.target.value}) 
                      : setNewInvoice({ ...newInvoice, period: e.target.value })}
                  />
                </Col>
                <Col xs={3}>
                  <Form.Label>Quantity, hours</Form.Label>
                  <Form.Control type="number" 
                    value={selectedInvoice ? selectedInvoice.quantity : newInvoice.quantity}
                    onChange={(e) => selectedInvoice 
                      ? setSelectedInvoice({...selectedInvoice, quantity: e.target.value}) 
                      : setNewInvoice({ ...newInvoice, quantity: e.target.value })}
                  />        
                </Col>
                <Col  xs={4}>
                  <Form.Label>Cost, $</Form.Label>
                  <Form.Control type="number" 
                    value={selectedInvoice ? selectedInvoice.cost : newInvoice.cost}
                    onChange={(e) => selectedInvoice 
                      ? setSelectedInvoice({...selectedInvoice, cost: e.target.value}) 
                      : setNewInvoice({ ...newInvoice, cost: e.target.value })}
                  />
                </Col>
              </Row>
            </Col>

            <Col className="border-start">
              <div className="d-grid gap-2">
                <Button variant="primary" className="mb-2"
                  onClick={selectedInvoice ? updateInvoice : createInvoice }>
                  Save
                </Button>
                <Button variant="primary" className="mb-2" disabled>
                  Generate PDF
                </Button>
                {selectedInvoice && // don't show for the new invoices
                <Button variant="danger" className="mb-2 mt-5"
                  onClick={deleteInvoice}>
                  Delete
                </Button>}
              </div>
            </Col>
          </Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default InvoiceModal;