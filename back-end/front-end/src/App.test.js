import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search form elements', () => {
  render(<App />);
  expect(screen.getByLabelText('Search Term:')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
}
);
