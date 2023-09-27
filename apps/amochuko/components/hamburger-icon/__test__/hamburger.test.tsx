import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerIcon } from '../hamburger-icon';

describe('Header', () => {
  let isMenuOpen = false;
  const setIsMenuOpen = jest.fn(() => {
    isMenuOpen = !isMenuOpen;
  });

  beforeEach(() => {
    // arrange
    render(
      <HamburgerIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    );
  });

  it('should toggle isMocked', async () => {
    // act
    const menu = await screen.findByRole('menu');

    // assert
    expect(menu).toBeInTheDocument();
  });

  it('should toggle setIsMenuOpen', async () => {
    // act
    const menu = await screen.findByRole('menu');
    userEvent.click(menu);

    // assert
    expect(setIsMenuOpen).toHaveBeenCalledTimes(1);
  });
});
