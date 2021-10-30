import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

import moment from "moment";

import { useQuery } from "react-query";
import { useAuth } from "components/AuthProvider/AuthProvider";

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

  const { state, dispatch } = useAuth();
  let homeJobsURL;

  if (state.category === "All") {
    if (state.search) {
      homeJobsURL = `${process.env.REACT_APP_SERVER_URL}/public/job/homejobs/?searchKey=${state.search}`;
    } else {
      homeJobsURL = `${process.env.REACT_APP_SERVER_URL}/public/job/homejobs`;
    }
  } else {
    if (state.search) {
      homeJobsURL = `${process.env.REACT_APP_SERVER_URL}/public/job/viewjobs/${state.category}/?searchKey=${state.search}`;
    } else {
      homeJobsURL = `${process.env.REACT_APP_SERVER_URL}/public/job/viewjobs/${state.category}`;
    }
  }

  const { isLoading, error, data } = useQuery(
    ["jobsHome", state.search, state.category],
    () => fetch(homeJobsURL).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div
        className={classes.section}
        style={{
          paddingTop: "20px",
          paddingBottom: "150px",
          minHeight: "500px",
        }}
      >
        <GridContainer justify="center" alignItems="center">
          {/* <GridItem xs={3} sm={3} md={3}></GridItem> */}
          <GridItem xs={8} sm={8} md={8}>
            <h3>Loading....</h3>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  if (error) {
    return "An error occured " + error.message;
  }

  const jobData = data.payload.jobData;
  const jobsCategory = [];
  if (state.category === "All") {
    const categoryOrder = [
      "Software Development",
      "Customer Service",
      "Marketing",
    ];
    for (let category of categoryOrder) {
      for (let jobCategory of jobData) {
        if (jobCategory._id === category) {
          jobsCategory.push(jobCategory);
        }
      }
    }
  }
  return (
    <div
      className={classes.section}
      style={{
        paddingTop: "20px",
        paddingBottom: "150px",
        minHeight: "500px",
      }}
    >
      <GridContainer justify="center" alignItems="center">
        {/* <GridItem xs={3} sm={3} md={3}></GridItem> */}
        <GridItem xs={8} sm={8} md={8}>
          {state.category === "All" &&
            jobsCategory.map((category) => (
              <>
                {/* Category Name */}
                <h3
                  className={classes.title + " align-left"}
                  style={{ marginBottom: "20px", marginTop: "40px" }}
                >
                  {category._id}
                  <span style={{ float: "right" }}>
                    <Button
                      style={{ margin: "0px", padding: "12px 5px" }}
                      type="button"
                      color="info"
                      simple
                      onClick={() =>
                        dispatch({ type: "CATEGORY", category: category._id })
                      }
                    >
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>
                        View All
                      </span>
                    </Button>
                  </span>
                </h3>
                {category.jobs.map((job) => (
                  <RouterLink to={`/job/${job._id}`} key={job._id}>
                    <Card style={{ marginTop: "18px", marginBottom: "15px" }}>
                      <CardBody>
                        <GridContainer
                          justify="flex-start"
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
                              src={job.companyLogo}
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
                            <span style={{ fontSize: "13px", fontWeight: 600 }}>
                              {job.companyName}
                            </span>
                            <br />
                            <span
                              style={{ fontSize: "18px", fontWeight: "700" }}
                            >
                              {job.position}
                            </span>
                            <br />
                            <span style={{ fontSize: "13px", fontWeight: 500 }}>
                              {job.jobType} |{" "}
                              {job.candidateRegion || "Anywhere in the world"}{" "}
                            </span>
                          </GridItem>
                          <GridItem xs={2} sm={2} md={2}>
                            <span style={{ fontSize: "16px", fontWeight: 600 }}>
                              {moment(job.createdAt).format("MMM") +
                                " " +
                                moment(job.createdAt).format("DD") || "Oct 13"}
                            </span>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </RouterLink>
                ))}
              </>
            ))}
          {state.category !== "All" && (
            <>
              {/* Category Name */}
              <h3
                className={classes.title + " align-left"}
                style={{ marginBottom: "20px", marginTop: "40px" }}
              >
                {state.category}
                {/* <span style={{ float: "right" }}>
                    <Button
                      style={{ margin: "0px", padding: "12px 5px" }}
                      type="button"
                      color="info"
                      simple
                      onClick={() =>
                        dispatch({ type: "CATEGORY", category: category._id })
                      }
                    >
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>
                        View All
                      </span>
                    </Button>
                  </span> */}
              </h3>
              {jobData.map((job) => (
                <RouterLink to={`/job/${job._id}`} key={job._id}>
                  <Card style={{ marginTop: "18px", marginBottom: "15px" }}>
                    <CardBody>
                      <GridContainer
                        justify="flex-start"
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
                            src={job.companyLogo}
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
                          <span style={{ fontSize: "13px", fontWeight: 600 }}>
                            {job.companyName}
                          </span>
                          <br />
                          <span style={{ fontSize: "18px", fontWeight: "700" }}>
                            {job.position}
                          </span>
                          <br />
                          <span style={{ fontSize: "13px", fontWeight: 500 }}>
                            {job.jobType} |{" "}
                            {job.candidateRegion || "Anywhere in the world"}{" "}
                          </span>
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                          <span style={{ fontSize: "16px", fontWeight: 600 }}>
                            {moment(job.createdAt).format("MMM") +
                              " " +
                              moment(job.createdAt).format("DD") || "Oct 13"}
                          </span>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </RouterLink>
              ))}
            </>
          )}

          {/* <Card>
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
          </Card> */}

          {/* Customer Service */}
          {/* <h3 className={classes.title + " align-left"}>
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
          </Card> */}
        </GridItem>
      </GridContainer>
    </div>
  );
}
