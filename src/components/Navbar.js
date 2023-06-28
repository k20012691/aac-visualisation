import React from 'react';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { HiOutlineMail } from 'react-icons/hi';

function Nav() {
  return (
    <Navbar style={{ padding: '0.25rem', margin: '0', backgroundColor: '#EEEEEE' }}>
      <NavbarBrand href="/" style={{ marginLeft: 'auto' }}>
        <Button style={{ fontFamily: 'Work Sans', fontWeight: '500', backgroundColor: '#656BFF', border: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <HiOutlineMail />
            Contact Us
          </div>
        </Button>
      </NavbarBrand>
    </Navbar>
  );
}

export default Nav;
