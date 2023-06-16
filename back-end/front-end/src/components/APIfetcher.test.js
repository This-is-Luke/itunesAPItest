import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import APIfetcher from './APIfetcher';

it('matches the snapshot', () => {
	const { asFragment } = render(<APIfetcher />);
	expect(asFragment()).toMatchSnapshot();
});

it('renders search form elements', () => {
	render(<APIfetcher />);
	expect(screen.getByLabelText('Search Term:')).toBeInTheDocument();
	expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
});

it('handles search term input and media type change', () => {
	render(<APIfetcher />);
	const searchTermInput = screen.getByLabelText('Search Term:');
	fireEvent.change(searchTermInput, { target: { value: 'test' } });
	expect(searchTermInput.value).toBe('test');

	const mediaTypeSelect = screen.getByRole('combobox');
	fireEvent.change(mediaTypeSelect, { target: { value: 'movie' } });
	expect(mediaTypeSelect.value).toBe('movie');
});
