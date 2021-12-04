import React from "react";
import { Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SubjectIcon from "@mui/icons-material/Subject";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";
import FormEditSection from "./Sections/FormEditSection.js";

import { useAuth } from "components/AuthProvider/AuthProvider.js";
import { useQuery } from "react-query";
import axios from "axios";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function EditAJob(props) {
  const jobId = props.match.params.jobId;
  const classes = useStyles();
  const { state } = useAuth();
  const { ...rest } = props;

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
          <FormEditSection
            jobId={jobId}
            name="Reach the largest remote community"
          />
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
    />
  );
}
