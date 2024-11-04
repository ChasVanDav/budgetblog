import { render, screen } from '@testing-library/react';
import Weather from '../components/Weather.jsx';

describe('Weather Component', () => {
    test('renders without crashing', () => {
        render(<Weather />);
        const headingElement = screen.getByText(/Weather/i);
        expect(headingElement).toBeInTheDocument();
    });
});
