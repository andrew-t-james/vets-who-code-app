import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Toggle from '../Toggle'

function Nav() {
  const navRef = useRef()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [opacity, setOpacity] = useState(0.9)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  function handleScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll === 0) {
      setOpacity(0.9)
    }
    if (winScroll > 0) {
      setOpacity(1)
    }
  }

  function handleClickOutside(event) {
    if (!navRef?.current?.contains(event.target)) {
      setIsNavOpen(false)
    }
  }

  return (
    <nav
      ref={navRef}
      id="fixedTopNav"
      className="navbar navbar-fixed-top main-navigation navbar-solid"
      itemScope=""
      itemType="https://schema.org/SiteNavigationElement"
      role="navigation"
      style={{ opacity: opacity }}
    >
      <div className="container-fluid">
        <div className="navbar-header">
          <div
            className="navbar-brand"
            style={{ padding: '5px 15px 5px' }}
            itemScope=""
            itemType="https://schema.org/Organization"
          >
            <span className="sr-only">#VetsWhoCode</span>
            <Link href="/">
              <a id="navbar-brand">
                <Image
                  src="/images/hashflag_white.jpg"
                  alt="#VetsWhoCode Logo"
                  className="logo_holder"
                  height={40}
                  width={40}
                />
                <div className="homeLink">VetsWhoCode</div>
              </a>
            </Link>
          </div>
          <button
            type="button"
            id="hamburger-1"
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`navbar-toggle collapsed hamburger ${isNavOpen ? 'is-active' : ''}`}
            aria-expanded={isNavOpen ? 'true' : 'false'}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="sr-only">#VetsWhoCode</span>
          </button>
        </div>
        <div
          className={`navbar-collapse collapse ${isNavOpen ? 'in' : ''}`}
          id="main-nav-collapse"
          aria-expanded={isNavOpen ? 'true' : 'false'}
        >
          <ul
            className="nav navbar-nav navbar-right"
            role="menu"
            id="navbar-list"
            onClick={() => setIsNavOpen(false)}
          >
            <li role="menuitem" className="nav">
              <a>
                <span>
                  <Toggle size={30} />
                </span>
              </a>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/">
                <a>
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/about">
                <a>
                  <span>About</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/board">
                <a>
                  <span>Board</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/testimonials">
                <a>
                  <span>Testimonials</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/syllabus">
                <a>
                  <span>Syllabus</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/mentor">
                <a>
                  <span>Mentor</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/apply">
                <a>
                  <span>Apply</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/contact">
                <a>
                  <span>Contact</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav">
              <Link href="/blog/1">
                <a>
                  <span>Blog</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link href="/donate">
                <a>
                  <span>Donate</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
