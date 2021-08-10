import { Button, TextField } from "@material-ui/core";
import React from "react";
import SideBarSaveOptions from "../components/loginFlow/sidebarSaveOptions";
import { useSession } from "../components/providers/AuthProvider";

const DeleteUser = () => {
  const session = useSession();
  return (
    <>
      <div className="supercenter">
        <div
          className="centered-cnt"
          style={{ maxWidth: 400, padding: "2rem" }}
        >
          <h1>It's a shame you're leaving!</h1>
          <p>
            We'll delete your account within 5 working days if you confirm
            that's what you want to do.
          </p>
          {session ? (
            <DeleteYourself />
          ) : (
            <>
              <h3>First, login to your account</h3>
              <SideBarSaveOptions />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteUser;

const DeleteYourself = () => {
  return (
    <>
      <div className="button-cnt" style={{ marginTop: "3rem" }}>
        <Button variant="contained" color="secondary">
          Delete your account
        </Button>
      </div>
    </>
  );
};
