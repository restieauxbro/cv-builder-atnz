import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import CvUi from "./components/cv-ui";
import Sidebar from "./components/sidebar";
import MomentUtils from "@date-io/moment";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7ecbe8",
      main: "#6EBCD9",
      dark: "#074B64",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "Poppins",
    color: "rgb(46,46,46)",
    fontWeightRegular: 400,
    fontSize: "14px",
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className="cv-builder-columns">
            <Sidebar />
            <CvUi />
          </div>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
