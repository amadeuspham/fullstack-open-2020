interface BodyValues {
  height: number;
  weight: number;
}

interface Error {
  message: string | undefined
}

const parseArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight/Math.pow((height/100), 2);

	if (bmi < 15) {
		return 'Very severely underweight';
	} else if (15 <= bmi && bmi <= 16) {
		return 'Severely underweight';
	} else if (16 < bmi && bmi <= 18.5) {
		return 'Underweight';
	} else if (18.5 < bmi && bmi <= 25) {
		return 'Normal (healthy weight)';
	} else if (25 < bmi && bmi <= 30) {
		return 'Overweight';
	} else if (30 < bmi && bmi <= 35) {
		return 'Obese Class I (Moderately obese)';
	} else if (35 < bmi && bmi <= 40) {
		return 'Obese Class II (Severely obese)';
	} else {
		return 'Obese Class III (Very severely obese)';
	}
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: Error) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
  console.log(calculateBmi(180, 74));
}

export default calculateBmi;