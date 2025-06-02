import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UrlForm from '../components/UrlForm';

describe('UrlForm Component', () => {
  test('renders URL input field', () => {
    const mockSubmit = jest.fn();
    render(<UrlForm onSubmit={mockSubmit} />);
    
    const inputElement = screen.getByPlaceholderText(/enter website url/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('shows validation error for invalid URL', () => {
    const mockSubmit = jest.fn();
    render(<UrlForm onSubmit={mockSubmit} />);
    
    const inputElement = screen.getByPlaceholderText(/enter website url/i);
    fireEvent.change(inputElement, { target: { value: 'invalid-url' } });
    
    const buttonElement = screen.getByText(/generate image/i);
    fireEvent.click(buttonElement);
    
    const errorMessage = screen.getByText(/please enter a valid url/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit with valid URL', () => {
    const mockSubmit = jest.fn();
    render(<UrlForm onSubmit={mockSubmit} />);
    
    const validUrl = 'https://example.com';
    const inputElement = screen.getByPlaceholderText(/enter website url/i);
    fireEvent.change(inputElement, { target: { value: validUrl } });
    
    const buttonElement = screen.getByText(/generate image/i);
    fireEvent.click(buttonElement);
    
    expect(mockSubmit).toHaveBeenCalledWith(validUrl);
  });
});
