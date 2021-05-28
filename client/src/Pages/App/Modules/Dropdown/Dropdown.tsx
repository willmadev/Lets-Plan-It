import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./dropdown.module.css";

interface DropdownProps {
  className: string;
  value: string;
}

export const Dropdown: FC<DropdownProps> = ({ className, value, children }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <div className={className}>
      <button
        className={styles.datePickerBtn}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropdownActive(!dropdownActive);
        }}
      >
        <p>{value}</p>
        {dropdownActive ? (
          <FontAwesomeIcon icon="caret-up" className={styles.dropdownIcon} />
        ) : (
          <FontAwesomeIcon icon="caret-down" className={styles.dropdownIcon} />
        )}
      </button>
      {dropdownActive ? (
        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      ) : null}
    </div>
  );
};
