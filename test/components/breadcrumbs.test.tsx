import Breadcrumbs from '@app-components/breadcrumbs';
import { render, screen } from '@testing-library/react';

describe('Components - Breadcrumbs', () => {
  const items = ['Home', 'Categories', 'Electronics'];

  it('should render correctly', () => {
    const { container } = render(<Breadcrumbs items={items} />);
    expect(container).toMatchSnapshot();
  });

  it('should render all the items', () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getAllByRole('link').length).toBe(items.length);
  });

  it('should render the correct number of separators', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getAllByRole('separator').length).toBe(items.length - 1);
  });
});
