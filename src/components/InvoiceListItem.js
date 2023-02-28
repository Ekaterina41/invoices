function InvoiceListItem(props) {
    return (
            <tr className="cursor-pointer">
                <td className='ps-5'>{props.invoice.number}</td>
                <td>{props.invoice.date}</td>
                <td>{props.invoice.period}</td>
                <td>{props.invoice.quantity} h</td>
                <td>{props.invoice.cost} $</td>
            </tr>
    );
}

export default InvoiceListItem;