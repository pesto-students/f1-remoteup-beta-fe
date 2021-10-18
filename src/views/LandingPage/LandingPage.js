import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SubjectIcon from "@mui/icons-material/Subject";

// core components
import Header from "components/Header/Header.js";
import RFooter from "components/Footer/RFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import JobsSection from "./Sections/JobsSection.js";

import { useAuth } from "components/AuthProvider/AuthProvider.js";
import { lockRE } from "components/AuthProvider/lockRE.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const { state } = useAuth();
  console.log(state);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="RemoteUp"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "info",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/bg12.jpg").default}>
        <div className={classes.container}>
          <GridContainer justify="center" align="center">
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>
                Remote work is the future of work.
              </h1>
              <GridItem xs={8} sm={8} md={8}>
                <h4>
                  Join largest remote work community in the world.
                  <br /> RemoteUp is the the number one destination to find and
                  list incredible remote jobs.
                </h4>
              </GridItem>
              <br />
              {state.isAuthenticated ? (
                state.role === "Recruiter" ? (
                  <Button
                    round
                    color="info"
                    size="lg"
                    // onClick={() => lockRE.show()}
                    href="/post-a-job"
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SubjectIcon />
                    <span className="post-a-job">Post a Job</span>
                  </Button>
                ) : (
                  ""
                )
              ) : (
                <Button
                  round
                  color="info"
                  size="lg"
                  onClick={() => lockRE.show()}
                  // href="/post-a-job"
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  <SubjectIcon />
                  <span className="post-a-job">Post a Job</span>
                </Button>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <JobsSection name="Jobs coming soon..." />
          {/* <ProductSection /> */}
          {/* <TeamSection /> */}
        </div>
      </div>
      <RFooter />
    </div>
  );
}
