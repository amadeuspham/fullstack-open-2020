import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	const patients = patientService.getNSSEntries();
  res.send(patients);
});

router.post('/', (req, res) => {
	const newPatientEntry = toNewPatientEntry(req.body)
	const newPatient = patientService.addEntry(newPatientEntry)
  res.json(newPatient);
});

export default router;