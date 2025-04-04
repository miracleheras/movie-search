import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../test-utils'
import { MovieSearch } from '../../components/movieSearch'
import '../__mocks__/apiMocks'
import { useMovieContext } from '../../context/MovieContext'

// Mock the movie context
jest.mock('../../context/MovieContext', () => {
  const original = jest.requireActual('../../context/MovieContext')
  return {
    ...original,
    useMovieContext: jest.fn()
  }
})

describe('MovieSearch Component', () => {
  const mockFetchMovies = jest.fn()
  const mockSetSearch = jest.fn()
  const mockSetSelectedGenre = jest.fn()
  const mockSetLimit = jest.fn()
  const mockSetCurrentPage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useMovieContext as jest.Mock).mockReturnValue({
      search: 'test search',
      setSearch: mockSetSearch,
      selectedGenre: '',
      setSelectedGenre: mockSetSelectedGenre,
      limit: 25,
      setLimit: mockSetLimit,
      movies: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalResults: 10,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })
  })

  test('renders MovieSearch component', () => {
    render(<MovieSearch />)
    
    // Check that the main UI elements are rendered
    expect(screen.getByText('Search Movies')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Genre')).toBeInTheDocument()
    expect(screen.getByLabelText('Movies Number Per Page')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  test('displays search input with correct value', () => {
    render(<MovieSearch />)
    
    const searchInput = screen.getByLabelText('Title') as HTMLInputElement
    expect(searchInput).toHaveValue('test search')
  })

  test('calls setSearch when search input changes', async () => {
    render(<MovieSearch />)
    
    const searchInput = screen.getByLabelText('Title')
    
    // Use fireEvent instead of userEvent to avoid typing one character at a time
    fireEvent.change(searchInput, { target: { value: 'new search' } })
    
    expect(mockSetSearch).toHaveBeenCalledWith('new search')
  })

  test('calls setSelectedGenre when genre dropdown changes', () => {
    render(<MovieSearch />)
    
    const genreSelect = screen.getByLabelText('Genre')
    fireEvent.change(genreSelect, { target: { value: 'Action' } })
    
    expect(mockSetSelectedGenre).toHaveBeenCalledWith('Action')
  })

  test('calls setLimit when limit input changes', () => {
    render(<MovieSearch />)
    
    const limitInput = screen.getByLabelText('Movies Number Per Page')
    fireEvent.change(limitInput, { target: { value: '50' } })
    
    expect(mockSetLimit).toHaveBeenCalledWith(50)
  })

  test('submits form and calls fetchMovies', async () => {
    render(<MovieSearch />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.click(searchButton)
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
    expect(mockFetchMovies).toHaveBeenCalled()
  })

  test('shows loading state when loading is true', () => {
    (useMovieContext as jest.Mock).mockReturnValue({
      search: '',
      setSearch: mockSetSearch,
      selectedGenre: '',
      setSelectedGenre: mockSetSelectedGenre,
      limit: 25,
      setLimit: mockSetLimit,
      movies: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      setCurrentPage: mockSetCurrentPage,
      fetchMovies: mockFetchMovies
    })
    
    render(<MovieSearch />)
    
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  test('shows total results when results are available', async () => {
    render(<MovieSearch />)
    
    // The text content is spread across multiple elements so use a partial match
    const resultsElement = screen.getByText(/Found/);
    expect(resultsElement).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument() 
  })
}) 