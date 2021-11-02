import {signInWithGoogle, signOut, useUserState } from './firebase';
import logo from './logo.svg';

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
    <div className='navbar navbar-light bg-warning bg-light'>
      <div className='container-fluid'>
        <span className='navbar-brand justify-content-bottom'>
          <img src={ logo } alt="PickMeUp Logo" width="30" height="30" style={{marginTop: '-.4em', marginRight: '.2em'}}/>
          <span className="h2 fw-bold"> 
            PickMeUp 
          </span>
        </span>
        
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
    
    { children }

  </div>  
  );
};

export default Layout;