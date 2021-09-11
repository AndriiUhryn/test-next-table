import { render } from '@testing-library/react'

import Component from './index'

describe('components/Header', () => {
  it('renders without crashing', () => {
    render(<Component />)
  })
})
