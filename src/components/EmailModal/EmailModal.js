import React, { useEffect } from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import { useAuth } from "components/AuthProvider/AuthProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

export default function EmailModal() {
  const [modal, setModal] = React.useState(true);

  const { dispatch, profile } = useAuth();

  const classes = useStyles();
  const modalClose = () => {
    setModal(false);
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      {/* <div>
        <Button color="rose" round onClick={() => setModal(true)}>
          Modal
        </Button>
      </div> */}

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => modalClose()}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => modalClose()}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle + " roboto-slab"}>Verify Email</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <h5 className="roboto-slab">
            Please check your inbox to verify email & Log In again. Thank you!
          </h5>
        </DialogContent>
        {/* <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => modalCllose()}>Never Mind</Button>
          <Button onClick={() => modalCllose()} color="success">
            Yes
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
