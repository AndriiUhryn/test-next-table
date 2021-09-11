import PropTypes from 'prop-types'
import { IoAddCircleOutline } from 'react-icons/io5'

import Button from '../Button'

import { numberFormat } from '../../helpers/format'

export const Header = (props) => {
  const { price, handleAction } = props

  const handleAddNew = () => handleAction('rowAdd')

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row items-center'>
        <h1 className='text-4xl font-bold text-gray-700 mr-10'>
          Investors
        </h1>
        <div className='flex flex-col'>
          <div className='uppercase text-gray-700 font-semibold'>
            Confirmed
          </div>
          <div className='text-2xl text-green-600 font-bold'>
            ${numberFormat(price)}
          </div>
        </div>
      </div>
      <div>
        <Button
          icon={<IoAddCircleOutline />}
          label='Add new'
          onClick={handleAddNew}
        />
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  price: PropTypes.number,
  handleAction: PropTypes.func,
}

Header.defaultProps = {
  price: 0,
  handleAction: () => {
  },
}
