import React from "react";
import classnames from "classnames";
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, } from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand style={{ fontSize: "30px" }} data-placement="bottom" href="/" target="" title="© Copyrights 2020 ARTSY"><i className="fa fa-paint-brush fa-sm" /> ARTSY</NavbarBrand>
          <button aria-expanded={navbarCollapse} className={classnames("navbar-toggler navbar-toggler", { toggled: navbarCollapse, })} onClick={toggleNavbarCollapse}>
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>

        <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
          <Nav navbar>
            <NavItem>
              <NavLink target="" href="#home">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink target="" href="#about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink target="" href="#services">Services</NavLink>
            </NavItem>

            <NavItem>
              <NavLink target="" href="#signup">Sign Up</NavLink>
            </NavItem>

            <NavItem>
              <NavLink target="" href="#contact">Contact</NavLink>
            </NavItem>

            <NavItem>
              <NavLink data-placement="bottom" href="https://twitter.com/CreativeTim?ref=creativetim" target="_blank" title="Follow us on Twitter">
                <i className="fa fa-search" />
                <p className="d-lg-none">Search</p>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink data-placement="bottom" href="https://www.facebook.com/CreativeTim?ref=creativetim" target="_blank" title="Like us on Facebook">
                <i className="fa fa-facebook" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink data-placement="bottom" href="https://twitter.com/CreativeTim?ref=creativetim" target="_blank" title="Follow us on Twitter">
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
