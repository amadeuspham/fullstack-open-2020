/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  NewPatientEntry, 
  NewEntry, 
  Gender, 
  Entry, 
  EntryTypes,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  Discharge,
  OccupationalHealthcareEntry,
  SickLeave,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntries = (entries: any): entries is Entry[] => {
  if (entries.length === 0) {
    return true
  }
  return entries.forEach((entry: Entry) => toNewEntry(entry))
}

const isEntryType = (param: any): param is EntryTypes => {
  return Object.values(EntryTypes).includes(param);
};

const isDiagnosisCodes = (diagnosisCodes: any): diagnosisCodes is string[] => {
  if (diagnosisCodes.length === 0) {
    return true
  }
  const res = diagnosisCodes.every((code: string) => isString(code))
  return res;
}

const isHealthcheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isDischarge = (discharge: any): discharge is Discharge => {
  if (!discharge.date || !discharge.criteria) {
    return false
  }

  if (isDate(discharge.date) && isString(discharge.criteria)) {
    return true
  } else {
    return false
  }
}

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (!sickLeave.startDate || !sickLeave.endDate) {
    return false
  }

  if (isDate(sickLeave.startDate) && isDate(sickLeave.endDate)) {
    return true
  } else {
    return false
  }
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
}

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }

  return ssn;
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
}

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender)
  } 
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!Array.isArray(entries) || !isEntries(entries)) {
      throw new Error('Incorrect or missing entries: ' + entries)
  } 
  return entries;
};

const parseEntryTypes = (type: any): EntryTypes => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }

  return type;
}

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
}

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
}

const parseDiagnosisCodes = (diagnosisCodes: any): string[] | undefined => {
  if (!Array.isArray(diagnosisCodes)) {
    return undefined
  } else if (!isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
}

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === 0) {
    return rating
  }
  if (!rating || !isHealthcheckRating(rating)) {
      throw new Error('Incorrect or missing rating: ' + rating)
  } 
  return rating;
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge)
  }

  return discharge
}

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name: ' + name)
  }

  return name
}

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined
  } else if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave)
  }

  return sickLeave
}

const toNewHealthCheckEntry = (object: any): Omit<HealthCheckEntry, 'id'> => {
  const newEntry: Omit<HealthCheckEntry, 'id'> = {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  }

  return newEntry
}

const toNewHospitalEntry = (object: any): Omit<HospitalEntry, 'id'> => {
  const newEntry: Omit<HospitalEntry, 'id'> = {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  }

  return newEntry
}

const toNewOccupationalHealthCareEntry = (object: any): Omit<OccupationalHealthcareEntry, 'id'> => {
  const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
  }

  return newEntry
}

export const toNewEntry = (object: any): NewEntry | undefined => {
  const type = parseEntryTypes(object.type)

  switch (type) {
    case "HealthCheck":
      return toNewHealthCheckEntry(object)
    case "Hospital":
      return toNewHospitalEntry(object)
    case "OccupationalHealthcare":
      return toNewOccupationalHealthCareEntry(object)
    default:
      throw new Error(
        `Entry's type is not allowed: ${JSON.stringify(object)}. Allowed types: "HealthCheck, Hospital, OccupationalHealthcare"`
      );
  }
}

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
  	name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  }
  
  return newEntry;
} 

export default toNewPatientEntry;