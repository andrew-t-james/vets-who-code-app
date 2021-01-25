import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSlack, FaGoogle, FaGithub } from 'react-icons/fa'
import { SiReplDotIt } from 'react-icons/si'
import { Contentful, Fem, Netlify } from '../../icons'

import google from '../../images/supporters/google.png'
import github from '../../images/supporters/github.png'
import replIt from '../../images/supporters/repl.it.png'
import slack from '../../images/supporters/slack.png'
import fem from '../../images/supporters/fem.png'
import contentful from '../../images/supporters/contentful.png'
import netlify from '../../images/supporters/netlify.png'

const baseSettlings = {
  autoplay: true,
  enableKeyboardControls: true,
  pauseOnHover: true,
  speed: 500,
  wrapAround: true,
  withoutControls: true,
}

const alignmentStyles = {
  position: 'relative',
  overflow: 'hidden',
  height: 60,
  width: 60,
  margin: '0px auto',
}

const elements = [
  {
    href: 'https://www.google.com/',
    label: 'Link to Google',
    title: 'Google',
    lightElement: google,
    darkElement: <FaGoogle size={60} color="#ffffff" />,
  },
  {
    href: 'https://github.com/',
    label: 'Link to Github',
    title: 'GitHub',
    lightElement: github,
    darkElement: <FaGithub size={60} color="#ffffff" />,
  },
  {
    href: 'https://repl.it',
    label: 'Link to Replit ',
    title: 'Repl.it',
    lightElement: replIt,
    darkElement: <SiReplDotIt size={60} color="#ffffff" />,
  },
  {
    href: 'https://slack.com/',
    label: 'Link to Slack',
    title: 'Slack',
    lightElement: slack,
    darkElement: <FaSlack size={60} color="#ffffff" />,
  },
  {
    href: 'https://frontendmasters.com/',
    label: 'Link to Front End Masters',
    title: 'Front End Masters',
    lightElement: fem,
    darkElement: <Fem size={`60`} color="#ffffff" />,
  },
  {
    href: 'https://www.contentful.com/',
    label: 'Link to Contentful',
    title: 'Contentful',
    lightElement: contentful,
    darkElement: <Contentful size={`60`} color="#091f40" />,
  },
  {
    href: 'https://www.netlify.com/',
    label: 'Link to Netlify',
    title: 'Netlify',
    lightElement: netlify,
    darkElement: <Netlify size={`60`} color="#ffffff" />,
  },
]

function SponsorSlider() {
  const { colorMode } = useContext(ThemeContext)

  const [viewport, setViewport] = useState(800)

  function updateWindowDimensions() {
    setViewport(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  const isMobile = Boolean(viewport < 800)

  const lightElements = () => {
    return elements.map(data => {
      return (
        <div key={data.title} style={{ textAlign: 'center' }}>
          <a
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={data.lightElement}
              //src={`/images/supporters/${data.lightElement}`}
              alt={data.title}
              style={alignmentStyles}
              height={alignmentStyles.height}
              width={alignmentStyles.width}
            />
          </a>
        </div>
      )
    })
  }

  const darkElements = () => {
    return elements.map(data => {
      return (
        <div key={data.title} style={{ textAlign: 'center' }}>
          <a
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.darkElement}
          </a>
        </div>
      )
    })
  }

  return (
    <Carousel
      {...baseSettlings}
      slidesToShow={isMobile ? 4 : 7}
      transitionMode={isMobile ? 'scroll' : 'fade'}
    >
      {colorMode === 'light' ? lightElements() : darkElements()}
    </Carousel>
  )
}

export default SponsorSlider
