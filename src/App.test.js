import { render, screen } from '@testing-library/react';
import App from './App';


// test register feature 

test('register', () => {
  render(<App />);
  const linkElement = screen.getByText(/register/i);
  expect(linkElement).toBeInTheDocument();
}
);