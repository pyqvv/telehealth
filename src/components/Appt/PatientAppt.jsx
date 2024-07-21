import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList'
import ApptForm from './ApptForm'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import ApptDates from './ApptDates'
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/patientAppt.css'

const PatientAppt = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(-1);

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };

  useEffect(() => {
      fetch('/data/doctor.json')
          .then(response => response.json())
          .then(data => setDoctorData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="patientAppt">
      <div className='makeAppt'>
        <h2>진료 예약</h2>
        <DoctorList
          doctorData={doctorData}
          selectedDoctorIndex={selectedDoctorIndex}
          setSelectedDoctorIndex={setSelectedDoctorIndex}
        />
        <ApptForm
          doctorData={doctorData}
          selectedDoctorIndex={selectedDoctorIndex}
          setSelectedDoctorIndex={setSelectedDoctorIndex}
        />
      </div>
      <div className='calendar'>
        <h2>예약 조회</h2>
        <Calendar
            locale="en-US" // 일요일부터 시작
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
        />
        {selectedDate && (
          <ApptDates date={format(selectedDate, 'yyyy-MM-dd')} />
        )}
      </div>
    </div>
  );
};

export default PatientAppt;