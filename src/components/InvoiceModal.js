import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup, Accordion } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

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

  const createInvoice = () => {
    const generatedId = invoices.length + 1;
    const invoiceWithId = { ...newInvoice, id: generatedId };
    setInvoices([...invoices, invoiceWithId]);
    setNewInvoice(countNewInvoice());
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

  // TODO update structure otherwise page fails to load
  const [newInvoice, setNewInvoice] = useState(countNewInvoice);

  return (
    <Modal id='invoice-modal' show={showModal} onHide={handleCloseModal} backdrop='static' keyboard={false}
      size='lg'>
      <Modal.Dialog id="invoice-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Invoice #{selectedInvoice ? selectedInvoice.number : newInvoice.number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="ps-1">
            <Row>
              <Col sm={9}>
                <Row className="mb-3">
                  <Col xs={2}>
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="number"
                      value={selectedInvoice ? selectedInvoice.number : newInvoice.number}
                      onChange={(e) => selectedInvoice
                        ? setSelectedInvoice({ ...selectedInvoice, number: e.target.value })
                        : setNewInvoice({ ...newInvoice, number: e.target.value })}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"
                      value={selectedInvoice ? selectedInvoice.date : newInvoice.date}
                      onChange={(e) => selectedInvoice
                        ? setSelectedInvoice({ ...selectedInvoice, date: e.target.value })
                        : setNewInvoice({ ...newInvoice, date: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4}>
                    <Form.Label>Reporting period</Form.Label>
                    <Form.Control type="month"
                      value={selectedInvoice ? selectedInvoice.period : newInvoice.period}
                      onChange={(e) => selectedInvoice
                        ? setSelectedInvoice({ ...selectedInvoice, period: e.target.value })
                        : setNewInvoice({ ...newInvoice, period: e.target.value })}
                    />
                  </Col>
                  <Col xs={{ span: 3, offset: 2 }}>
                    <Form.Label>Vacations/holidays</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" aria-describedby="days-suffix-vacation"
                        value={selectedInvoice ? selectedInvoice.vacations : newInvoice.vacations}
                        onChange={(e) => selectedInvoice
                          ? setSelectedInvoice({ ...selectedInvoice, vacations: e.target.value })
                          : setNewInvoice({ ...newInvoice, pevacationsriod: e.target.value })}
                      />
                      <InputGroup.Text id="days-suffix-vacation">days</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col xs={3}>
                    <Form.Label>Days worked</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" aria-describedby="days-suffix-workdays" disabled
                        value={selectedInvoice ? selectedInvoice.workdays : newInvoice.workdays}
                      />
                      <InputGroup.Text id="days-suffix-workdays">days</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <p className="h5 text-primary m-3">Invoice entries</p>
                  {/* TODO button to add new entry */}
                </Row>
                <Row className="mb-3">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        {selectedInvoice
                          ? selectedInvoice.invoiceEntries[0].serviceName
                          : newInvoice?.invoiceEntries[0].serviceName}
                        {/* TODO need delete button to each entry */}
                      </Accordion.Header>
                      <Accordion.Body className='ps-2 pe-2'>
                        <Row className="mb-3">
                          <Form.Label>Service name</Form.Label>
                          <InputGroup>
                            <Form.Control id="" type="text" disabled
                              aria-label="Edit service name"
                              aria-describedby="edit-servicename-btn"
                              value={selectedInvoice
                                ? selectedInvoice.invoiceEntries[0].serviceName
                                : newInvoice.invoiceEntries[0].serviceName}
                            />
                            {/* TODO should enable/disable servicename input, implement when multiple entries are done
                            using the local state of the entry */}
                            <Button id="edit-servicename-btn" disabled>
                              <PencilSquare />
                            </Button>
                          </InputGroup>
                        </Row>
                        <Row>
                          <Col xs={4}>
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                              <Form.Control type="number" value={price} disabled
                                aria-describedby="currency-price"
                              />
                              <InputGroup.Text id="currency-price">.00 $</InputGroup.Text>
                            </InputGroup>
                          </Col>
                          <Col xs={4}>
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                              <Form.Control type="number" aria-describedby="hours-quantity"
                                value={selectedInvoice
                                  ? selectedInvoice.invoiceEntries[0].quantity
                                  : newInvoice.invoiceEntries[0].quantity}
                              />
                              <InputGroup.Text id="hours-quantity">hours</InputGroup.Text>
                            </InputGroup>
                          </Col>
                          <Col xs={4}>
                            <Form.Label>Cost</Form.Label>
                            <InputGroup>
                              <Form.Control type="number" aria-describedby="currency-cost"
                                value={selectedInvoice
                                  ? selectedInvoice.invoiceEntries[0].cost
                                  : newInvoice.invoiceEntries[0].cost}
                              />
                              <InputGroup.Text id="currency-cost">.00 $</InputGroup.Text>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
                <Row className="mb-5">
                  <Col xs={4}>
                    <Form.Label>Total</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" aria-describedby="currency-total"
                        value={selectedInvoice ? selectedInvoice.total : newInvoice.total}
                      />
                      <InputGroup.Text id="currency-total">.00 $</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col xs={3}>
                    <Form.Label>VAT</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" aria-describedby="percent-vat" disabled
                        value={selectedInvoice ? selectedInvoice.vat : newInvoice.vat}
                      />
                      <InputGroup.Text id="percent-vat">%</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col xs={{ span: 4, offset: 1 }}>
                    <Form.Label>Total to pay</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" aria-describedby="currency-ttp"
                        value={selectedInvoice ? selectedInvoice.ttp : newInvoice.ttp}
                      />
                      <InputGroup.Text id="currency-ttp">.00 $</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Col>

              <Col className="border-start">
                <div className="d-grid gap-2">
                  <Button variant="primary" className="mb-2"
                    onClick={selectedInvoice ? updateInvoice : createInvoice}>
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
      </Modal.Dialog>
    </Modal>
  );
}

export default InvoiceModal;