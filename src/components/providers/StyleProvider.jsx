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

const UpdateStyle = createContext(); //for MUI theme
const Layout = createContext(); // for reading layout state only. Actual layout effects come from the div with classname {layout}
const LayoutChanger = createContext(); // for page layout
const Brand = createContext();

const StyleProvider = ({ children }) => {
  const [style, updateStyle] = useState(atnzTheme); // MUI
  const [layout, changeLayout] = useState({
    appLayout: "",
    CVLayout: "",
  }); // Object for app layout and cv page layout

  useEffect(() => {
    if (window.location.href.indexOf("competenz") > -1) {
      updateStyle(competenzTheme);
    }
    document.body.classList.add(style.themeName);
  }, []);

  useEffect(() => {
    document.body.style.cssText = "position: fixed; padding-right: 1rem";
    if (layout.appLayout !== "layout-large-left") {
      setTimeout(function () {
        document.body.style.cssText = "";
      }, 800);
    }
  }, [layout.appLayout]); // make cv un-interractive when the side menu is open

  return (
    <ThemeProvider theme={style}>
      <Brand.Provider value={style.themeName}>
        <UpdateStyle.Provider value={updateStyle}>
          <Layout.Provider value={layout}>
            <LayoutChanger.Provider value={changeLayout}>
              <div className={layout.appLayout}>{children}</div>
            </LayoutChanger.Provider>
          </Layout.Provider>
        </UpdateStyle.Provider>
      </Brand.Provider>
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

export function useBrand() {
  return useContext(Brand);
}
