import React, { useState } from 'react';

type CheckboxWithLabelProps = {
  labelRef: React.LegacyRef<HTMLLabelElement>;
  inputRef: React.LegacyRef<HTMLInputElement>;
  checked: boolean;
};

export function CheckboxWithLabel(props: CheckboxWithLabelProps) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label ref={props.labelRef}>
      <input
        ref={props.inputRef}
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  );
}
