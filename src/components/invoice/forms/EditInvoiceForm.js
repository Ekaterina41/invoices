import React from 'react';
import { Button, Form, Row, Col, InputGroup, Accordion } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

function EditInvoiceForm(props) {

    // Input data
    const invoices = props.invoices;
    const setInvoices = props.setInvoices;
    const handleCloseModal = props.handleCloseModal;
    const selectedInvoice = props.selectedInvoice;
    const setSelectedInvoice = props.setSelectedInvoice;
    const price = props.price; // todo to const

    // Functions
    const updateInvoice = () => {
        const updatedInvoices = invoices.map((invoice) =>
          invoice.id === selectedInvoice.id ? selectedInvoice : invoice
        );
        setInvoices(updatedInvoices);
        setSelectedInvoice(null);
        handleCloseModal();
      };
    
      const deleteInvoice = () => {
        setInvoices(invoices.filter(i => i.id !== selectedInvoice.id));
        setSelectedInvoice(null);
        handleCloseModal();
      }

    return (
        <Form className="ps-1">
            <Row>
                <Col sm={9}>
                    <Row className="mb-3">
                        <Col xs={2}>
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="number"
                                value={selectedInvoice.number}
                                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, number: e.target.value })}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"
                                value={selectedInvoice.date}
                                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, date: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <Form.Label>Period</Form.Label>
                            <Form.Control type="month"
                                value={selectedInvoice.period}
                                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, period: e.target.value })}
                            />
                        </Col>
                        <Col xs={{ span: 3, offset: 2 }}>
                            <Form.Label>Vacations/holidays</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" aria-describedby="days-suffix-vacation"
                                    value={selectedInvoice.vacations}
                                    onChange={(e) => setSelectedInvoice({ ...selectedInvoice, vacations: e.target.value })}
                                />
                                <InputGroup.Text id="days-suffix-vacation">days</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Days worked</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" aria-describedby="days-suffix-workdays" disabled
                                    value={selectedInvoice.workdays}
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
                                    {selectedInvoice.invoiceEntries[0].serviceName}
                                    {/* TODO need delete button to each entry */}
                                </Accordion.Header>
                                <Accordion.Body className='ps-2 pe-2'>
                                    <Row className="mb-3">
                                        <Form.Label>Service name</Form.Label>
                                        <InputGroup>
                                            <Form.Control id="" type="text" disabled
                                                aria-label="Edit service name"
                                                aria-describedby="edit-servicename-btn"
                                                value={selectedInvoice.invoiceEntries[0].serviceName}
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
                                                <Form.Control type="number" aria-describedby="hours-quantity" disabled
                                                    value={selectedInvoice.invoiceEntries[0].quantity}
                                                />
                                                <InputGroup.Text id="hours-quantity">hours</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col xs={4}>
                                            <Form.Label>Cost</Form.Label>
                                            <InputGroup>
                                                <Form.Control type="number" aria-describedby="currency-cost" disabled
                                                    value={selectedInvoice.invoiceEntries[0].cost}
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
                                <Form.Control type="number" aria-describedby="currency-total" disabled
                                    value={selectedInvoice.total}
                                />
                                <InputGroup.Text id="currency-total">.00 $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={3}>
                            <Form.Label>VAT</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" aria-describedby="percent-vat" disabled
                                    value={selectedInvoice.vat}
                                />
                                <InputGroup.Text id="percent-vat">%</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={{ span: 4, offset: 1 }}>
                            <Form.Label>Total to pay</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" aria-describedby="currency-ttp" disabled
                                    value={selectedInvoice.ttp}
                                />
                                <InputGroup.Text id="currency-ttp">.00 $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>

                <Col className="border-start">
                    <div className="d-grid gap-2">
                        <Button variant="primary" className="mb-2"
                            onClick={updateInvoice}>
                            Save
                        </Button>
                        <Button variant="primary" className="mb-2" disabled>
                            Generate PDF
                        </Button>
                        <Button variant="danger" className="mb-2 mt-5"
                            onClick={deleteInvoice}>
                            Delete
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

export default EditInvoiceForm;