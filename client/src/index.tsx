import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
  faCheckCircle,
  faBars,
  faHome,
  faPlus,
  faSearch,
  faBell,
  faBook,
  faCalendarWeek,
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import UrqlProvider from "./providers/UrqlProvider";
import Router from "./Router";
import "./index.css";

// fontawesome
library.add(
  faCaretDown,
  faCaretUp,
  faInfoCircle,
  faCheckCircle,
  faBars,
  faHome,
  faPlus,
  faSearch,
  faBell,
  faBook,
  faCalendarWeek,
  faChevronLeft,
  faChevronDown
);

ReactDOM.render(
  <UrqlProvider>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </UrqlProvider>,
  document.getElementById("root")
);
