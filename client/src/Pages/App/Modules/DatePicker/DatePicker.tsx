import React, { useEffect, useRef, useState } from "react";
import { format, add, set, getHours, getMinutes, sub } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { formatDate } from "../../../../helpers/formatDate";
import { Dropdown } from "../Dropdown";
import styles from "./datepicker.module.css";

interface TimePickerProps {
  date: Date;
  setDate: Function;
}

const TimePicker: React.FC<TimePickerProps> = ({ date, setDate }) => {
  const isNumber = (value: any): boolean => {
    const number = parseInt(value);
    return !isNaN(number) && String(value) === String(number);
  };

  const [cursorPosition, setCursorPosition] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.setSelectionRange(cursorPosition, cursorPosition);
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const oldValue = format(date, "hh:mm a");
    const inputValue = e.target.value;
    let cursorPosition = e.target.selectionEnd || 0;
    const isTyped = inputValue.length > oldValue.length;
    const cursorCharacter = inputValue[cursorPosition - 1];
    const addedCharacter = isTyped ? cursorCharacter : null;
    const replacedSingleCharacter =
      inputValue.length === oldValue.length
        ? oldValue[cursorPosition - 1]
        : null;
    const removedCharacter = isTyped
      ? null
      : replacedSingleCharacter
      ? null
      : oldValue[cursorPosition];
    const removedCharacterLength = oldValue.length - inputValue.length;
    let hours = parseInt(format(date, "h"));
    let minutes = parseInt(format(date, "m"));
    let period = format(date, "a");
    let newPosition = cursorPosition;
    isNumber(inputValue);

    if (addedCharacter !== null) {
      // added character
      if (cursorPosition === 3 || cursorPosition === 6) {
        // added character is at colon or space
        cursorPosition += 1;
        newPosition += 1;
      }
      if (cursorPosition < 3) {
        // hour
        if (isNumber(addedCharacter)) {
          const newHour = parseInt(
            inputValue.substring(0, cursorPosition - 1) +
              addedCharacter +
              inputValue.substring(cursorPosition + 1, 3)
          );

          if (0 <= newHour && newHour <= 12) {
            hours = newHour;
          }
        }
      } else if (3 <= cursorPosition && cursorPosition < 6) {
        // min
        if (isNumber(addedCharacter)) {
          const newMin = parseInt(
            inputValue.substring(3, cursorPosition - 1) +
              addedCharacter +
              inputValue.substring(cursorPosition + 1, 6)
          );

          if (0 <= newMin && newMin < 60) {
            minutes = newMin;
          }
        }
      } else if (6 <= cursorPosition) {
        // period
        if (!isNumber(addedCharacter)) {
          const newPeriod = (
            inputValue.substring(6, cursorPosition - 1) +
            addedCharacter +
            inputValue.substring(cursorPosition + 1, 9)
          ).toUpperCase();

          if (newPeriod === "AM" || newPeriod === "PM") {
            period = newPeriod;
          }
        }
      }
    } else if (replacedSingleCharacter !== null) {
      newPosition -= 1;
      if (cursorPosition < 3) {
        if (isNumber(replacedSingleCharacter)) {
          const newHour = parseInt(inputValue.substring(0, 3));
          if (0 <= newHour && newHour <= 12) {
            hours = newHour;
          }
        }
      } else if (3 <= cursorPosition && cursorPosition < 6) {
        if (isNumber(replacedSingleCharacter)) {
          const newMin = parseInt(inputValue.substring(3, 6));
          if (0 <= newMin && newMin < 60) {
            minutes = newMin;
          }
        }
      } else if (6 <= cursorPosition) {
        const newPeriod = inputValue.substring(6, 9).toUpperCase();
        if (newPeriod === "AM" || newPeriod === "PM") {
          period = newPeriod;
        }
      }
    } else if (removedCharacter !== null) {
      if (cursorPosition === 3 || cursorPosition === 6) {
        newPosition -= 1;
      }
      if (cursorPosition < 3 - removedCharacterLength) {
        let newHour =
          parseInt(
            inputValue.substring(0, cursorPosition) +
              "0" +
              inputValue.substring(cursorPosition, 2 - removedCharacterLength)
          ) | 0;

        if (newHour === 0) newHour = 1;

        if (0 <= newHour && newHour <= 12) {
          hours = newHour;
        }
      } else if (
        3 <= cursorPosition &&
        cursorPosition < 6 - removedCharacterLength
      ) {
        const newMin =
          parseInt(
            inputValue.substring(3, cursorPosition) +
              "0" +
              inputValue.substring(cursorPosition, 6 - removedCharacterLength)
          ) | 0;
        minutes = newMin;
      }
    } else if (6 <= cursorPosition) {
      const newPeriod = inputValue.substring(6).toUpperCase();
      if (newPeriod.includes("P")) {
        period = "PM";
      } else if (newPeriod.includes("A")) {
        period = "AM";
      }
    }
    let newDate = set(date, { hours: hours, minutes: minutes });
    // set period
    if (period === "PM" && getHours(newDate) !== 12) {
      newDate = add(newDate, { hours: 12 });
    }
    if (period === "AM" && getHours(newDate) === 12) {
      newDate = sub(newDate, { hours: 12 });
    }

    setDate(newDate);
    setCursorPosition(newPosition);
  };

  return (
    <div className={styles.timePicker}>
      <label>Time: </label>
      <input
        type="text"
        onChange={(e) => onInputChange(e)}
        value={format(date, "hh:mm aa")}
        ref={inputRef}
      />
    </div>
  );
};

// const Dropdown: React.FC<DropdownProps> = ({ date, setDate }) => {
//   return (
//     <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
//       <Calendar
//         className={styles.calendar}
//         returnValue="start"
//         calendarType="US"
//         onChange={(newDate) => {
//           setDate(
//             // @ts-ignore
//             set(newDate, { hours: getHours(date), minutes: getMinutes(date) })
//           );
//         }}
//         value={date}
//       />
//       <TimePicker setDate={setDate} date={date} />
//     </div>
//   );
// };

interface DatePickerProps {
  className: string;
  date: Date;
  onChange: Function;
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  date,
  onChange,
}) => {
  // const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      setDropdownActive(false);
    };

    if (dropdownActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [dropdownActive]);

  useEffect(() => {
    setFormattedDate(formatDate(date) || "error");
  }, [date]);

  return (
    <Dropdown className={className} value={formattedDate}>
      <Calendar
        className={styles.calendar}
        returnValue="start"
        calendarType="US"
        onChange={(newDate) => {
          setFormattedDate(
            // @ts-ignore
            set(newDate, { hours: getHours(date), minutes: getMinutes(date) })
          );
        }}
        value={date}
      />
      <TimePicker setDate={setFormattedDate} date={date} />
    </Dropdown>
  );
};
export default DatePicker;
