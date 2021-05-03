import React from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import { useActions } from "../../../../actions";


/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as TodoActions from "../../../../actions/auth";
import { RootState } from '../../../../reducers';

import profilephoto from '../../assets/images/users/1.jpg';
const Header = () => {

    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        let a: any = document.getElementById('main-wrapper');
        a.classList.toggle('show-sidebar');
    }
    let history = useHistory();
    const todoActions = useActions(TodoActions);
    const auth = useSelector((state: RootState) => state.auth);
    const logout = () => {
        todoActions.logout(auth.userid);
    }
    return (
        <header className="topbar navbarbg" data-navbarbg="skin1">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/admin/dashboard">
                        {/* <b className="logo-icon">
                            <img src={logodarkicon} alt="homepage" className="dark-logo" />
                            <img
                                src={logolighticon}
                                alt="homepage"
                                className="light-logo"
                            />
                        </b> */}
                        <span className="logo-text logo-custom-txt">
                            {/* <img className="kd-logo" src="/web/img/kd-logo.jpg" alt=""></img> */}
                            {/* <img style={{ "height": "50px" }} src={cmlogo} alt="live chat for web" className="dark-logo" /> */}
                            Admin
                            {/* <img
                                src={logolighttext}
                                className="light-logo"
                                alt="homepage"
                            /> */}
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <a href="/" className="btn-link btn-bell d-block d-md-none">
                        <i className="ti-menu ti-home" />
                    </a>
                    <button className="btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="ti-menu ti-close" />
                    </button>
                </div>
                <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <Nav className="ml-auto float-right" navbar>
                        {/* <NavItem>
                            <a href="/" className="btn btn-danger mr-2" style={{ marginTop: '15px' }}>Home</a>
                        </NavItem> */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem href="javascript:void(0);" onClick={logout}>
                                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
export default Header;
