import cx from 'classnames'
import PropTypes from 'prop-types'

export const TH = (props) => {
  const { item, withBorderRight } = props

  return (
    <th
      className={cx('w-1/5 text-left px-2 py-1 overflow-hidden whitespace-nowrap overflow-ellipsis', {
        'border-r-2': withBorderRight,
      })}
    >
      {item.label}
    </th>
  )
}

export default TH

TH.propTypes = {
  item: PropTypes.shape({}),
  withBorderRight: PropTypes.bool,
}

TH.defaultProps = {
  item: {},
  withBorderRight: false,
}
