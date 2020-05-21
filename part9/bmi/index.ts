import express from 'express';
import calculateBmi from './bmiCalculator';
import getInfo from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {weight, height} = req.query;

  if (!weight || !height) {
    res.status(500).send({error: "missing parameters"});
  } else if (isNaN(Number(weight)) || isNaN(Number(height)) ) {
    res.status(500).send({error: "malformatted parameters"});
  } else {
    const result = calculateBmi(height, weight);
    res.send({weight, height, bmi: result});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} : {daily_exercises: any, target: any} = req.body;

  if (!daily_exercises || !target) {
    res.status(500).send({error: "missing parameters"});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  } else if (!daily_exercises.map(input => Number(input)).every(input => !isNaN(input)) || isNaN(Number(target)) ) {
    res.status(500).send({error: "malformatted parameters"});
  } else {
    const result = getInfo(daily_exercises, target);
    res.send({...result});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});