import PropTypes from 'prop-types'

import TH from './TH'
import TD from './TD'

export const Table = (props) => {
  const { data, columns, handleAction } = props

  const renderTH = (item, index) => {
    return (
      <TH
        key={item.id}
        item={item}
        withBorderRight={columns.length - 1 !== index}
      />
    )
  }
  const renderTD = (item, parentItem, index, parentIndex) => {
    return (
      <TD
        key={`td-${index}-${parentIndex}`}
        item={{
          id: parentItem.id,
          key: item.id,
          type: item.type,
          value: parentItem[item.id],
          changed: parentItem.changed,
          editable: item.editable,
        }}
        handleAction={handleAction}
        withBorderRight={columns.length - 1 !== index}
      />
    )
  }
  const renderTR = (item, parentIndex) => {
    return (
      <tr
        key={item.id}
        className='border-2'
      >
        {columns.map((el, index) => renderTD(el, item, index, parentIndex))}
      </tr>
    )
  }

  return (
    <table className='table-fixed w-full mt-10'>
      <thead>
      <tr className='border-2 text-gray-700 text-lg'>
        {columns.map(renderTH)}
      </tr>
      </thead>
      <tbody>
      {data.map(renderTR)}
      </tbody>
    </table>
  )
}

export default Table

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(PropTypes.shape({})),
}

Table.defaultProps = {
  data: [],
  columns: [],
}
