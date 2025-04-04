import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../test-utils'
import { MoviesList } from '../../components/moviesList'
import { mockMovies } from '../__mocks__/apiMocks'
import { useMovieContext } from '../../context/MovieContext'

// Mock the movie context
jest.mock('../../context/MovieContext', () => {
  const original = jest.requireActual('../../context/MovieContext')
  return {
    ...original,
    useMovieContext: jest.fn()
  }
})

// Mock useNavigate for testing navigation
const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

describe('MoviesList Component', () => {
  const mockSetCurrentPage = jest.fn()
  const mockFetchMovies = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useMovieContext as jest.Mock).mockReturnValue({
      movies: mockMovies,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 3,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })
  })

  test('renders MoviesList with movie items', async () => {
    render(<MoviesList />)
    
    expect(screen.getByText('Mock Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Mock Movie 2')).toBeInTheDocument()
  })

  test('displays loading state', () => {
    (useMovieContext as jest.Mock).mockReturnValue({
      movies: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })

    render(<MoviesList />)
    
    // Check for the loading spinner using class-based selector
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  test('displays error message when there is an error', () => {
    (useMovieContext as jest.Mock).mockReturnValue({
      movies: [],
      loading: false,
      error: 'Failed to load movies',
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })

    render(<MoviesList />)
    
    expect(screen.getByText('Error: Failed to load movies')).toBeInTheDocument()
  })

  test('displays no movies found message when movies array is empty', () => {
    (useMovieContext as jest.Mock).mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })

    render(<MoviesList />)
    
    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })

  test('renders pagination when there are multiple pages', async () => {
    render(<MoviesList />)
    
    // Find the next page button by its icon or pagination controls - use last button
    const paginationButtons = screen.getAllByRole('button');
    const nextPageButton = paginationButtons[paginationButtons.length - 1]; // Last button should be next
    
    expect(nextPageButton).toBeInTheDocument()
    
    await userEvent.click(nextPageButton)
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2)
  })
}) 