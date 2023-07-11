import { Offcanvas, Nav } from "react-bootstrap";

function InvoiceSideMenu(props) {
    
    const handleCloseMenu = () => props.setShowMenu(false);

    return(      
        <Offcanvas show={props.showMenu} onHide={handleCloseMenu} className='w-25'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className='flex-column'>
                <Nav.Item>
                    <Nav.Link disabled>Invoices</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <hr/>
                </Nav.Item> 
            </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default InvoiceSideMenu;