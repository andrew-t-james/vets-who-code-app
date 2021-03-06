import Link from 'next/link'
import Image from 'next/image'
import Typed from 'react-typed'

import codeImage from '../../images/code.jpg'

function Header() {
  return (
    <section className="site-header flexslider classic overlay main-overlay grey">
      <Image layout="fill" src={codeImage} style={{ height: '80vh' }} />
      <div className="header-classic wrapper-table">
        <div className="valign-center">
          <div className="container">
            <div className="col-md-10 col-md-offset-1">
              <div className="intro text-left" style={{ color: '#fff' }}>
                <h1>
                  <Typed
                    className="typedString"
                    strings={['Learn Javascript', 'Network', 'Get A Job']}
                    typeSpeed={70}
                    backSpeed={80}
                    smartBackspace
                    loop
                  />
                </h1>
                <p className="subtitle">With Vets Who Code.</p>
                <div className="btn-cal-group">
                  <Link href="/apply" className="btn btn-charity-default">
                    <a className="btn btn-charity-default" href="/apply">
                      Apply
                    </a>
                  </Link>
                  &nbsp;
                  <Link href="/donate" className="btn btn-charity-default">
                    <a className="btn btn-charity-default" href="/donate">
                      Donate
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
