import {signInWithGoogle, signOut, useUserState } from './firebase';
import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
)

const Layout = ({ children }) => {
  const [user] = useUserState();
  return (
    <div>
    <Navbar expand="sm" collapseOnSelect>
      <div className='container-fluid'>
        <Navbar.Brand href="/">
          <img src={ logo } alt="PickMeUp Logo" width="30" height="30" style={{marginTop: '-.4em', marginRight: '.2em'}}/>
          <span className="h2 fw-bold"> 
            PickMeUp 
          </span>
        </Navbar.Brand>

        <Navbar.Toggle/>

        <Navbar.Collapse className="justify-content-between text-center" id="navbarNavAltMarkup">
          <Nav>
            <Nav.Link className="nav-link" href="/" active={false}>Home</Nav.Link>
            <Nav.Link className="nav-link" href="/PersonalEvents" active={false}>My Events</Nav.Link>
          </Nav>
          {user ? <SignOutButton /> : <SignInButton />}
         </Navbar.Collapse>
      </div>
    
    </Navbar>  
    { children }
  </div>
  );
};

export default Layout;