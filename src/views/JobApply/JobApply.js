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
import Image from "@material-ui/icons/Image";
import AttachFile from "@material-ui/icons/AttachFile";

import Money from "assets/img/cash-outline.svg";

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
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomFileInput from "components/CustomFileInput/CustomFileInput";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import workStyles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

// Sections for this page
import ProductSection from "../LandingPage/Sections/ProductSection.js";
import TeamSection from "../LandingPage/Sections/TeamSection.js";
import WorkSection from "../LandingPage/Sections/WorkSection.js";

import { useFormik, ErrorMessage } from "formik";
import { FormHelperText } from "@material-ui/core";
import * as yup from "yup";

import { useAuth } from "components/AuthProvider/AuthProvider.js";

import { useQuery, useMutation } from "react-query";
import { useSnackbar } from "notistack";

const dashboardRoutes = [];

const cardStyles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(cardStyles);
const useTypoStyles = makeStyles(typoStyles);
const useWorkStyles = makeStyles(workStyles);

const SUPPORTED_FORMATS = ["application/pdf"];
const phoneRegExp =
  /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your Full Name")
    .trim()
    .required("Full Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Enter a valid Phone Number")
    .required("Phone is required"),
  resume: yup
    .mixed()
    .required("Resume/CV is required")
    .test(
      "FILE_SIZE",
      "Size should be less than 1 MB",
      (value) => !value || (value && value.size <= 1000000)
    )
    .test(
      "FILE_FORMAT",
      "Supported format: pdf only",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  exp: yup
    .number("Input Number of Years")
    .typeError("Enter a positive number")
    .positive("Experience cannot be negative")
    .required("Work Experience is required"),
});

function ScrollToTopOnMount() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function JobApply(props) {
  const jobId = props.match.params.jobId;
  console.log(jobId);
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const typoClasses = useTypoStyles();
  const workClasses = useWorkStyles();
  const { state } = useAuth();
  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    (newApp) =>
      // axios.post(
      //   `${process.env.REACT_APP_SERVER_URL}/recruiter/job/postjob`,
      //   {
      //     Authorization: `Bearer ${state.accessToken}`,
      //     "Content-Type": "application/json",
      //   },
      //   newJob
      // ),
      {
        return fetch(
          `${process.env.REACT_APP_SERVER_URL}/jobseeker/job/applyjob/${jobId}`,
          {
            method: "PATCH",
            headers: new Headers({
              Authorization: `Bearer ${state.accessToken}`,
              "Content-Type": "application/json",
            }),
            body: newApp,
          }
        );
      },
    {
      onSuccess: () => {
        // Success notification
        enqueueSnackbar("Application submitted successfully!", {
          variant: "success",
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      resume: null,
      exp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      values["resumeName"] = values.resume.name;
      values["resumeType"] = values.resume.type;
      values["resumeSize"] = values.resume.size;
      let file = values.resume; // e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        values.resume = reader.result;
        // this.setState({
        //   file: file,
        //   base64: reader.result,
        // });
        // alert(JSON.stringify(values, null, 2)); // POST REQUEST
        mutation.mutate(JSON.stringify(values, null, 2));
        resetForm();
      };
    },
  });

  const { isLoading, error, data } = useQuery(`apply-${jobId}`, () =>
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/public/job/viewjob/${jobId}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    console.log("Job Apply isLoading");
    return "...isLoading";
  }

  if (error) {
    return "An error occured " + error.message;
  }

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
      <ScrollToTopOnMount />
      <div className={classNames(classes.mainDiv)}>
        <div className={classes.container} style={{ minHeight: "900px" }}>
          {/* <ProductSection />
          <TeamSection /> */}
          {/* <WorkSection name="Applied/Saved Jobs..." /> */}
          <form onSubmit={formik.handleSubmit}>
            <GridContainer
              style={{
                color: "#3C4858",
                paddingTop: "130px",
                paddingBottom: "130px",
              }}
              justify="start"
              alignItems="center"
            >
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem
                xs={6}
                sm={6}
                md={6}
                lg={6}
                style={{ textAlign: "center" }}
              >
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
                    fontSize: "1.35rem",
                    fontWeight: "700",
                  }}
                  className="roboto-slab"
                >
                  {data.payload.jobData.companyName}
                </span>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
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
                  <World style={{ verticalAlign: "middle" }} />
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
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem
                xs={6}
                sm={6}
                md={6}
                lg={6}
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
                  Submit Your Application
                </h3>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              {/* Full Name */}
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.18rem",
                    marginTop: "0px",
                    paddingTop: "30px",
                  }}
                  className={workClasses.title + " align-left"}
                >
                  Full Name <span style={{ color: "red" }}>*</span>
                </h3>

                <CustomInput
                  inputProps={{
                    id: "fullName",
                    name: "fullName",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder: "",
                    value: formik.values.fullName,
                    error:
                      formik.touched.fullName &&
                      Boolean(formik.errors.fullName),
                  }}
                  style={{ marginTop: "0px" }}
                  id="fullName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                >
                  {formik.touched.fullName && formik.errors.fullName}
                </FormHelperText>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>

              {/* Email Address */}
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.18rem",
                    marginTop: "0px",
                    paddingTop: "30px",
                  }}
                  className={workClasses.title + " align-left"}
                >
                  Email <span style={{ color: "red" }}>*</span>
                </h3>

                <CustomInput
                  inputProps={{
                    id: "email",
                    name: "email",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder: "",
                    value: formik.values.email,
                    error: formik.touched.email && Boolean(formik.errors.email),
                  }}
                  style={{ marginTop: "0px" }}
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                >
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>

              {/* Phone Number */}
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.18rem",
                    marginTop: "0px",
                    paddingTop: "30px",
                  }}
                  className={workClasses.title + " align-left"}
                >
                  Phone <span style={{ color: "red" }}>*</span>
                </h3>

                <CustomInput
                  inputProps={{
                    id: "phone",
                    name: "phone",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder: "with country code",
                    value: formik.values.phone,
                    error: formik.touched.phone && Boolean(formik.errors.phone),
                  }}
                  style={{ marginTop: "0px" }}
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                >
                  {formik.touched.phone && formik.errors.phone}
                </FormHelperText>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "0px",
                    paddingTop: "30px",
                  }}
                  className={workClasses.title + " align-left"}
                >
                  Resume/CV <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomFileInput
                  formControlProps={{
                    fullWidth: true,
                    error:
                      formik.touched.resume && Boolean(formik.errors.resume),
                  }}
                  onChange={function (event) {
                    formik.setFieldValue(
                      "resume",
                      event.currentTarget.files[0]
                    );
                  }}
                  inputProps={{
                    placeholder: "Format: pdf only, Size: Max 1 MB",
                    name: "resume",
                    onBlur: formik.handleBlur,
                    value: formik.values.resume
                      ? formik.values.resume.name
                      : "",
                    error:
                      formik.touched.resume && Boolean(formik.errors.resume),
                  }}
                  endButton={{
                    buttonProps: {
                      round: true,
                      color: "info",
                      justIcon: true,
                      fileButton: true,
                      onBlur: formik.handleBlur,
                      name: "resume",
                    },
                    icon: <AttachFile />,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={formik.touched.resume && Boolean(formik.errors.resume)}
                >
                  {formik.touched.resume && formik.errors.resume}
                </FormHelperText>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>

              {/* Work Experience */}
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.18rem",
                    marginTop: "0px",
                    paddingTop: "30px",
                  }}
                  className={workClasses.title + " align-left"}
                >
                  Work Experience <span style={{ color: "red" }}>*</span>
                </h3>

                <CustomInput
                  inputProps={{
                    id: "exp",
                    name: "exp",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder: "number of years e.g. 4.5",
                    value: formik.values.exp,
                    error: formik.touched.exp && Boolean(formik.errors.exp),
                  }}
                  style={{ marginTop: "0px" }}
                  id="fullName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={formik.touched.exp && Boolean(formik.errors.exp)}
                >
                  {formik.touched.exp && formik.errors.exp}
                </FormHelperText>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}></GridItem>

              {/* Submit Button */}
              <GridItem xs={5} sm={5} md={5} lg={5}></GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                lg={2}
                style={{ marginTop: "45px", textAlign: "center" }}
              >
                <Button color="info" type="submit">
                  <Send />
                  <span className="right-link">Submit</span>
                </Button>
              </GridItem>
              <GridItem xs={5} sm={5} md={5} lg={5}></GridItem>
            </GridContainer>
          </form>
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
