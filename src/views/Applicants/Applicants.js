import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import SubjectIcon from "@mui/icons-material/Subject";
import World from "@material-ui/icons/Public";
import Bookmark from "@material-ui/icons/Bookmark";
import Category from "@material-ui/icons/Category";
import Schedule from "@material-ui/icons/Schedule";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
import AttachFile from "@mui/icons-material/AttachFile";
import Notes from "@material-ui/icons/Notes";

import Money from "assets/img/cash-outline.svg";
import Earth from "assets/img/earth.svg";

import { useSnackbar } from "notistack";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Table from "components/Table/Table.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Loading from "components/Loading/Loading.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import tableStyle from "assets/jss/material-kit-react/contentAreas";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import customSelectStyle from "assets/jss/material-kit-react/customSelectStyle";

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";
import { useAuth, checkJWT } from "components/AuthProvider/AuthProvider.js";
import { useQuery, useQueries, useMutation } from "react-query";

import moment from "moment";

const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyle);
const useModalStyles = makeStyles(modalStyle);
const useSelectStyles = makeStyles(customSelectStyle);

const dashboardRoutes = [];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function NoteModal(props) {
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const selectClasses = useSelectStyles();
  // const inputText = useRef(props.note);
  const [inputText, setInputText] = React.useState(props.note);
  const [newValue, setNewValue] = React.useState(props.note);
  const { state } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const mutationNote = useMutation(
    (newNote) =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/recruiter/applicants/updatenote/${props.id}`,
        {
          method: "PATCH",
          headers: new Headers({
            Authorization: `Bearer ${state.accessToken}`,
            "Content-Type": "application/json",
          }),
          body: newNote,
        }
      ).then((res) => res.json()),
    {
      onSuccess: (result, variables, context) => {
        // alert(JSON.stringify(result, null, 2));
        // Success notification
        setModal(false);
        enqueueSnackbar("Note Saved", {
          variant: "success",
        });
        setNewValue(inputText);
        // alert(noteValue);
      },
      onError: (error, veriaables, context) => alert(error),
    }
  );

  const processSave = () => {
    mutationNote.mutate(JSON.stringify({ note: inputText }, null, 2));
  };

  return (
    <>
      <Button justIcon size="sm" color="info" onClick={() => setModal(true)}>
        <Notes />
      </Button>
      <Dialog
        classes={{
          root: modalClasses.center,
          paper: modalClasses.modal,
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={modalClasses.modalHeader}
        >
          <IconButton
            className={modalClasses.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={modalClasses.modalClose} />
          </IconButton>
          <h4 className={modalClasses.modalTitle}>Relevant Notes</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={modalClasses.modalBody}
        >
          <CustomInput
            id="notes"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              placeholder: "Write candidate's notes here..",
              multiline: true,
              rows: 7,
              value: inputText,
              onChange: (e) => setInputText(e.target.value),
            }}
          />
        </DialogContent>
        <DialogActions
          className={
            modalClasses.modalFooter + " " + modalClasses.modalFooterCenter
          }
        >
          <Button
            disabled={inputText === newValue}
            onClick={processSave}
            color="success"
          >
            <Done />
            <span className="right-link">Save</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function openBase64NewTab(base64Pdf) {
  var blob = base64toBlob(base64Pdf);
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
  } else {
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  }
}

function base64toBlob(base64Data) {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: "application/pdf" });
}

function Status(props) {
  const [edit, setEdit] = React.useState(false);
  const [selectStatus, setSelectStatus] = React.useState(props.status);
  const [status, setStatus] = React.useState(props.status);
  const { enqueueSnackbar } = useSnackbar();
  const selectClasses = useSelectStyles();
  const { state } = useAuth();

  const handleSelect = (event) => {
    setSelectStatus(event.target.value);
  };

  const mutationStatus = useMutation(
    (newStatus) =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/recruiter/applicants/updateappstatus/${props.id}`,
        {
          method: "PATCH",
          headers: new Headers({
            Authorization: `Bearer ${state.accessToken}`,
            "Content-Type": "application/json",
          }),
          body: newStatus,
        }
      ).then((res) => res.json()),
    {
      onSuccess: (result, variables, context) => {
        // Success notification
        // alert(result);
        enqueueSnackbar("The status have been changed.", {
          variant: "success",
        });
        setEdit(false);
        setStatus(selectStatus);
      },
      onError: (error, variables, context) => alert(error),
    }
  );

  // const handleSuccess = () => {
  //   enqueueSnackbar("The status have been changed.", { variant: "success" });
  //   setEdit(false);
  //   setStatus(selectStatus);
  // };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  return edit ? (
    <>
      <FormControl className={selectClasses.selectFormControlStatus}>
        <InputLabel
          htmlFor="simple-select"
          className={selectClasses.selectLabel}
        ></InputLabel>
        <Select
          MenuProps={{
            className: selectClasses.selectMenu,
          }}
          classes={{
            select: selectClasses.select,
          }}
          value={selectStatus}
          onChange={handleSelect}
          inputProps={{
            name: "selectStatus",
            id: "select-status",
          }}
        >
          <MenuItem
            disabled
            classes={{
              root: selectClasses.selectMenuItem,
            }}
          >
            Select Status
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Applied"
          >
            Applied
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Technical Test"
          >
            Technical Test
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Technical Interview"
          >
            Technical Interview
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Final Interview"
          >
            Final Interview
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Rejected"
          >
            Rejected
          </MenuItem>
          <MenuItem
            classes={{
              root: selectClasses.selectMenuItem,
              selected: selectClasses.selectMenuItemSelected,
            }}
            value="Selected"
          >
            Selected
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={selectStatus === status}
        style={{ marginLeft: "3px" }}
        justIcon
        size="sm"
        color="success"
        onClick={() => {
          let obj = JSON.stringify({ status: selectStatus }, null, 2);
          mutationStatus.mutate(obj);
        }}
      >
        <Done />
      </Button>
      <Button
        style={{ marginLeft: "1px" }}
        justIcon
        size="sm"
        color="danger"
        onClick={handleClose}
      >
        <Close />
      </Button>
    </>
  ) : (
    <>
      {status}
      <Button
        style={{ marginLeft: "10px" }}
        justIcon
        size="sm"
        color="info"
        onClick={handleEdit}
      >
        <Edit />
      </Button>
    </>
  );
}

export default function Applicants(props) {
  const jobId = props.match.params.jobId;
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const { state, dispatch, setProfile } = useAuth();
  const { ...rest } = props;

  checkJWT(dispatch, setProfile);

  const queries = useQueries([
    {
      queryKey: `job-${jobId}`,
      queryFn: () => {
        return fetch(
          `${process.env.REACT_APP_SERVER_URL}/public/job/viewjob/${jobId}`
        ).then((res) => res.json());
      },
    },
    {
      queryKey: `applicants-${jobId}`,
      queryFn: () => {
        return fetch(
          `${process.env.REACT_APP_SERVER_URL}/recruiter/applicants/viewapplications/${jobId}`,
          {
            headers: new Headers({
              Authorization: `Bearer ${state.accessToken}`,
            }),
          }
        ).then((res) => res.json());
      },
      enabled: new Date().getTime() < localStorage.expiresAt,
    },
  ]);
  const [job, app] = queries;
  // const app = queries[1];

  const fillButtons = [
    // { color: "info", icon: Person },
    { color: "info", icon: Edit },
    // { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <>
        Submitted
        <Button
          style={{ marginLeft: "10px" }}
          justIcon
          size="sm"
          color={prop.color}
          key={key}
        >
          <prop.icon />
        </Button>
      </>
    );
  });

  if (
    job.isLoading ||
    app.isLoading ||
    app.isIdle ||
    app.data.payload.applications === undefined
  ) {
    return <Loading />;
  }

  if (job.error) {
    return "An error occured " + error.message;
  }

  // if (app.isLoading) {
  //   return "...isAppLoading";
  // }

  if (app.error) {
    return "An error occured " + appError.message;
  }
  const apps = [];

  app.data.payload.applications.map((app, index) =>
    apps.push([
      index + 1,
      app.fullName,
      app.email,
      app.phone,
      app.exp,
      moment(app.createdAt).format("MMM") +
        " " +
        moment(app.createdAt).format("DD") +
        ", " +
        moment(app.createdAt).format("YYYY"),
      <Button
        style={{ marginLeft: "10px" }}
        justIcon
        size="sm"
        color="info"
        onClick={() => openBase64NewTab(app.resume.split(",")[1])}
      >
        <AttachFile />
      </Button>,
      <>
        <Status id={app._id} status={app.applicationStatus} />
        <NoteModal
          note
          setNote
          id={app._id}
          name={app.fullName}
          note={app.note}
        />
      </>,
    ])
  );

  return state.isAuthenticated && state.role === "Recruiter" ? (
    <div>
      <Header
        color="info"
        routes={dashboardRoutes}
        brand="RemoteUp"
        rightLinks={<HeaderLinks />}
        fixed
        // changeColorOnScroll={{
        //   height: 400,
        //   color: "info",
        // }}
        {...rest}
      />
      <div className={classNames(classes.mainDiv)}>
        <div className={classes.container} style={{ minHeight: "900px" }}>
          {/* <ProductSection />
          <TeamSection /> */}
          {/* <WorkSection name="Applicants..." /> */}
          <GridContainer
            style={{
              color: "#3C4858",
              paddingTop: "100px",
              paddingBottom: "130px",
            }}
            justify="center"
            alignItems="center"
          >
            <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
            {/* <GridItem xs={2} sm={2} md={2} lg={2}></GridItem> */}
            <GridItem
              xs={6}
              sm={6}
              md={6}
              lg={6}
              style={{ marginTop: "18px", textAlign: "center" }}
            >
              <h3
                style={{
                  marginLeft: "0px",
                  fontSize: "1.5625rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                {job.data.payload.jobData.position}
              </h3>
              <h5 className="roboto-slab">
                <Category style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {job.data.payload.jobData.category} &nbsp;&nbsp;{" "}
                </span>
                <Schedule style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {job.data.payload.jobData.jobType}
                </span>
              </h5>
              <h5 className="roboto-slab">
                <img
                  src={Earth}
                  style={{
                    height: "24px",
                    width: "24px",
                    filter:
                      "invert(29%) sepia(15%) saturate(700%) hue-rotate(174deg) brightness(91%) contrast(97%)",
                  }}
                />
                {/* <World style={{ verticalAlign: "middle" }} /> */}
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {job.data.payload.jobData.candidateRegion ||
                    "Anywhere in the world"}
                </span>
                &nbsp;&nbsp;{" "}
                {job.data.payload.jobData.salary && (
                  <>
                    <img
                      src={Money}
                      style={{
                        height: "24px",
                        width: "24px",
                        filter:
                          "invert(29%) sepia(15%) saturate(700%) hue-rotate(174deg) brightness(91%) contrast(97%)",
                      }}
                    />
                    <span style={{ verticalAlign: "middle" }}>
                      {" "}
                      {job.data.payload.jobData.salary}
                    </span>
                  </>
                )}
              </h5>
            </GridItem>
            <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
            {/* <GridItem xs={1} sm={1} md={1} lg={1}></GridItem> */}
            {apps.length > 0 && (
              <GridItem
                xs={11}
                sm={11}
                md={11}
                lg={11}
                style={{ marginTop: "18px", textAlign: "left" }}
              >
                <h3
                  className="roboto-slab"
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "700",
                    paddingTop: "0px",
                  }}
                >
                  Applicants
                </h3>
              </GridItem>
            )}
            {/* <GridItem xs={1} sm={1} md={1} lg={1}></GridItem> */}
            {/* <GridItem xs={1} sm={1} md={1} lg={1}></GridItem> */}
            {apps.length === 0 && (
              <GridItem
                xs={11}
                sm={11}
                md={11}
                lg={11}
                style={{ marginTop: "70px", textAlign: "center" }}
              >
                <h3
                  className="roboto-slab"
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "700",
                    paddingTop: "0px",
                  }}
                >
                  No application received yet
                </h3>
              </GridItem>
            )}
            <GridItem xs={11} sm={11} md={11} lg={11}>
              {apps.length > 0 && (
                <Table
                  tableHead={[
                    "#",
                    "Name",
                    "Email",
                    "Phone",
                    "Exp.(Yrs.)",
                    "Submitted",
                    "Resume",
                    "Status / Notes",
                  ]}
                  tableData={apps}
                  customCellClasses={[
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                  ]}
                  customClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                  customHeadCellClasses={[
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                    tableClasses.textCenter,
                  ]}
                  customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                />
              )}
            </GridItem>
            {/* <GridItem xs={1} sm={1} md={1} lg={1}></GridItem> */}
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location },
      }}
      from="/dashboard"
    />
  );
}
