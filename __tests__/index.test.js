import { render } from '@testing-library/react'

import Home from '../pages/index'

describe('pages/index.js', () => {
  it('renders without crashing', () => {
    render(<Home />)
  })
})
