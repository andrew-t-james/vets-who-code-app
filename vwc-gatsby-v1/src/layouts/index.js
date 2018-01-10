/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import Helmet from 'react-helmet';

import Nav from '../components/Nav';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/lib/bootstrap/dist/css/bootstrap.min.css';
import '../assets/lib/owlcarousel/owl-carousel/owl.carousel.css';
import '../assets/lib/owlcarousel/owl-carousel/owl.theme.css';
import '../assets/lib/ionicons/css/ionicons.css';
import '../assets/lib/fontawesome/css/font-awesome.min.css';
import '../assets/extras/swipebox/css/swipebox.min.css';
import '../assets/extras/rotating-carousel/css/style.css';
import '../assets/extras/slick/slick.css';
import '../assets/extras/magnificpopup/magnific-popup.css';
import '../assets/lib/FlexSlider/flexslider.css';
import '../assets/css/main.css';
import '../assets/css/custom.css';

const TemplateWrapper = ({ children }) => (
  <main>
    <Helmet
      title="#VetsWhoCode 🇺🇸 "
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <div className="main_container">
      <Loader />
      <Nav />
      <Header />
      {children()}

      <Footer />
    </div>
  </main>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;