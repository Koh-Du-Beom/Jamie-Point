import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './Calender.module.css';

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <>
      <DatePicker 
        selected={startDate}
        onChange={(date) => setStartDate(date)} 
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
