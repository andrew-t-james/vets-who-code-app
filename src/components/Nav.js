import React, { Component } from 'react'

import Link from 'gatsby-link'
import logo from '../images/flag.gif'

class Nav extends Component {
  state = {
    isNavOpen: false,
  }

  navRef = React.createRef()

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll === 0) {
      this.navRef.current.classList.remove('navbar-solid')
    }

    if (winScroll > 0) {
      this.navRef.current.classList.add('navbar-solid')
    }
  }

  setIsNavOpen = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    })
  }

  render() {
    const { isNavOpen } = this.state
    return (
      <nav
        ref={this.navRef}
        id="fixedTopNav"
        className="navbar navbar-fixed-top main-navigation"
        itemScope=""
        itemType="https://schema.org/SiteNavigationElement"
        role="navigation"
      >
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              onClick={this.setIsNavOpen}
              className="navbar-toggle collapsed"
              aria-expanded={isNavOpen ? 'true' : 'false'}
            >
              {' '}
              <span className="sr-only">#VetsWhoCode</span> <span className="ion-drag" />
            </button>
            <div className="navbar-brand" itemScope="" itemType="https://schema.org/Organization">
              {' '}
              <span className="sr-only">#VetsWhoCode</span>
              <Link to="/">
                <img src={logo} alt="#VetsWhoCode Logo" className="logo_holder" />
              </Link>
            </div>
          </div>
          <div
            className={`navbar-collapse collapse ${isNavOpen ? 'in' : ''}`}
            id="main-nav-collapse"
            aria-expanded={isNavOpen ? 'true' : 'false'}
          >
            <ul className="nav navbar-nav navbar-right" role="menu">
              <li>
                {' '}
                <Link to="/">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/about">
                  <span>About</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/syllabus">
                  <span>Syllabus</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/mentor">
                  <span>Mentor</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/apply">
                  <span>Apply</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/donate">
                  <span>Donate</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/contact">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/blog">
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
