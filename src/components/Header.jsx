import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSession } from "../firebase/UserProvider";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useSession();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("login");
  };

  return (
    <Navbar>
      <Container>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/feature">
            <Nav.Link>Feature</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/pricing">
            <Nav.Link>Pricing</Nav.Link>
          </LinkContainer>

          {user && (
            <>
              <LinkContainer to={`profile/${user.uid}`}>
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
