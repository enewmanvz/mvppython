import logo from '../logo.svg';
import '../App.css';


function Footer() {
  return (
      <nav className="App bg-dark">
        <footer className="App-footer">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
              <img src={logo} className="App-logo" alt="logo" />
          </a>
        </footer>
      </nav>
  )
}

export default Footer;