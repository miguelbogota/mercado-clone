import SearchBar from '@app-components/search-bar';
import { getColor } from '@app-components/styling/colors';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));

describe('Components - SearchBar', () => {
  it('should render correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it('should render the correct placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Nunca dejes de buscar')).toBeInTheDocument();
  });

  it('should render the correct button text', () => {
    render(<SearchBar />);
    expect(screen.getByText('search')).toBeInTheDocument();
  });

  it('should render the correct button color', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: getColor('primaryBackgroundColor'),
    });
  });
});
