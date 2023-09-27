import { useState } from 'react';
import { format } from '../../../utils/lib';

export const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // const matchValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

  function handleChange(e: any) {
    const name = e.target.name;
    let value = e.target.value;

    validate(e, name, value);
    setValues({ ...values, [name]: value });

    console.log('values', values, Object.values(values).length);
    // console.log('errors', errors, Object.values(errors).length);
  }

  /**
   *
   * @param e Event
   * @param name name of element
   * @param value value of input element
   */
  function validate(e: any, name: any, value: any) {
    switch (name) {
      case 'username':
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: 'Username have atleast 5 characters',
          });
        } else {
          let newObj = format.omitFromObj(errors, 'username');
          setErrors(newObj);
        }

        break;
      case 'email':
        if (!format.isValidEmail(value)) {
          setErrors({ ...errors, email: 'Enter a valid email' });
        } else {
          let newObj = format.omitFromObj(errors, 'email');
          setErrors(newObj);
        }
        break;

      case 'password':
        if (!format.isValidPassword(value)) {
          setErrors({
            ...errors,
            password:
              'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
          });
        } else {
          let newObj = format.omitFromObj(errors, 'password');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  }

  return { values, errors, handleChange };
};
