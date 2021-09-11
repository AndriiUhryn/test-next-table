import { useRef } from 'react'
import PropTypes from 'prop-types'

import useOnClickOutside from '../../helpers/clickOutside'

export const Input = (props) => {
  const {
    type,
    autoFocus,
    defaultValue,
    handleChange,
    handleClickOutside,
  } = props
  const containerRef = useRef()

  useOnClickOutside(containerRef, handleClickOutside)

  return (
    <input
      ref={containerRef}
      type={type}
      onChange={handleChange}
      autoFocus={autoFocus}
      className='border-2'
      defaultValue={defaultValue}
    />
  )
}

export default Input

Input.propTypes = {
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  autoFocus: false,
  defaultValue: '',
  handleChange: () => {
  },
}
