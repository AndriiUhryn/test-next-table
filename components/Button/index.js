import cx from 'classnames'
import PropTypes from 'prop-types'

export const Button = (props) => {
  const { label, icon, disabled, onClick, className } = props

  return (
    <button
      onClick={onClick}
      className={cx('text-sm text-white flex flex-row items-center px-2 py-1 rounded-2xl', className, {
        'bg-black cursor-pointer': !disabled,
        'bg-gray-500 cursor-not-allowed': disabled,
      })}>
      {label}
      {!!icon && (
        <div className='ml-2'>{icon}</div>
      )}
    </button>
  )
}

export default Button

Button.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  icon: '',
  label: '',
  onClick: () => {
  },
  disabled: false,
  className: '',
}
