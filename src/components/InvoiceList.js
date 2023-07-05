import InvoiceListItem from "./InvoiceListItem";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

function InvoiceList(props) {
    return (
                <Table striped hover responsive='md'>
                <thead className='table-primary'>
                    <tr>
                        <th className='ps-5'>№</th>
                        <th>Date</th>
                        <th>Period</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.invoices.map((invoice) => (
                        <InvoiceListItem key={invoice.id} 
                            invoice={invoice} 
                            openModal={props.openModal}/>
                    ))
                }
                </tbody>
                </Table>
    );
}

export default InvoiceList;