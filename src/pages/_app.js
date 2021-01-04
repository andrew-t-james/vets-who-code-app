import 'react-toastify/dist/ReactToastify.css'
import '../assets/lib/bootstrap/dist/css/bootstrap.css'
import '../assets/lib/bootstrap/dist/css/bootstrap-theme.css'
import '../assets/css/main.css'
import '../assets/css/custom.css'

import { ToastContainer } from 'react-toastify'
import ThemeProvider from '../store/ThemeProvider'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <main className="main_container">
        <ToastContainer />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
