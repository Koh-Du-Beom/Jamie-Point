import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './Calender.module.css';
import ActivityType from "../../types/ActivityType.type";

interface CalendarProps {
	activitiesData : ActivityType;
	onActivityChange: (activityId: string, updatedActivity: ActivityType) => void;
	id : string;
}

const Calendar: React.FC<CalendarProps> = ({ activitiesData ,onActivityChange, id }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

	const handleStartDate = (date : Date) => {
		setStartDate(date);
		const parsedDate = date.toISOString().split('T')[0];
		const updatedActivity : ActivityType = {
			...activitiesData,
			date : parsedDate,
		};
		onActivityChange(id, updatedActivity);
	}

	useEffect(()=>{
		if(activitiesData.date){
			const parsedDate = new Date(activitiesData.date);
			setStartDate(parsedDate);
		}
	}, [activitiesData]);

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleStartDate} 
        dateFormat='yyyy.MM.dd'
				formatWeekDay={nameOfDay => nameOfDay.substring(0, 3)}
        maxDate={new Date()}
				calendarClassName={classes.calenderWrapper}
				dayClassName={(d) => (d.getDate() === startDate!.getDate() ? classes.selectedDay : classes.unselectedDay)}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={classes.customHeaderContainer}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={classes.monthButton}>
              {"<"}
            </button>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(parseInt(value))}
							className={classes.year}
						>
              {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>

            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(parseInt(value))}
							className={classes.month}
						>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={classes.monthButton}>
              {">"}
            </button>
          </div>
        )}
      />
    </>
  );
};

export default Calendar;
