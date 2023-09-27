import { cleanup, render, screen } from '@testing-library/react';
import { Copyright } from '../copy-right';

afterEach(cleanup);
describe('Copyright', () => {
  let txt = '';
  beforeEach(() => {
    txt = 'All right reserved';
  });

  it('should render without crashing', () => {
    const { getByText } = render(<Copyright copyright={txt} />);

    expect(getByText(/©/i)).toBeInTheDocument();
  });

  it('should have `All right reserved`', () => {
    render(<Copyright copyright={txt} />);

    const res = screen.getByText(/All right reserved/i);
    expect(res).toHaveTextContent(/All right reserved/i);
  });
});
