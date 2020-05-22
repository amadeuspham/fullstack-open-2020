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
    id: Math.max(...patients.map(p => p.id)) + 1,
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