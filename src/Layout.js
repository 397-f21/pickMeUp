import logo from './logo.svg';

const Layout = ({ children }) => (
  <div>
    <div className='navbar navbar-light bg-warning bg-light'>
      <div className='container-fluid'>
        <span className='navbar-brand justify-content-bottom'>
          <img src={ logo } alt="PickMeUp Logo" width="30" height="30" style={{marginTop: '-.4em', marginRight: '.2em'}}/>
          <span className="h2 fw-bold"> 
            PickMeUp 
          </span>
        </span>
      </div>
    </div>
    
    { children }

  </div>  
);

export default Layout;