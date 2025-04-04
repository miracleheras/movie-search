# Movie Search Application

A modern web application that allows users to search and browse movies, with advanced filtering, sorting, and detailed movie information.

## Features

- Search movies by title
- Filter movies by genre
- Detailed movie pages with comprehensive information
- Responsive UI that works on mobile and desktop
- Pagination with customizable number of results per page
- Elegant and modern user interface with Tailwind CSS

## Technology Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **React Router**: For navigation and routing
- **Context API**: For state management
- **Tailwind CSS**: For styling and responsive design
- **Jest & React Testing Library**: For unit and integration testing
- **Vite**: Fast, modern build tool

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # Context providers for state management
├── consts/          # Constants and enums
├── layouts/         # Layout components
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript type definitions
└── __tests__/       # Test files
```

## Project Highlights

### What I Find Most Interesting

The most interesting aspect of this project is the robust search and pagination implementation. I've created a system that not only allows users to search and filter movies but also provides a smooth, intuitive user experience with:

- **Dynamic API Integration**: The application efficiently handles API requests with proper token management, request debouncing, and error handling.
- **Smart Pagination**: I implemented an adaptive pagination system that intelligently displays page numbers based on the user's current position in the result set, providing a clean UI even with large datasets.
- **Customizable Results**: Users can adjust the number of results per page, giving them control over their browsing experience.
- **Persistent Search Parameters**: The application maintains search parameters when navigating between movie details and the search page, improving the user experience.

These features combined create a seamless movie browsing experience that meets all the requirements while prioritizing user experience and performance.

### What I'm Most Proud Of

I'm particularly proud of the movie detail page implementation. It showcases:

1. **Detailed Information Display**: The page provides comprehensive movie information with an aesthetically pleasing layout.
2. **Error Handling**: Robust error handling ensures users always receive appropriate feedback.
3. **Responsive Design**: The layout adapts beautifully across different device sizes.
4. **Performance Optimization**: Data fetching is optimized to minimize loading times.

The pagination system is another highlight, with its intelligent algorithm for displaying page numbers that adapts based on the current position within the total result set. It provides a great user experience regardless of whether there are 5 or 500 pages of results.

## Future Improvements

Given more time, I would like to implement the following features and improvements:

1. **Advanced Filtering and Sorting**: Add more advanced filtering options such as release year range, rating threshold, and multiple genre selection. Implement sorting capabilities for search results.

2. **User Authentication and Favorites**: Allow users to create accounts, save favorite movies, and create watch lists for future reference.

3. **Performance Optimizations**: Implement lazy loading for images, virtualized lists for large result sets, and optimize bundle size for faster initial load times.

4. **Offline Support and PWA Features**: Add service workers for caching and offline support, making the application function as a Progressive Web App (PWA).

5. **Enhanced Movie Recommendations**: Implement an algorithm to recommend similar movies based on user preferences and viewing history.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open browser and navigate to `http://localhost:5173`

### Running Tests

```
npm run test
```

### Building for Production

```
npm run build
```