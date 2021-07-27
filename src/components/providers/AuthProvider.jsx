import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Session = createContext();

async function upsertUserToProfiles() {
  try {
    const user = supabase.auth.user();

    const updates = {
      id: user.id,
      email: user.email,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error.message);
  }
}


const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    session && upsertUserToProfiles(); // upserts user to database on every page load
  }, []);

  return (
    <>
      <Session.Provider value={session}>{children}</Session.Provider>
    </>
  );
};
export default AuthProvider;

export function useSession() {
  return useContext(Session);
}
