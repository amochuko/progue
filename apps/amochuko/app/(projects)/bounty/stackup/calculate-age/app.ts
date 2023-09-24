// @ts-nocheck
class AgeCalculator {
  constructor(dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  calculateAge() {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the user hasn't had their birthday this year yet
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}

function calculateAge() {
  const dobInput = document.getElementById('dob');
  const resultElement = document.getElementById('result');

  let dob = 0;
  let ageCalculator = 0;
  let period = '';

  try {
    dob = dobInput.value;

    if (!dob) {
      throw new Error('Please enter a valid date of birth.');
    }

    ageCalculator = new AgeCalculator(dob);
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  } finally {
    dobInput.value = ''; // Clear the input field
  }

  const age = ageCalculator.calculateAge();

  switch (age > 1) {
    case true:
      period = `years`;
      break;
    case false:
      period = `year`;
      break;

    default:
      period = `year`;
      break;
  }

  resultElement.textContent = `You are ${age} ${period} old.`;
}

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const H1 = document.createElement('h1');
H1.innerText = 'Age Calculator';

const input = document.createElement('input');
input.type = 'date';
input.id = 'dob';

const p = document.createElement('p');
p.innerText = 'Enter your date of birth';

const btn = document.createElement('button');
btn.innerText = 'Calculate Age';
btn.onclick = calculateAge;

const result = document.createElement('p');
result.id = 'result';

wrapper.append(H1);
wrapper.append(p);
wrapper.append(input);
wrapper.append(btn);
wrapper.append(result);

export { wrapper };
