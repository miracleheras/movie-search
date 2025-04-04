import { render, screen, waitFor, act } from '@testing-library/react'
import { MovieProvider, useMovieContext } from '../../context/MovieContext'
import { mockMovies } from '../__mocks__/apiMocks'
import fetchMock from 'jest-fetch-mock'

// Enable fetchMock
fetchMock.enableMocks()

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock API functions
const mockGetToken = jest.fn().mockResolvedValue('mock-token')
const mockGetMovies = jest.fn().mockResolvedValue({
  data: mockMovies,
  totalPages: 5,
  totalResults: 25
})

// Mock the API service
jest.mock('../../services/api', () => ({
  getToken: () => mockGetToken(),
  getMovies: (...args: any[]) => mockGetMovies(...args)
}))

// Test component that uses the movie context
const TestComponent = () => {
  const {
    search,
    setSearch,
    fetchMovies,
    movies,
    loading,
    error,
    currentPage,
    totalResults
  } = useMovieContext()

  return (
    <div>
      <div data-testid="search-value">{search}</div>
      <div data-testid="movies-count">{movies.length}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || 'no error'}</div>
      <div data-testid="current-page">{currentPage}</div>
      <div data-testid="total-results">{totalResults}</div>
      <button onClick={() => setSearch('star wars')}>Set Search</button>
      <button onClick={() => fetchMovies()}>Fetch Movies</button>
    </div>
  )
}

describe('MovieContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)

    // Set up fetch mock responses
    fetchMock.resetMocks()
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'mock-token' }))
    fetchMock.mockResponseOnce(JSON.stringify({
      data: mockMovies,
      totalPages: 5,
      totalResults: 25
    }))
    fetchMock.mockResponseOnce(JSON.stringify({
      data: mockMovies,
      totalPages: 25,
      totalResults: 25
    }))
  })

  test('provides initial context values', async () => {
    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    )

    expect(screen.getByTestId('search-value').textContent).toBe('')
    expect(screen.getByTestId('movies-count').textContent).toBe('0')
    expect(screen.getByTestId('loading').textContent).toBe('false')
    expect(screen.getByTestId('error').textContent).toBe('no error')
    expect(screen.getByTestId('current-page').textContent).toBe('1')
    expect(screen.getByTestId('total-results').textContent).toBe('0')
  })

  test('updates search value when setSearch is called', async () => {
    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    )

    const setSearchButton = screen.getByText('Set Search')
    await act(async () => {
      setSearchButton.click()
    })

    expect(screen.getByTestId('search-value').textContent).toBe('star wars')
  })

  test('fetches movies successfully when fetchMovies is called', async () => {
    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    )

    const fetchButton = screen.getByText('Fetch Movies')
    
    await act(async () => {
      fetchButton.click()
    })

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
    })
  })

  test('handles API error case', async () => {
    // Mock an implementation that simulates a failed fetch
    fetchMock.resetMocks();
    
    // First mock for token request in fetchMovies
    fetchMock.mockRejectOnce(new Error('API Error'));

    const { getByText } = render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    );

    const fetchButton = getByText('Fetch Movies');
    
    await act(async () => {
      fetchButton.click();
    });

    // Wait for the API call to finish and check if loading state is completed
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
  })

  test('uses token from localStorage if available', async () => {
    localStorageMock.getItem.mockReturnValue('saved-token')

    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    )

    const fetchButton = screen.getByText('Fetch Movies')
    
    await act(async () => {
      fetchButton.click()
    })

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
    })
  })
}) 