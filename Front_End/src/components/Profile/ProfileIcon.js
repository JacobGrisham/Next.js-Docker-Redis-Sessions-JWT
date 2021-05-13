import React, { useState, Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ProfileIcon = (props) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Fragment>
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
      caret
      style={{backgroundColor: 'transparent', borderColor:'transparent'}}>
        <img
        src="https://www.jacobgrisham.com/img/Tech%20Account%20Profile%20Photo%20medium.jpg"
        className="br-100 ba h3 w3 dib" alt="avatar"/>
      </DropdownToggle>
      <DropdownMenu
      right
      style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
        <DropdownItem onClick={props.toggleModal}>View Profile</DropdownItem>
        <DropdownItem onClick={() => props.onRouteChange('signout')}>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </Fragment>
  );
}

export default ProfileIcon;