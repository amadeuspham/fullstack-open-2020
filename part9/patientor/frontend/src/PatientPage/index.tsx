import React, {useEffect} from "react";
import { Container, Icon, Segment, Button, Divider } from "semantic-ui-react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, setDiagnoses } from "../state";
import { Patient, Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { HealthCheckEntryFormValues } from "../AddHealthCheckEntryModal/AddHealthCheckEntryForm";
import { HospitalEntryFormValues } from "../AddHospitalEntryModal/AddHospitalEntryForm";
import { OccupationalHealthcareEntryFormValues } from "../AddOccupationalHealthcareEntryModal/AddOccupationalHealthcareEntryForm";
import AddHealthCheckEntryModal from "../AddHealthCheckEntryModal";
import AddHospitalEntryModal from "../AddHospitalEntryModal";
import AddOccupationalHealthcareEntryModal from "../AddOccupationalHealthcareEntryModal";

interface PatientEntriesProps {
  entries: Entry[]
}

interface DiagnosesProps {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
  allDiagnoses: Diagnosis[];
}

const Diagnoses: React.FC<DiagnosesProps> = ({diagnosisCodes, allDiagnoses}) => {
  if (!diagnosisCodes) {
    return null
  } else if (!allDiagnoses) {
    return (
      <div>
        Diagnoses:
        <ul>
          {diagnosisCodes.map(diagnosisCode => 
            <li key={diagnosisCode}>{diagnosisCode}</li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div>
      Diagnoses:
      <ul>
        {diagnosisCodes.map(diagnosisCode => 
          <li key={diagnosisCode}>
            {diagnosisCode} {allDiagnoses.find((d: Diagnosis) => d.code === diagnosisCode)?.name}
          </li>
        )}
      </ul>
    </div>
  )
}

const HospitalEntryDetails: React.FC<{entry: HospitalEntry, allDiagnoses: Diagnosis[]}> = ({entry, allDiagnoses}) => {
  return (
    <Segment key={entry.id}>
      <div>
        <b>{entry.date} <Icon className="hospital" /></b>
      </div>
      <i>{entry.description}</i>
      <p>Discharge: </p>
      <ul>
        <li>Date: {entry.discharge.date}</li>
        <li>Criteria: {entry.discharge.criteria}</li>
      </ul>
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} allDiagnoses={allDiagnoses}/>
    </Segment>
  )
}

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry, allDiagnoses: Diagnosis[]}> = ({entry, allDiagnoses}) => {
  return (
    <Segment key={entry.id}>
      <div>
        <b>{entry.date} <Icon className="user doctor" /></b>
      </div>
      <i>{entry.description}</i>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave &&
        <div>
          Sick leave:
          <ul>
            <li>Start date: {entry.sickLeave.startDate}</li>
            <li>End date: {entry.sickLeave.endDate}</li>
          </ul>
        </div>
      }
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} allDiagnoses={allDiagnoses}/>
    </Segment>
  )
}

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry, allDiagnoses: Diagnosis[]}> = ({entry, allDiagnoses}) => {
  let heartColor = 'green';
  if (entry.healthCheckRating === 3) {
    heartColor = 'red'
  } else if (entry.healthCheckRating === 2) {
    heartColor = 'orange'
  } else if (entry.healthCheckRating === 1) {
    heartColor = 'olive'
  }

  return (
    <Segment key={entry.id}>
      <div>
        <b>{entry.date}</b> 
        <Icon className="clipboard check" />
      </div>
      <i>{entry.description}</i>
      <div>
        <Icon className={'heart ' + heartColor} />
      </div>
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} allDiagnoses={allDiagnoses}/>
    </Segment>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{entry: Entry, allDiagnoses: Diagnosis[]}> = ({entry, allDiagnoses}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} allDiagnoses={allDiagnoses}/>
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} allDiagnoses={allDiagnoses}/>
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} allDiagnoses={allDiagnoses}/>
    default:
      return assertNever(entry)
  }
}

const PatientEntries: React.FC<PatientEntriesProps> = ({entries}) => {
  const [{ diagnoses: allDiagnoses }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi))
      } catch (error) {
        console.log(error)
      }
    }
    fetchDiagnoses();
  }, [dispatch])

  if (!entries) {
    return null
  }

  return (
    <div>
      <h4>entries</h4>
      {entries.map(entry => 
        <EntryDetails key={entry.id} entry={entry} allDiagnoses={allDiagnoses}/>
      )}
    </div>
  )
}

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient: patient }, dispatch] = useStateValue();

  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [occupationalHealthcareModalOpen, setOccupationalHealthcareModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccupationalHealthcareModal = (): void => setOccupationalHealthcareModalOpen(true);

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };
  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeOccupationalHealthcareModal = (): void => {
    setOccupationalHealthcareModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryFormValues 
                                      | HospitalEntryFormValues 
                                      | OccupationalHealthcareEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      switch (values.type) {
        case "HealthCheck":
          closeHealthCheckModal();
          break;
        case "Hospital":
          closeHospitalModal();
          break;
        case "OccupationalHealthcare":
          closeOccupationalHealthcareModal();
          break;
        default:
          break;
      }
      const updatedPatient = {...patient, entries: patient.entries.concat(newEntry)}
      dispatch(setPatient(updatedPatient));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (patient && patient.id === id) {
        return
      }
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
    fetchPatient();
  }, [patient, id, dispatch])

  if (!patient) {
    return null
  }

  let gender: string = 'genderless'
  if (patient.gender === 'male') {
    gender = 'mars'
  } else if (patient.gender === 'female') {
    gender = 'venus'
  }

  return (
    <Container>
      <h3>
        {patient.name}
        <Icon className={gender} />
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <PatientEntries entries={patient.entries}/>
      <Divider hidden/>
      <AddHealthCheckEntryModal
        modalOpen={healthCheckModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHealthCheckModal}
      />
      <AddHospitalEntryModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHospitalModal}
      />
      <AddOccupationalHealthcareEntryModal
        modalOpen={occupationalHealthcareModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeOccupationalHealthcareModal}
      />
      <Button onClick={() => openHealthCheckModal()}>Add new Health Check entry</Button>
      <Button onClick={() => openHospitalModal()}>Add new Hospital entry</Button>
      <Button onClick={() => openOccupationalHealthcareModal()}>Add new Occupational Healthcare entry</Button>
    </Container>
  );
};

export default PatientPage;
