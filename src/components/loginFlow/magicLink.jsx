import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { supabase } from "../providers/AuthProvider";
import DoneIcon from "@material-ui/icons/Done";
import { useCVData } from "../providers/CVDataProvider";

const MagicLink = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(useCVData().personalDetails.email);
  const [sent, setSent] = useState(false);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      else setSent(true);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h3>We'll send you a login link</h3>
      {sent && (
        <p>
          We've emailed you a link 🙌 Make sure to check your junk if it's not
          in your inbox.
          <br />
          <br />
        </p>
      )}
      <div className="login-form-cnt">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <div className="button-cnt">
          <Button
            variant="contained"
            color="primary"
            endIcon={
              loading ? (
                <CircularProgress color="white" size={18} />
              ) : sent ? (
                <DoneIcon />
              ) : (
                ""
              )
            }
            onClick={() => handleLogin(email)}
          >
            {sent ? "Link sent" : "Send link"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MagicLink;
