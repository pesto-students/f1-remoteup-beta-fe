import React from "react";
import { Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SubjectIcon from "@mui/icons-material/Subject";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Done from "@material-ui/icons/CheckCircleOutlineRounded";
import CheckCircle from "@material-ui/icons/CheckCircleOutlineRounded";

// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

// core components
import Header from "components/Header/Header.js";
import RFooter from "components/Footer/RFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import image from "assets/img/faces/avatar.jpg";

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";

import { useAuth } from "components/AuthProvider/AuthProvider.js";

const dashboardRoutes = [];

const cardStyles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(cardStyles);
const useTypoStyles = makeStyles(typoStyles);

export default function Jobs(props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const typoClasses = useTypoStyles();
  const { state } = useAuth();
  const { ...rest } = props;
  console.log(state.isAuthenticated);
  return state.isAuthenticated && state.role === "Jobseeker" ? (
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
        <div className={classes.container} style={{ minHeight: "700px" }}>
          {/* <ProductSection />
          <TeamSection /> */}
          {/* <WorkSection name="Applied/Saved Jobs..." /> */}
          <GridContainer
            style={{ color: "#3c4858", paddingTop: "90px" }}
            justify="center"
            alignItems="center"
          >
            <GridItem xs={12} sm={12} md={9} lg={9}>
              <NavPills
                alignCenter
                color="info"
                tabs={[
                  {
                    tabButton: "Saved Jobs",
                    tabIcon: BookmarkBorder,
                    tabContent: (
                      <Card>
                        <CardBody>
                          <GridContainer
                            justify="start"
                            alignItems="center"
                            className="roboto-slab"
                            style={{ color: "#3c4858" }}
                          >
                            <GridItem
                              xs={2}
                              sm={2}
                              md={2}
                              style={{ paddingLeft: "0px" }}
                            >
                              <img
                                src={image}
                                alt="..."
                                className={
                                  typoClasses.imgRaised +
                                  " " +
                                  typoClasses.imgRoundedCircle +
                                  " " +
                                  typoClasses.imgFluid
                                }
                              />
                            </GridItem>
                            <GridItem
                              xs={8}
                              sm={8}
                              md={8}
                              style={{ paddingLeft: "0px" }}
                            >
                              <span
                                style={{ fontSize: "13px", fontWeight: 600 }}
                              >
                                Podsights
                              </span>
                              <br />
                              <span
                                style={{ fontSize: "18px", fontWeight: "700" }}
                              >
                                React Engineer
                              </span>
                              <br />
                              <span
                                style={{ fontSize: "13px", fontWeight: 500 }}
                              >
                                Software Development | Internship | Anywhere in
                                the world
                              </span>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={2}>
                              <span
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                Oct 13
                              </span>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    ),
                  },
                  {
                    tabButton: "Applied Jobs",
                    tabIcon: Done,
                    tabContent: (
                      <Card>
                        <CardBody>
                          <GridContainer
                            justify="start"
                            alignItems="center"
                            className="roboto-slab"
                            style={{ color: "#3c4858" }}
                          >
                            <GridItem
                              xs={2}
                              sm={2}
                              md={2}
                              style={{ paddingLeft: "0px" }}
                            >
                              <img
                                src={image}
                                alt="..."
                                className={
                                  typoClasses.imgRaised +
                                  " " +
                                  typoClasses.imgRoundedCircle +
                                  " " +
                                  typoClasses.imgFluid
                                }
                              />
                            </GridItem>
                            <GridItem
                              xs={7}
                              sm={7}
                              md={7}
                              style={{ paddingLeft: "0px" }}
                            >
                              <span
                                style={{ fontSize: "13px", fontWeight: 600 }}
                              >
                                Podsights
                              </span>
                              <br />
                              <span
                                style={{ fontSize: "18px", fontWeight: "700" }}
                              >
                                React Engineer
                              </span>
                              <br />
                              <span
                                style={{ fontSize: "13px", fontWeight: 500 }}
                              >
                                Software Development | Internship | Anywhere in
                                the world
                              </span>
                            </GridItem>
                            <GridItem
                              xs={3}
                              sm={3}
                              md={3}
                              style={{ textAlign: "center" }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                STATUS
                              </span>
                              <br />
                              <span
                                style={{ fontSize: "12px", fontWeight: 600 }}
                              >
                                Technical Interview
                              </span>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <RFooter />
    </div>
  ) : (
    <Redirect to="/" from="/" push exact strict />
  );
}
