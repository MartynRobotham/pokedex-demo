import React from 'react';
import { render, screen } from '@testing-library/react';
import {SearchBar} from "./search-bar";

test('renders search bar with placeholder text', () => {
    render(<SearchBar searchQuery={() => console.log('temp')} />);
    const linkElement = screen.getByPlaceholderText('Search...');
    expect(linkElement).toBeInTheDocument();
});
