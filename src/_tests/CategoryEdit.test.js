import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryEdit from '../categories/CategoryEdit';

// Mock the useParams and useNavigate hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ cat_type: 'Test' }),
  useNavigate: jest.fn(),
}));

describe('CategoryEdit', () => {
  it('renders correctly', () => {
    render(<CategoryEdit />);

    expect(screen.getByText('Edit Test?')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const updateMock = jest.fn();
    const removeMock = jest.fn();
    render(<CategoryEdit update={updateMock} remove={removeMock} />);

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'New Test' } });
    fireEvent.submit(screen.getByText('Submit'));

    expect(updateMock).toHaveBeenCalledWith('category', 'Test', { cat_type: 'New Test' });
  });

  it('handles category deletion', async () => {
    const updateMock = jest.fn();
    const removeMock = jest.fn();
    render(<CategoryEdit update={updateMock} remove={removeMock} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(removeMock).toHaveBeenCalledWith('categories/Test');
  });
});
