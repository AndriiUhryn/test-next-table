import { toast } from 'react-toastify'

export const checkIfError = res => {
  if (!~[200, 201, 204, 0].indexOf(res.status)) {
    throw res
  }

  return res
}

export const parseResponse = res => {
  if (typeof res.json === 'function') {
    return res.json()
  } else {
    return res.text()
  }
}

export const handleError = (error) => {
  toast.error(error)
}

export const fetcher = (url, options) => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, options)
.then(checkIfError)
.then(parseResponse)
.catch(handleError)

export default fetcher
