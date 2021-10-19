import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import image from "assets/img/faces/avatar.jpg";
import logo from "./logo1.jpeg";
import everli from "./everli.png";
import podsights from "./podsights.jpeg";
import toptal from "./toptal.png";
import axios from "axios";

import { useQuery } from "react-query";

const cardStyles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(cardStyles);
const useTypoStyles = makeStyles(typoStyles);

export default function JobsSection(props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const typoClasses = useTypoStyles();

  const { isLoading, error, data } = useQuery("jobsHome", () =>
    fetch("http://127.0.0.1:8000/jobseeker/job/homejobs").then((res) =>
      res.json()
    )
  );

  return (
    <div className={classes.section}>
      <GridContainer justify="center" alignItems="center">
        {/* <GridItem xs={3} sm={3} md={3}></GridItem> */}
        <GridItem xs={8} sm={8} md={8}>
          {/* Software Development */}
          <h3 className={classes.title + " align-left"}>
            Software Development
            <span style={{ float: "right" }}>
              <Button
                style={{ margin: "0px", padding: "12px 5px" }}
                type="button"
                color="info"
                simple
              >
                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                  View All
                </span>
              </Button>
            </span>
          </h3>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
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
                </GridItem>
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Podsights
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    React Engineer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Full-Time | Anywhere in the world{" "}
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 13
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
                    src={logo}
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
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Theorem
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    Full Stack Developer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Part-Time | North America Only
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 12
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
                    src={everli}
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
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Everli
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    Senior Front-End Engineer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Full-Time | Asia Only
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 11
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>

          {/* Customer Service */}
          <h3 className={classes.title + " align-left"}>
            Customer Service
            <span style={{ float: "right" }}>
              <Button
                style={{ margin: "0px", padding: "12px 5px" }}
                type="button"
                color="info"
                simple
              >
                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                  View All
                </span>
              </Button>
            </span>
          </h3>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
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
                </GridItem>
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Podsights
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    React Engineer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Full-Time | Anywhere in the world{" "}
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 13
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
                    src={logo}
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
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Theorem
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    Full Stack Developer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Part-Time | North America Only
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 12
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <GridContainer
                justify="start"
                alignItems="center"
                className="roboto-slab"
                style={{ color: "#3c4858" }}
              >
                <GridItem xs={2} sm={2} md={2} style={{ paddingLeft: "0px" }}>
                  <img
                    src={everli}
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
                <GridItem xs={8} sm={8} md={8} style={{ paddingLeft: "0px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Everli
                  </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    Senior Front-End Engineer
                  </span>
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Full-Time | Asia Only
                  </span>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Oct 11
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
