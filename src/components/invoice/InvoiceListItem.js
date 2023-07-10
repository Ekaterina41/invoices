import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function InvoiceListItem(props) {
    return (
            <tr className='cursor-pointer' onClick={() => props.openModalForEdit(props.invoice)}>
                <td className='ps-5'>{props.invoice.number}</td>
                <td>{props.invoice.date}</td>
                <td>{props.invoice.period}</td>
                <td>{props.invoice.workdays}</td>
                <td>{props.invoice.ttp}.00 $</td>
            </tr>
    );
}

export default InvoiceListItem;