import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { PatientEntry, NSSPatientEntry, NewPatientEntry, Entry, NewEntry } from "../types";

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNSSEntries = (): Array<NSSPatientEntry> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = (patientEntry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuidv4(),
    ...patientEntry,
  }
  patients.push(newPatient)
  return newPatient;
};

const addEntryToPatient = (entry: NewEntry, patientId: string) => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  } as Entry;
  const editingPatient = patients.find(p => p.id === patientId)
  if (editingPatient) {
    editingPatient.entries = [...editingPatient.entries, newEntry];
    return newEntry
  } else {
    return null
  }
}

export default {
  getEntries,
  getNSSEntries,
  addEntry,
  addEntryToPatient,
};