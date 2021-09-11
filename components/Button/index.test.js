import { render } from '@testing-library/react'

import Component from './index'

describe('components/Button', () => {
  it('renders without crashing', () => {
    render(<Component />)
  })
})
