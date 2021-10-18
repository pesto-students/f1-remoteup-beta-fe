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
import Done from "@material-ui/icons/DoneRounded";
import CheckCircle from "@material-ui/icons/CheckCircleOutlineRounded";
import World from "@material-ui/icons/Public";
import Bookmark from "@material-ui/icons/Bookmark";
import Category from "@material-ui/icons/Category";
import MailOutline from "@material-ui/icons/MailOutline";
import Mail from "@material-ui/icons/Mail";
import Send from "@material-ui/icons/Send";

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
import podsights from "../LandingPage/Sections/podsights.jpeg";

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

export default function JobDetails(props) {
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
        <div className={classes.container} style={{ minHeight: "900px" }}>
          {/* <ProductSection />
          <TeamSection /> */}
          {/* <WorkSection name="Applied/Saved Jobs..." /> */}
          <GridContainer
            style={{
              color: "#3C4858",
              paddingTop: "130px",
              paddingBottom: "130px",
            }}
            justify="start"
            alignItems="center"
          >
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={8} sm={8} md={8} lg={8} style={{ textAlign: "left" }}>
              <img
                style={{ height: "90px", width: "90px" }}
                src={podsights}
                alt="..."
                className={
                  typoClasses.imgRaised +
                  " " +
                  typoClasses.imgRoundedCircle +
                  " " +
                  typoClasses.imgFluid
                }
              />
              <span
                style={{
                  marginLeft: "15px",
                  fontSize: "1.27rem",
                  fontWeight: "700",
                }}
                className="roboto-slab"
              >
                Podsights
              </span>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem
              xs={6}
              sm={6}
              md={6}
              lg={6}
              style={{ marginTop: "18px", textAlign: "Left" }}
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
            <GridItem
              xs={2}
              sm={2}
              md={2}
              lg={2}
              style={{
                marginTop: "18px",
                textAlign: "right",
                verticalAlign: "middle !important",
              }}
            >
              <Button fullWidth color="info">
                <BookmarkBorder />
                <span className="right-link">Save</span>
              </Button>
              <Button fullWidth color="facebook">
                <MailOutline />
                <span className="right-link">Apply</span>
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={8} sm={8} md={8} lg={8}>
              <h4
                className="roboto-slab"
                style={{
                  fontSize: "1.27rem",
                  fontWeight: "700",
                  paddingTop: "30px",
                }}
              >
                Company Description
              </h4>
              <p className="roboto-slab" style={{ fontSize: "14px" }}>
                Podsights is a small, distributed organization seeking a Data
                Engineer to join our growing team! Here's a little about us, a
                little about what we believe, and what we are looking for.
                <br />
                <br />
                Podsights is an industry-leading attribution platform for
                podcast advertising. We likely work with some of your favorite
                brands and publishers and handle over 10 billion events a month.
                Our mission is simple, we are looking to grow the podcast
                industry. Far too many brands try a podcast advertising campaign
                and churn. Or worse: they don’t even try to enter the market. By
                providing a platform for brands to optimize results, we
                encourage investment in podcast advertising, and by proxy to
                publishers.
              </p>
              <h4
                className="roboto-slab"
                style={{
                  fontSize: "1.27rem",
                  fontWeight: "700",
                  paddingTop: "30px",
                }}
              >
                Responsibilities
              </h4>
              <p className="roboto-slab" style={{ fontSize: "14px" }}>
                <ul>
                  <li>Leading a team</li>
                  <li>
                    Requirements gathering, analysis and processing with the
                    Product team and BA
                  </li>
                  <li>
                    Develop and maintain the tech documentation (prepare
                    specs/data flow diagrams/mockups etc.)
                  </li>
                  <li>
                    Split tasks into subtasks within the scope and provide the
                    detailed estimation
                  </li>
                  <li>
                    Setup and maintain the infra, write the code in full
                    compliance with the best practices and perform the initial
                    testing to confirm the code quality and successful path
                  </li>
                  <li>
                    Perform deployments across environments in accordance with
                    the existing CI/CD flow and code promotion standards
                  </li>
                  <li>
                    Troubleshoot issues, write detailed and easy to understand
                    RCA reports and troubleshooting guides in Jira, Confluence
                  </li>
                  <li>
                    Set up and maintain effective communication with
                    stakeholders on requirements, development, quality issues,
                    R&D
                  </li>
                  <li>
                    Assess the release management process and timely product
                    delivery{" "}
                  </li>
                </ul>
              </p>
              <h4
                className="roboto-slab"
                style={{
                  fontSize: "1.27rem",
                  fontWeight: "700",
                  paddingTop: "30px",
                }}
              >
                Requirements
              </h4>
              <p className="roboto-slab" style={{ fontSize: "14px" }}>
                <ul>
                  <li>Leading a team</li>
                  <li>
                    Requirements gathering, analysis and processing with the
                    Product team and BA
                  </li>
                  <li>
                    Develop and maintain the tech documentation (prepare
                    specs/data flow diagrams/mockups etc.)
                  </li>
                  <li>
                    Split tasks into subtasks within the scope and provide the
                    detailed estimation
                  </li>
                  <li>
                    Setup and maintain the infra, write the code in full
                    compliance with the best practices and perform the initial
                    testing to confirm the code quality and successful path
                  </li>
                  <li>
                    Perform deployments across environments in accordance with
                    the existing CI/CD flow and code promotion standards
                  </li>
                  <li>
                    Troubleshoot issues, write detailed and easy to understand
                    RCA reports and troubleshooting guides in Jira, Confluence
                  </li>
                  <li>
                    Set up and maintain effective communication with
                    stakeholders on requirements, development, quality issues,
                    R&D
                  </li>
                  <li>
                    Assess the release management process and timely product
                    delivery{" "}
                  </li>
                </ul>
              </p>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={4} sm={4} md={4} lg={4}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ marginTop: "45px" }}>
              <Button fullWidth color="info">
                <BookmarkBorder />
                <span className="right-link">Save</span>
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ marginTop: "45px" }}>
              <Button fullWidth color="facebook">
                <MailOutline />
                <span className="right-link">Apply</span>
              </Button>
            </GridItem>
            <GridItem xs={4} sm={4} md={4} lg={4}></GridItem>
            {/* <GridItem xs={8} sm={8} md={2} lg={2}>
                    <h3>Podsights</h3>
                  </GridItem> */}
          </GridContainer>
        </div>
      </div>
      <RFooter />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  );
}
