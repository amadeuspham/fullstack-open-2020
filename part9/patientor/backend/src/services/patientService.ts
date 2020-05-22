import { v4 as uuidv4 } from 'uuid';

import patientsData from '../../data/patients';
import { PatientEntry, NSSPatientEntry, NewPatientEntry } from "../types";

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

export default {
  getEntries,
  getNSSEntries,
  addEntry,
};