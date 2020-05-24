import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, {toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	const patients = patientService.getNSSEntries();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
	const patient = patientService.getEntries().find(p => p.id === id);
  res.send(patient);
});

router.post('/', (req, res) => {
	const newPatientEntry = toNewPatientEntry(req.body)
	const newPatient = patientService.addEntry(newPatientEntry)
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const newEntry = toNewEntry(req.body)
  if (newEntry) {
    const addedEntry = patientService.addEntryToPatient(newEntry, patientId)
    res.json(addedEntry);
  } else {
    res.status(500).send()
  }
});

export default router;