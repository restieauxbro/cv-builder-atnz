import { Button, FormLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../providers/AuthProvider";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import { ExitToApp, Label } from "@material-ui/icons";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [boxChecked, setBoxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startedForm, setStartedForm] = useState(false);
  const [finishedForm, setFinishedForm] = useState(false);

  async function getAccountDetails() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`firstName, lastName, cvShared`)
        .single();
      if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setBoxChecked(data.cvShared);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function updateAccountDetails() {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        updated_at: new Date(),
        firstName: firstName,
        lastName: lastName,
        cvShared: boxChecked,
      };
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, {
          returning: "minimal",
        })
        .then(console.log("uploaded to db"))
        .then(() => {
          setFinishedForm(true);
          setStartedForm(false);
        });
    } catch (error) {
      console.log("updateAccount problem,", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAccountDetails();
  }, []);
  return (
    <>
      <div className="account-form">
        <div className="flex space-between">
          <h3>Account details</h3>
          <div className="buttons-cnt flex align-center">
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>

        <TextField
          style={{ marginTop: "1rem" }}
          label="First name"
          value={firstName || ""}
          onChange={(e) => {
            setFirstName(e.target.value);
            setStartedForm(true);
            setFinishedForm(false);
          }}
        />
        <TextField
          style={{ marginTop: "1rem" }}
          label="Last name"
          value={lastName || ""}
          onChange={(e) => {
            setLastName(e.target.value);
            setStartedForm(true);
            setFinishedForm(false);
          }}
        />
        <FormControlLabel
          className="button-cnt"
          control={<Checkbox name="shareCVCheckbox" color="primary" />}
          label="Share CV with recruiters"
          checked={boxChecked}
          onChange={(e) => {
            setBoxChecked(e.target.checked);
            setStartedForm(true);
            setFinishedForm(false);
          }}
        />

        <div className="button-cnt">
          {(finishedForm || startedForm) && (
            <Button
              disabled={startedForm ? false : true}
              endIcon={loading && <CircularProgress color="white" size={18} />}
              color={startedForm ? "primary" : ""}
              variant="contained"
              onClick={() => {
                if (!finishedForm) {
                  updateAccountDetails();
                }
              }}
            >
              {finishedForm ? "Saved" : "Save"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;

const LogoutButton = () => {
  async function logout() {
    let { error } = await supabase.auth.signOut();
  }
  return (
    <Button
      variant="outlined"
      endIcon={<ExitToApp />}
      disableElevation
      onClick={() => logout()}
    >
      Log out
    </Button>
  );
};
