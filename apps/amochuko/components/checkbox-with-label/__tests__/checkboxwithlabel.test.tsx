import { cleanup, fireEvent, render } from '@testing-library/react';
import { CheckboxWithLabel } from '..';

afterEach(cleanup);

xdescribe('Checkbox', () => {
  it('CheckboxWithLabel changes the text after click', () => {
    // ARRANGE
    const { queryByLabelText, getByLabelText } = render(
      <CheckboxWithLabel checked={true} inputRef='checker' labelRef='checker' />
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));
    expect(queryByLabelText(/on/)).toBeTruthy();
  });
});
