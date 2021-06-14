import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const atnzTheme = createMuiTheme({
  themeName: "ATNZ",
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
    fontSize: 14,
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
});

const competenzTheme = createMuiTheme({
  themeName: "Competenz",
  palette: {
    primary: {
      light: "#7ecbe8",
      main: "#21A3D9",
      dark: "#121773",
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
    fontFamily: "Helvetica",
    color: "rgb(46,46,46)",
    fontWeightRegular: 400,
    fontSize: 14,
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
});

const UpdateStyle = createContext(); //for MUI theme
const Layout = createContext(); // for reading layout state only. Actual layout effects come from the div with classname {layout}
const LayoutChanger = createContext(); // for page layout

const StyleProvider = ({ children }) => {
  const [style, updateStyle] = useState(atnzTheme); // MUI
  const [layout, changeLayout] = useState({
    appLayout: "",
    CVLayout: "",
  }); // Object for app layout and cv page layout

  useEffect(() => {
    document.body.classList.add(style.themeName);
  }, []);

  return (
    <ThemeProvider theme={style}>
      <UpdateStyle.Provider value={updateStyle}>
        <Layout.Provider value={layout}>
          <LayoutChanger.Provider value={changeLayout}>
            <div className={layout.appLayout}>{children}</div>
          </LayoutChanger.Provider>
        </Layout.Provider>
      </UpdateStyle.Provider>
    </ThemeProvider>
  );
};

export default StyleProvider;

export function StyleTheme() {
  return useContext(UpdateStyle);
}
export function CurrentLayout() {
  return useContext(Layout);
}
export function ChangeLayout() {
  return useContext(LayoutChanger);
}