import { getToken, getMovies } from '../../services/api'
import { API_BASE_URL } from '../../consts/url'

// Mock fetch
global.fetch = jest.fn()

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getToken', () => {
    test('should fetch a token successfully', async () => {
      const mockResponse = { token: 'test-token' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      const result = await getToken()

      expect(result).toBe('test-token')
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/token`)
    })

    test('should handle errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(getToken()).rejects.toThrow('Network error')
    })
  })

  describe('getMovies', () => {
    test('should fetch movies successfully', async () => {
      const mockToken = 'test-token'
      const mockParams = {
        page: 1,
        limit: 10,
        search: 'test movie',
        genre: 'Action'
      }

      const mockResponse = {
        data: [{ id: '1', title: 'Test Movie' }],
        totalPages: 5,
        totalResults: 50
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      const result = await getMovies(mockToken, mockParams)

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/movies?page=1&limit=10&search=test+movie&genre=Action`,
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${mockToken}`
          }
        })
      )
    })

    test('should use default values for missing parameters', async () => {
      const mockToken = 'test-token'
      const mockParams = {} // Empty params
      
      const mockResponse = {
        data: [],
        totalPages: 0,
        totalResults: 0
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      await getMovies(mockToken, mockParams)

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/movies?page=1&limit=10&search=&genre=`,
        expect.any(Object)
      )
    })

    test('should handle API errors', async () => {
      const mockToken = 'test-token'
      const mockParams = { page: 1 }

      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'))

      await expect(getMovies(mockToken, mockParams)).rejects.toThrow('API error')
    })
  })
}) 