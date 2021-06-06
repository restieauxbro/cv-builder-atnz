import React, { useState, createContext, useContext } from "react";

export const HelpSwitch = createContext();
export const HelpPermissionUpdate = createContext();

const HelpSwitchProvider = ({ children }) => {
  const [helpPermission, setHelpPermission] = useState(true);

  function toggleHelpPermission() {
    setHelpPermission(!helpPermission);
  }
  return (
    <HelpSwitch.Provider value={helpPermission}>
      <HelpPermissionUpdate.Provider value={toggleHelpPermission}>
        {children}
      </HelpPermissionUpdate.Provider>
    </HelpSwitch.Provider>
  );
};
export default HelpSwitchProvider;

export function useHelpPermission() {
    return useContext(HelpSwitch)
} // use this in any child to read the context

export function useHelpPermissionUpdate() {
    return useContext(HelpPermissionUpdate)
} // use this in any child to update the context