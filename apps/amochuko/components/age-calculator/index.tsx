import { format } from '../../utils/lib';
import { Input } from '../input/input';
import './styles/age-calc.css';

type BirthObject = {
  [key: string]: Record<string, number>;
};

export function AgeCalculator() {
  const birthDetails = ['day', 'month', 'year'];
  const daysInMonthObj: {
    [index: string]: number;
  } = {
    jan: 31,
    feb: 28,
    mar: 31,
    apr: 30,
    may: 30,
    jun: 30,
    jul: 31,
    aug: 31,
    sept: 30,
    oct: 31,
    nov: 30,
    dec: 31,
  };

  const months = Object.keys(daysInMonthObj);
  const year = new Date().getFullYear();

  const birthObj: BirthObject = {
    d: { day: 31 },
    m: { month: 12 },
    y: { year: new Date().getFullYear() },
  };

  function handleInput(e: any) {
    const value = e.target?.value;
    let days = 0;
    let month = '';

    // let lbl = input.querySelector('label') as HTMLElement;
    // let spanErr = input.querySelector('span') as any;
    // let inpt = input.querySelector('input') as HTMLInputElement;

    for (let j = 0; j < months.length; j++) {
      days = daysInMonthObj[months[j]];
      month = months[j];

      console.log(month + ':' + days, months[j]);
      // switch (inputId) {
      //   case 'day':
      //     spanErr.innerText = 'Must be valid date';
      //     break;
      //   case 'month':
      //     spanErr.innerText = 'Must be valid month';
      //     break;
      //   case 'year':
      //     spanErr.innerText = `Must be within ${new Date().getFullYear()}`;
      //     break;
      // }
      // if (inputId === 'day' && parseInt(value) > days) {
      //   // add error marker
      //   paintControls(lbl, inpt, spanErr, true);
      // } else {
      //   paintControls(lbl, inpt, spanErr, false);
      // }
      // if (inputId === 'month' && parseInt(value) > months.length) {
      //   // add error marker
      //   paintControls(lbl, inpt, spanErr, true);
      // } else {
      //   paintControls(lbl, inpt, spanErr, false);
      // }
    }

    let date: any[] = [];
    if (value) {
      // birthObj[str] = value;
      if (date.length > 0) date.push(value);
    }

    calcAge(birthObj, birthDetails);
  }

  /**
   * @dev Calculate age from inputed value
   * @param obj {obj} an empty object literal
   * @param birthDetails {birthDetails} birth details
   */
  function calcAge(obj: any, data: any) {
    const { day, month, year } = obj;
    const birthday = new Date(year, month - 1, day);

    const now = new Date();
    const years = now.getFullYear() - birthday.getFullYear();
    const months = now.getMonth() - birthday.getMonth();
    const days = now.getDate() - birthday.getDate();

    const result = [years, Math.abs(months), Math.abs(days)];
    const output = document.querySelectorAll('.age-calc__card__output p');

    const phrase = data.reverse();

    output.forEach((el, i) => {
      el.innerHTML = `<span class='age-calc__card__output--span'>${
        result[i]
      } </span> ${result[i] > 1 ? phrase[i] + 's' : phrase[i]}`;
    });
  }

  return (
    <div className='age-calc'>
      <div className='age-calc__card'>
        <form
          action=''
          name='AgeCalculator'
          className='age-calc__card__form'
        ></form>
        <div className='age-calc__card__divider__icon'></div>
        <span className='age-calc__card__divider'></span>
        <div className='age-calc__card__output'>
          {birthDetails.reverse().map((e) => (
            <p className='age-calc__card__output--paragraph'>
              <span className='age-calc__card__output--span'>- -</span>
              {e}
            </p>
          ))}
        </div>
      </div>
      <div className='age-calc__card__input'>
        {birthDetails.map((b: any, i) => {
          let str = birthDetails[i];

          return Input({
            cb: handleInput,
            id: str,
            placeholderTxt:
              str !== 'year'
                ? format.repeatStr(str, 2)
                : format.repeatStr(str, 4),
            labelPlacement: 'top',
            labelTxt: str.toUpperCase(),
            labelVisible: true,
            style: {
              borderRadius: '8px',
              height: '42px',
              maxWidth: '80px',
              fontSize: '20px',
              fontWeight: '700',
            },
            type: 'number',
            eventType: 'input',
          });
        })}
      </div>
    </div>
  );
}
