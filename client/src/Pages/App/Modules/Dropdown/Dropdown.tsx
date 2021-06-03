import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./dropdown.module.css";

interface DropdownProps {
  className?: string;
  value: string;
}

export const Dropdown: FC<DropdownProps> = ({ className, value, children }) => {
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
  return (
    <div className={className}>
      <button
        className={styles.dropdownBtn}
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
