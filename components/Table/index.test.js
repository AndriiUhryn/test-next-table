import { render } from '@testing-library/react'

import Component from './index'

describe('components/Table', () => {
  it('renders without crashing', () => {
    render(<Component />)
  })
})
