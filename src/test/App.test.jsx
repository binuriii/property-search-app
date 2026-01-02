import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { test, expect } from 'vitest';

test('renders search page with properties', () => {
    render(<App />);
    const heading = screen.getByText(/Property Search/i);
    expect(heading).toBeInTheDocument();
});

test('search filters by type', async () => {
    render(<App />);
    const typeSelect = screen.getByLabelText(/Property Type/i);
    await userEvent.click(typeSelect);

    //Each MUI option is rendered as an item within a listbox, marked with role='option'
    const houseOption = await screen.findByRole('option', { name: 'House' });
    await userEvent.click(houseOption);

    const results = screen.getAllByRole('heading', { level: 3 });
    results.forEach((res) => {
        expect(res.textContent).toMatch(/House/i);
    });    
});

test('adds property to favorites by button click', async () => {
    render(<App />);
    const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
    await userEvent.click(addButtons[0]);

    // Use getByRole with heading and name
    const favoriteHeading = screen.getByRole('heading', { name: /Favorites/i, level: 2 });
    expect(favoriteHeading).toBeInTheDocument();

    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    expect(removeButtons.length).toBeGreaterThan(0);
});

test('removes property from favorites by button click', async () => {
    render(<App />);
    const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
    await userEvent.click(addButtons[0]);

    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    await userEvent.click(removeButtons[0]);

    const noFavoritesText = screen.getByText(/No favorite properties yet/i);
    expect(noFavoritesText).toBeInTheDocument();
});

test('clears all favorites', async () => {
    render(<App />);
    const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
    await userEvent.click(addButtons[0]);
    await userEvent.click(addButtons[1]);

    const clearButton = screen.getByRole('button', { name: /Clear all favorites/i });
    await userEvent.click(clearButton);

    const noFavoritesText = screen.getByText(/No favorite properties yet/i);
    expect(noFavoritesText).toBeInTheDocument();
});
