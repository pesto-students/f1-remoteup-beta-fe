import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
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

// @material-ui/core
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";

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

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";
import { useAuth } from "components/AuthProvider/AuthProvider.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyle);

function Status(props) {
  const [edit, setEdit] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [status, setStatus] = React.useState(props.status);
  const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // useEffect(() => {
  //   console.log("DOne");
  // }, [open]);

  const handleSuccess = () => {
    enqueueSnackbar("The status have been changed.", { variant: "success" });
    setEdit(false);
    setStatus(inputText);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return edit ? (
    <>
      <CustomInput
        inputProps={{
          id: "status",
          ref: { inputText },
          name: "status",
          style: { width: "70px" },
          onChange: (e) => setInputText(e.target.value),
          // onBlur: formik.handleBlur,
          // placeholder:
          //   "e.g. React Engineer, Lead Developer, Marketing Manager..",
          // value: formik.values.position,
          // error: formik.touched.position && Boolean(formik.errors.position),
        }}
        id="status"
        formControlProps={{
          fullWidth: false,
          style: { paddingTop: "5px", margin: "0px" },
        }}
      />
      <Button
        style={{ marginLeft: "10px" }}
        justIcon
        size="sm"
        color="success"
        onClick={handleSuccess}
      >
        <Done />
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
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const { state } = useAuth();
  const { ...rest } = props;
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
            justify="start"
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
                Senior React Engineer
              </h3>
              <h5 className="roboto-slab">
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
              </h5>
            </GridItem>
            <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem
              xs={8}
              sm={8}
              md={8}
              lg={8}
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
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={8} sm={8} md={8} lg={8}>
              <Table
                tableHead={[
                  "#",
                  "Name",
                  "Email",
                  "Phone",
                  "Exp.(Yrs.)",
                  "Status",
                ]}
                tableData={[
                  [
                    "1",
                    "Andrew Mike",
                    "andrew@gmail.com",
                    "+1122199021910",
                    "5",
                    <Status status="Submitted" />,
                  ],
                  [
                    "2",
                    "John Doe",
                    "john@gmail.com",
                    "+912768731267",
                    "3",
                    <Status status="Submitted" />,
                  ],
                  [
                    "3",
                    "Alex Mike",
                    "alex@gmail.com",
                    "+128301239023",
                    "2",
                    <Status status="Submitted" />,
                  ],
                ]}
                customCellClasses={[
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                ]}
                customClassesForCells={[0, 1, 2, 3, 4]}
                customHeadCellClasses={[
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                  tableClasses.textCenter,
                ]}
                customHeadClassesForCells={[0, 1, 2, 3, 4]}
              />
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
          </GridContainer>
        </div>
      </div>
      <RFooter />
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
