import { Button } from "@material-ui/core";
import React, { useState } from "react";
import MagicLink from "./magicLink";
import { supabase } from "../providers/AuthProvider";
import { EmailOutlined, Facebook } from "@material-ui/icons";
import { ReactComponent as GoogleSVG } from "../../assets/icons8-google.svg";
import { withStyles } from "@material-ui/styles";

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
      <div className="button-cnt">
        <Button
          disableElevation
          variant="contained"
          fullWidth
          startIcon={<EmailOutlined />}
          onClick={() => setMagicLinkScreen(true)}
        >
          Login with email
        </Button>
      </div>
      <div className="button-cnt">
        <FacebookButton
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          startIcon={<Facebook />}
          onClick={() => signInWithProvider("facebook")}
        >
          Login with Facebook
        </FacebookButton>
      </div>
      <div className="button-cnt">
        <GoogleButton
          disableElevation
          fullWidth
          color='primary'
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={() => signInWithProvider("google")}
        >
          Login with Google
        </GoogleButton>
      </div>
    </>
  );
};

const GoogleIcon = () => {
  return (
    <>
      <div className="icon-cnt white">
        <GoogleSVG />
      </div>
    </>
  );
};

const FacebookButton = withStyles({
  root: {
    background: "#4267B2",
  },
})(Button);

const GoogleButton = withStyles({
  root: {
    background: "#4285F4",
    border: "1px solid #dfdfdf",
  },
})(Button);
