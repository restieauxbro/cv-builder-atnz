import { Button } from "@material-ui/core";
import React, { useState } from "react";
import MagicLink from "./magicLink";
import { supabase } from "../providers/AuthProvider";

const SideBarSaveOptions = () => {
  const [magicLinkScreen, setMagicLinkScreen] = useState(false);
  return (
    <>
      {magicLinkScreen ? (
        <MagicLink />
      ) : (
        <Options setMagicLinkScreen={setMagicLinkScreen} />
      )}
    </>
  );
};

export default SideBarSaveOptions;

const Options = ({ setMagicLinkScreen }) => {
  async function signInWithFacebook() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "facebook",
    });
  }
  return (
    <>
      <h3>Login to save</h3>
      <div className="button-cnt">
        <Button
          variant="contained"
          fullWidth
          onClick={() => setMagicLinkScreen(true)}
        >
          Login with email
        </Button>
      </div>
      <div className="button-cnt">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => signInWithFacebook()}
        >
          Login with Facebook
        </Button>
      </div>
    </>
  );
};
