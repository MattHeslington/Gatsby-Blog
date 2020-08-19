import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Header extends React.Component {

    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen:false,
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (

            <Navbar fixed="top" light expand="sm">
                <div className="container">
                    <NavbarBrand><Link to="/">{this.props.siteTitle}</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink><Link to="/team">Team</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to="/tags">Tags</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to="/about">About</Link></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>

        )
    }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
