import { Button } from "@material-ui/core";
import React, { useState } from "react";
import MagicLink from "./magicLink";
import { supabase } from "../providers/AuthProvider";
import { EmailOutlined, Facebook } from "@material-ui/icons";
import { ReactComponent as GoogleSVG } from "../../assets/GoogleLogo.svg";

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
  async function signInWithProvider(provider) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: provider,
    });
  }
  return (
    <>
      <h3>Login to save</h3>
      <div className="button-cnt">
        <Button
          disableElevation
          variant="contained"
          fullWidth
          startIcon={<EmailOutlined/>}
          onClick={() => setMagicLinkScreen(true)}
        >
          Login with email
        </Button>
      </div>
      <div className="button-cnt">
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          startIcon={<Facebook />}
          onClick={() => signInWithProvider("facebook")}
        >
          Login with Facebook
        </Button>
      </div>
      <div className="button-cnt">
        <Button
          disableElevation
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<GoogleSVG />}
          onClick={() => signInWithProvider("google")}
        >
          Login with Google
        </Button>
      </div>
    </>
  );
};
