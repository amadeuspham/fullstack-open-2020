interface Summary{ 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseInfo {
  hoursArray: number[];
  target: number;
}

const parseArguments = (args: Array<string>): ExerciseInfo => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numInputs = args.slice(2).map(input => Number(input));
  const allNumbers = numInputs.every(input => !isNaN(input));

  if (allNumbers) {
    return {
      hoursArray: numInputs.slice(1),
      target: numInputs[0]
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const getInfo = (hoursArray: number[], target: number): Summary => {
  const periodLength = hoursArray.length;
  const trainingDays = hoursArray.filter(hours => hours !== 0).length;
  const totalHours = hoursArray.reduce((accumulator, currentValue) => accumulator + currentValue);
  const average = totalHours/periodLength;
  let rating = 1;

  if (average > target*0.6 && average < target) {
    rating = 2;
  } else if (average >= target) {
    rating = 3;
  }

  let ratingDescription = 'You need to push way harder!';
  if (rating === 2) {
    ratingDescription = '3.6 roentgen - not great, not terrible';
  } else if (rating === 3) {
    ratingDescription = 'Legend! Keep up!';
  }

  return {
    periodLength,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { hoursArray, target } = parseArguments(process.argv);
  console.log(getInfo(hoursArray, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
  console.log('Defaulted to calculate hard-coded values');
  console.log(getInfo( [3, 0, 2, 4.5, 0, 3, 1], 2 ));
}

export default getInfo;