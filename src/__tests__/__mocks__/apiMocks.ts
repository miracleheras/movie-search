import { Movie } from '../../types'
import fetchMock from 'jest-fetch-mock'

// Enable fetchMock
fetchMock.enableMocks()

// Mock data for tests
export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Mock Movie 1',
    rating: '8.5',
    posterUrl: 'https://example.com/poster1.jpg',
    bestRating: 10,
    datePublished: '2020-01-01',
    directors: ['Mock Director'],
    duration: '120 min',
    genres: [{ title: 'Action' }, { title: 'Adventure' }],
    mainActors: ['Actor 1', 'Actor 2'],
    ratingValue: 8.5,
    summary: 'A mock movie plot',
    worstRating: 0,
    writers: ['Writer 1']
  },
  {
    id: '2',
    title: 'Mock Movie 2',
    rating: '7.8',
    posterUrl: 'https://example.com/poster2.jpg',
    bestRating: 10,
    datePublished: '2021-02-15',
    directors: ['Another Director'],
    duration: '110 min',
    genres: [{ title: 'Comedy' }, { title: 'Drama' }],
    mainActors: ['Actor 3', 'Actor 4'],
    ratingValue: 7.8,
    summary: 'Another mock movie plot',
    worstRating: 0,
    writers: ['Writer 2']
  }
]

// API response mocks
export const mockMoviesResponse = {
  data: mockMovies,
  totalPages: 10,
  totalResults: 100
}

// API mocks as Jest spies
export const mockGetToken = jest.fn().mockResolvedValue('mock-token')
export const mockGetMovies = jest.fn().mockResolvedValue(mockMoviesResponse)

// Configure fetch mock responses
beforeEach(() => {
  fetchMock.resetMocks()
  
  // Mock token endpoint
  fetchMock.mockResponseOnce(JSON.stringify({ token: 'mock-token' }))
  
  // Mock movies endpoint
  fetchMock.mockResponseOnce(JSON.stringify(mockMoviesResponse))
})

// Jest mock for the API service
jest.mock('../../services/api', () => ({
  getToken: () => mockGetToken(),
  getMovies: (...args: any[]) => mockGetMovies(...args)
})) 