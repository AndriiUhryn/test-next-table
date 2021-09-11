import { ToastContainer } from 'react-toastify'

import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
