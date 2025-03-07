import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="row space-between">
          <div className="logo">
            <Link to="/">YASMEEN.</Link>
          </div>
          <div className="menu">MENU</div>
        </div>
      </div>
    </header>
  );
}

export default Header;