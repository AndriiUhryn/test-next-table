import Head from 'next/head'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Table } from '../components/Table'
import { Header } from '../components/Header'

import { fetcher } from '../helpers/fetcher'
import TABLE_COLUMNS from '../constants/tableColumns'

export const Home = (props) => {
  const { data } = props
  const router = useRouter()
  const [editedItems, setEditedItems] = useState([])

  const refreshData = () => {
    router.replace(router.asPath)
  }
  const handleCellEdit = (item) => {
    const { value, key, id } = item
    const dataItem = data.find((el) => el.id === id)
    const editedItemIndex = editedItems.findIndex((el) => el.id === id)
    let newEditedItems = [...editedItems]

    if (~editedItemIndex) {
      newEditedItems[editedItemIndex] = {
        ...newEditedItems[editedItemIndex],
        [key]: value,
        changed: true,
      }
    } else {
      newEditedItems.push({
        ...dataItem,
        [key]: value,
        changed: true,
      })
    }

    setEditedItems(newEditedItems)
  }
  const handleRowAdd = async () => {
    try {
      await fetcher(
        `/api/investors`,
        {
          body: JSON.stringify({}),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      refreshData()
      toast.success('New investor was added successfully')
    } catch (error) {
      toast.error(error)
    }
  }
  const handleRowSave = async (item) => {
    const itemToSaveIndex = editedItems.findIndex((el) => el.id === item.id)

    if (~itemToSaveIndex) {
      const newEditedItems = [...editedItems]

      try {
        await fetcher(
          `/api/investors/${item.id}`,
          {
            body: JSON.stringify(newEditedItems[itemToSaveIndex]),
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        refreshData()

        newEditedItems.splice(itemToSaveIndex, 1)

        setEditedItems(newEditedItems)
        toast.success('Investor\'s data was saved successfully')
      } catch (error) {
        toast.error(error)
      }
    }
  }
  const handleRowDelete = async (item) => {
    try {
      if (item.id) {
        await fetcher(
          `/api/investors/${item.id}`,
          {
            method: 'DELETE',
          },
        )
      }

      refreshData()

      const itemToDeleteIndex = editedItems.findIndex((el) => el.id === item.id)

      if (~itemToDeleteIndex) {
        const newEditedItems = [...editedItems]

        newEditedItems.splice(itemToDeleteIndex, 1)

        setEditedItems(newEditedItems)
      }
      toast.success('Investor was deleted successfully')
    } catch (error) {
      toast.error(error)
    }
  }
  const handleAction = async (type, item) => {
    switch (type) {
      case 'cellEdit': {
        await handleCellEdit(item)
        break
      }
      case 'rowAdd': {
        await handleRowAdd(item)
        break
      }
      case 'rowSave': {
        await handleRowSave(item)
        break
      }
      case 'rowDelete': {
        await handleRowDelete(item)
        break
      }
      default: {
        break
      }
    }
  }

  const changedCollection = data.map((item) => {
    const el = editedItems.find((el) => el.id === item.id)

    if (el) {
      return el
    }

    return item
  })

  return (
    <div>
      <Head>
        <title>Investors</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='max-w-custom mx-auto p-6'>
        <Header
          price={50000}
          handleAction={handleAction}
        />
        <Table
          data={changedCollection}
          columns={TABLE_COLUMNS}
          handleAction={handleAction}
        />
      </main>
    </div>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
}

Home.defaultProps = {
  data: [],
}


export async function getServerSideProps() {
  const data = await fetcher('/api/investors', { method: 'GET' })

  return {
    props: {
      data,
    },
  }
}
