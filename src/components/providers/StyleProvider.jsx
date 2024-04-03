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
      dark: "#1A89B7",
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
  // Check if the operating system is macOS
  const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Only adjust padding if not on macOS
  if (!isMacOS) {
    document.body.style.cssText = "position: fixed; padding-right: 1rem";
    if (layout.appLayout !== "layout-large-left") {
      setTimeout(function () {
        document.body.style.cssText = "";
      }, 500);
    }
  } else {
    // If on macOS and the specific layout is active, clear any inline styles that might have been set
    if (layout.appLayout !== "layout-large-left") {
      document.body.style.cssText = "";
    }
  }
}, [layout.appLayout]); // Dependency array ensures this effect runs only when layout.appLayout changes


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
