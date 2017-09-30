import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  layout(title, icon) {
    if (icon) {
      return <span className={title} aria-hidden="true" />;
    } else {
      return title;
    }
  }

  menuItem(title, link, id, icon = false) {
    return (
      <li className="nav-item" key={id}>
        <Link className="nav-link" to={link}>
          {this.layout(title, icon)}
        </Link>
      </li>
    );
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to signout
      return [
        this.menuItem('All books', '/allbooks', 1),
        this.menuItem('My books', '/mybooks', 2),
        this.menuItem('glyphicon glyphicon-cog', '/settings', 3, true),
        this.menuItem('glyphicon glyphicon-off', '/signout', 4, true)
      ];
    } else {
      return [
        this.menuItem('Sign In', '/signin', 1),
        this.menuItem('Sign Up', '/signup', 2)
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">
          BookTrade
        </Link>
        <ul className="nav navbar-nav navbar-right">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
