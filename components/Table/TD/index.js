import cx from 'classnames'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { IoSaveOutline, IoTrashBinOutline } from 'react-icons/io5'

import Input from '../../Input'
import Button from '../../Button'

import { numberFormat } from '../../../helpers/format'

export const TD = (props) => {
  const { item, withBorderRight, handleAction } = props
  const [edit, setEdit] = useState(false)
  let label = item.value

  const openEdit = () => {
    if (item.editable) {
      setEdit(true)
    }
  }
  const closeEdit = () => {
    if (item.editable) {
      setEdit(false)
    }
  }
  const handleChange = (e) => {
    handleAction('cellEdit', {
      id: item.id,
      key: item.key,
      value: e.target.value,
    })
  }
  const handleActionClick = () => {
    handleAction('rowSave', { id: item.id })
  }
  const handleDeleteActionClick = () => {
    handleAction('rowDelete', { id: item.id })
  }

  if (item.type === 'price') {
    if (label) {
      label = `$${numberFormat(label)}`
    } else {
      label = ''
    }
  } else if (item.type === 'percentage') {
    if (label) {
      label = `${label}%`
    } else {
      label = ''
    }
  } else if (item.type === 'actions') {
    label = (
      <div className='flex flex-row'>
        <Button
          icon={<IoSaveOutline />}
          label='Update'
          onClick={handleActionClick}
          disabled={!item.changed}
        />
        <Button
          icon={<IoTrashBinOutline />}
          label='Delete'
          onClick={handleDeleteActionClick}
          className='ml-2'
        />
      </div>
    )
  }

  return (
    <td
      onClick={openEdit}
      className={cx('text-left px-2 py-1 overflow-hidden whitespace-nowrap overflow-ellipsis', {
        'border-r-2': withBorderRight,
        'cursor-pointer': item.editable,
      })}
    >
      {edit ? (
        <Input
          autoFocus
          type='text'
          defaultValue={item.value}
          handleChange={handleChange}
          handleClickOutside={closeEdit}
        />
      ) : label}
    </td>
  )
}

export default TD

TD.propTypes = {
  item: PropTypes.shape({}),
  handleAction: PropTypes.func,
  withBorderRight: PropTypes.bool,
}

TD.defaultProps = {
  item: {},
  handleAction: () => {
  },
  withBorderRight: false,
}
