import React from "react";
import { Redirect, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import Live from "assets/img/pulse-outline.svg";
import AppTray from "assets/img/file-tray-full-outline.svg";

// core components
import Header from "components/Header/Header.js";
import RFooter from "components/Footer/RFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Table from "components/Table/Table.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import tableStyle from "assets/jss/material-kit-react/contentAreas";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";
import { useAuth } from "components/AuthProvider/AuthProvider.js";
import { useQuery, useMutation } from "react-query";
import moment from "moment";
import { useSnackbar } from "notistack";
import { queryClient } from "app.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyle);
const useModalStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function DeleteModal(props) {
  const [modal, setModal] = React.useState(false);
  const modalClasses = useModalStyles();
  const [inputText, setInputText] = React.useState(props.note);
  const [newValue, setNewValue] = React.useState(props.note);
  const { state } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    () =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/recruiter/job/deletejob/${props.id}`,
        {
          method: "DELETE",
          headers: new Headers({
            Authorization: `Bearer ${state.accessToken}`,
            "Content-Type": "application/json",
          }),
        }
      ).then((res) => res.json()),
    {
      onSuccess: (result, variables, context) => {
        // Success notification
        setModal(false);
        enqueueSnackbar("Job Deleted", {
          variant: "success",
        });
        // Refetch dashboard query
        queryClient.invalidateQueries("dashboard");
      },
      onError: (error, veriaables, context) => alert(error),
    }
  );

  const processSave = () => {
    mutation.mutate();
  };

  return (
    <>
      <Button justIcon size="sm" color="danger" onClick={() => setModal(true)}>
        <Close />
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
            style={{ margin: "0px" }}
            className={modalClasses.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={modalClasses.modalClose} />
          </IconButton>
          <h4 className={modalClasses.modalTitle + " roboto-slab"}>
            Delete Job
          </h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={modalClasses.modalBody}
        >
          <h5 className="roboto-slab" style={{ fontSize: "0.9375rem" }}>
            {props.applyType === "ATS" &&
              "All applicants data will be deleted."}
            {props.applyType === "ATS" && <br />}
            Are you sure you want to delete the job?
          </h5>
        </DialogContent>
        <DialogActions
          className={
            modalClasses.modalFooter + " " + modalClasses.modalFooterCenter
          }
        >
          <Button color="info" onClick={() => setModal(false)}>
            <Close />
            <span className="right-link">Cancel</span>
          </Button>
          <Button onClick={() => mutation.mutate()} color="danger">
            <Done />
            <span className="right-link">Delete</span>
          </Button>
          {/* <Button
            disabled={inputText === newValue}
            onClick={processSave}
            color="success"
          >
            <Done />
            <span className="right-link">Save</span>
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

function Actions(props) {
  return (
    <>
      <Button
        component={Link}
        to={`/applicants/${props.id}`}
        justIcon
        size="sm"
        color="info"
      >
        <Person />
      </Button>
      <Button
        component={Link}
        to={`/edit/${props.id}`}
        justIcon
        size="sm"
        color="success"
      >
        <Edit />
      </Button>
      {/* <Button justIcon size="sm" color="danger">
        <Close />
      </Button> */}
    </>
  );
}

export default function Dashboard(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const { state } = useAuth();
  const { ...rest } = props;

  const { isLoading, error, data } = useQuery("dashboard", () =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/recruiter/job/viewjobs`, {
      headers: new Headers({
        Authorization: `Bearer ${state.accessToken}`,
      }),
    }).then((res) => res.json())
  );

  const jobs = [];

  const fillButtons = [
    { color: "info", icon: Person },
    { color: "success", icon: Edit },
    { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <Button justIcon size="sm" color={prop.color} key={key}>
        <prop.icon />
      </Button>
    );
  });

  if (isLoading) {
    return "...isLoading";
  }

  if (error) {
    return "An error occured " + error.message;
  }

  if (data) {
    data.payload.jobData.map((job, index) =>
      jobs.push([
        index + 1,
        job.position,
        job.category,
        job.jobType,
        moment(job.createdAt).format("MMM") +
          " " +
          moment(job.createdAt).format("DD"),
        job.planType,
        <>
          <Actions id={job._id} />
          <DeleteModal id={job._id} applyType={job.applyType} />
        </>,
      ])
    );
  } else {
    return "...isLoading";
  }

  if (props.location.search) {
    const params = new URLSearchParams(props.location.search);
    if (params.get("session_id")) {
      enqueueSnackbar("Job posted successfully", {
        variant: "success",
      });
      return <Redirect to="/dashboard" />;
    }
  }

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
        <div className={classes.container}>
          {/* <ProductSection />
          <TeamSection /> */}
          {/* <WorkSection name="Dashboard..." /> */}
          <GridContainer
            style={{
              color: "#3C4858",
              paddingTop: "100px",
              paddingBottom: "130px",
            }}
            justify="start"
            alignItems="center"
          >
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem
              xs={4}
              sm={4}
              md={4}
              lg={4}
              style={{ marginTop: "18px", textAlign: "center" }}
            >
              <h2
                style={{
                  marginLeft: "0px",
                  fontSize: "2.25rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                {data.payload.totalActiveJobs}
              </h2>
              <h3
                style={{
                  marginLeft: "0px",
                  fontSize: "1.5625rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                <img
                  src={Live}
                  style={{
                    width: "28px",
                    height: "28px",
                    filter:
                      "invert(29%) sepia(15%) saturate(700%) hue-rotate(174deg) brightness(91%) contrast(97%)",
                  }}
                />
                {"  "}
                Active {data.payload.totalActiveJobs > 1 ? "Jobs" : "Job"}
              </h3>
            </GridItem>
            <GridItem
              xs={4}
              sm={4}
              md={4}
              lg={4}
              style={{ marginTop: "18px", textAlign: "center" }}
            >
              <h2
                style={{
                  marginLeft: "0px",
                  fontSize: "2.25rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                {data.payload.totalApplication}
              </h2>
              <h3
                style={{
                  marginLeft: "0px",
                  fontSize: "1.5625rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                <img
                  src={AppTray}
                  style={{
                    width: "28px",
                    height: "28px",
                    filter:
                      "invert(29%) sepia(15%) saturate(700%) hue-rotate(174deg) brightness(91%) contrast(97%)",
                  }}
                />
                {"  "}
                {data.payload.totalApplication > 1
                  ? "Applications "
                  : "Application "}
                Received
              </h3>

              {/* <h5 className="roboto-slab">
                <Category style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  Software Development &nbsp;&nbsp;{" "}
                </span>
                <Schedule style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}> Full-Time</span>
              </h5>
              <h5 className="roboto-slab">
                <World style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  Anywhere in the world
                </span>
              </h5> */}
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={6} sm={6} md={6} lg={6}></GridItem>
            <GridItem
              xs={4}
              sm={4}
              md={4}
              lg={4}
              style={{
                marginTop: "-20px",
                textAlign: "center",
                verticalAlign: "top",
              }}
            >
              <h5 className="roboto-slab">(Last 30 Days)</h5>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={1} sm={1} md={1} lg={1}></GridItem>
            <GridItem
              xs={10}
              sm={10}
              md={10}
              lg={10}
              style={{ marginTop: "18px", textAlign: "left" }}
            >
              <h3
                className="roboto-slab"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "700",
                  marginTop: "100px",
                }}
              >
                Jobs Posted
              </h3>
            </GridItem>
            <GridItem xs={1} sm={1} md={1} lg={1}></GridItem>
            <GridItem xs={1} sm={1} md={1} lg={1}></GridItem>
            <GridItem xs={10} sm={10} md={10} lg={10}>
              <Table
                tableHead={[
                  "#",
                  "Job Position",
                  "Category",
                  "Job Type",
                  "Date",
                  "Plan Type",
                  "Actions",
                ]}
                tableData={jobs}
                tableHeaderColor="warning"
                hover
                customCellClasses={[tableClasses.textCenter]}
                customClassesForCells={[6]}
                customHeadCellClasses={[tableClasses.textCenter]}
                customHeadClassesForCells={[6]}
              />
            </GridItem>
            <GridItem xs={1} sm={1} md={1} lg={1}></GridItem>
          </GridContainer>
        </div>
      </div>
      <RFooter />
    </div>
  ) : (
    <Redirect to="/" from="/" push exact strict />
    // <Redirect
    //   to={{
    //     pathname: "/",
    //     state: { from: props.location },
    //   }}
    //   from="/dashboard"
    // />
  );
}
