import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MovieProvider } from '../context/MovieContext'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MovieProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </MovieProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render } 