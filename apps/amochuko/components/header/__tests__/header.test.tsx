import { render, screen } from '@testing-library/react';
import { navMenu } from '../../../App';
import { Header } from '../header';

describe('Header', () => {
  beforeEach(() => {
    // arrange
    render(<Header logo='O.A' navMenu={navMenu} />);
  });

  it('should get header', async () => {
    // act
    const header = await screen.findByRole('header');

    // assert
    expect(header).toBeInTheDocument();
  });

  it('should wait for title', async () => {
    // act
    const logo = await screen.getByText(/o.a/i);

    // assert
    expect(logo).toBeInTheDocument();
  });
});
