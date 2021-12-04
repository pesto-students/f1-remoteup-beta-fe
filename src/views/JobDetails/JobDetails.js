import React from "react";
import { Link } from "react-router-dom";

// libraries
import classNames from "classnames";
import { useSnackbar } from "notistack";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Schedule from "@material-ui/icons/Schedule";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Done from "@material-ui/icons/DoneRounded";
import Category from "@material-ui/icons/Category";
import MailOutline from "@material-ui/icons/MailOutline";

// icons from ion icons package
import Money from "assets/img/cash-outline.svg";
import Earth from "assets/img/earth.svg";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import ScrollToTopOnMount from "components/ScrollToTopOnMount/ScrollToTopOnMount.js";
import { useAuth, checkJWT } from "components/AuthProvider/AuthProvider.js";
import { lockJS } from "components/AuthProvider/lockJS";
import { useQuery, useQueries, useMutation } from "react-query";

// loading view
import Loading from "views/Loading/Loading.js";

// styles
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const dashboardRoutes = [];

const cardStyles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(cardStyles);
const useTypoStyles = makeStyles(typoStyles);

export default function JobDetails(props) {
  const jobId = props.match.params.jobId;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const typoClasses = useTypoStyles();

  const { state, dispatch, setProfile } = useAuth();
  const { ...rest } = props;
  const [isApplied, setIsApplied] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  checkJWT(dispatch, setProfile);

  console.log(state.isAuthenticated);

  const queries = useQueries([
    {
      queryKey: `job-${jobId}`,
      queryFn: () =>
        fetch(
          `${process.env.REACT_APP_SERVER_URL}/public/job/viewjob/${jobId}`
        ).then((res) => res.json()),
    },
    {
      queryKey: `savedAppliedJobsList`,
      queryFn: () => {
        return fetch(
          `${process.env.REACT_APP_SERVER_URL}/jobseeker/job/savedappliedjobslist`,
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

  const [job, savedAppliedList] = queries;

  React.useEffect(() => {
    if (state.role === "Jobseeker") {
      if (
        savedAppliedList.data !== undefined &&
        !savedAppliedList.isLoading &&
        !savedAppliedList.error &&
        !savedAppliedList.isIdle &&
        savedAppliedList.data.payload !== undefined
      ) {
        if (
          savedAppliedList.data.payload.appliedJobs !== undefined &&
          savedAppliedList.data.payload.savedJobs !== undefined
        ) {
          const allApplied = savedAppliedList.data.payload.appliedJobs;
          const allSaved = savedAppliedList.data.payload.savedJobs;
          if (allApplied.includes(jobId)) {
            setIsApplied(true);
          }
          if (allSaved.includes(jobId)) {
            setIsSaved(true);
          }
          setUpdated(true);
        }
      }
    }
  }, [savedAppliedList.data]);

  const mutation = useMutation(
    () => {
      return fetch(
        `${process.env.REACT_APP_SERVER_URL}/jobseeker/job/saveunsavejob/${jobId}`,
        {
          method: "PATCH",
          headers: new Headers({
            Authorization: `Bearer ${state.accessToken}`,
            "Content-Type": "application/json",
          }),
        }
      );
    },
    {
      onSuccess: (result, variables, context) => {
        if (isSaved) {
          setIsSaved(false);
          enqueueSnackbar("Job Unsaved", {
            variant: "success",
          });
        } else {
          setIsSaved(true);
          enqueueSnackbar("Job Saved", {
            variant: "success",
          });
        }
      },
    }
  );

  if (state.role === "Jobseeker" && !updated) {
    return <Loading />;
  }

  if (job.isLoading || !job.data) {
    return <Loading />;
  }

  if (job.error) {
    return "An error occured";
  }

  const data = job.data;

  return (
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
      <ScrollToTopOnMount />
      <div className={classNames(classes.mainDiv)}>
        <div className={classes.container} style={{ minHeight: "900px" }}>
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
                src={data.payload.jobData.companyLogo}
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
                {data.payload.jobData.companyName}
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
                {data.payload.jobData.position}
              </h3>
              <h5 className="roboto-slab">
                <Category style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {data.payload.jobData.category} &nbsp;&nbsp;{" "}
                </span>
                <Schedule style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {data.payload.jobData.jobType}
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
                <span style={{ verticalAlign: "middle" }}>
                  {" "}
                  {data.payload.jobData.candidateRegion ||
                    "Anywhere in the world"}
                </span>
                &nbsp;&nbsp;{" "}
                {data.payload.jobData.salary && (
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
                      {data.payload.jobData.salary}
                    </span>
                  </>
                )}
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
              {!state.isAuthenticated && (
                <>
                  <Button onClick={() => lockJS.show()} fullWidth color="info">
                    <BookmarkBorder />
                    <span className="right-link">Save</span>
                  </Button>
                  <Button
                    onClick={() => lockJS.show()}
                    fullWidth
                    color="facebook"
                  >
                    <MailOutline />
                    <span className="right-link">Apply</span>
                  </Button>
                </>
              )}
              {state.role === "Jobseeker" && (
                <>
                  <Button
                    onClick={() => mutation.mutate()}
                    fullWidth
                    color="info"
                  >
                    {isSaved ? (
                      <>
                        <Done />
                        <span className="right-link">Saved</span>
                      </>
                    ) : (
                      <>
                        <BookmarkBorder />
                        <span className="right-link">Save</span>
                      </>
                    )}
                  </Button>
                  {isApplied && (
                    <Button fullWidth color="facebook">
                      <Done />
                      <span className="right-link">Applied</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "ATS" && (
                    <Button
                      component={Link}
                      to={`/apply/${jobId}`}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "Email" && (
                    <Button
                      href={"mailto:" + data.payload.jobData.applyValue}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "URL" && (
                    <Button
                      href={data.payload.jobData.applyValue}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                </>
              )}
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={8} sm={8} md={8} lg={8}>
              <div
                style={{
                  fontSize: "",
                  paddingTop: "30px",
                }}
                className="roboto-slab"
                dangerouslySetInnerHTML={{
                  __html: data.payload.jobData.companyDescription,
                }}
              ></div>
              <div
                style={{ fontSize: "1rem" }}
                className="roboto-slab"
                dangerouslySetInnerHTML={{
                  __html: data.payload.jobData.jobDescription,
                }}
              ></div>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2}></GridItem>
            <GridItem xs={4} sm={4} md={4} lg={4}></GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ marginTop: "45px" }}>
              {!state.isAuthenticated && (
                <Button onClick={() => lockJS.show()} fullWidth color="info">
                  <BookmarkBorder />
                  <span className="right-link">Save</span>
                </Button>
              )}
              {state.role === "Jobseeker" && (
                <Button
                  onClick={() => mutation.mutate()}
                  fullWidth
                  color="info"
                >
                  {isSaved ? (
                    <>
                      <Done />
                      <span className="right-link">Saved</span>
                    </>
                  ) : (
                    <>
                      <BookmarkBorder />
                      <span className="right-link">Save</span>
                    </>
                  )}
                </Button>
              )}
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ marginTop: "45px" }}>
              {!state.isAuthenticated && (
                <Button
                  onClick={() => lockJS.show()}
                  fullWidth
                  color="facebook"
                >
                  <MailOutline />
                  <span className="right-link">Apply</span>
                </Button>
              )}
              {state.role === "Jobseeker" && (
                <>
                  {isApplied && (
                    <Button fullWidth color="facebook">
                      <Done />
                      <span className="right-link">Applied</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "ATS" && (
                    <Button
                      component={Link}
                      to={`/apply/${jobId}`}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "Email" && (
                    <Button
                      href={"mailto:" + data.payload.jobData.applyValue}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                  {!isApplied && data.payload.jobData.applyType === "URL" && (
                    <Button
                      href={data.payload.jobData.applyValue}
                      fullWidth
                      color="facebook"
                    >
                      <MailOutline />
                      <span className="right-link">Apply</span>
                    </Button>
                  )}
                </>
              )}
            </GridItem>
            <GridItem xs={4} sm={4} md={4} lg={4}></GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
