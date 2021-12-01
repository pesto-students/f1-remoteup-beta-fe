import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import {
  DoneOutline,
  Done,
  DoneAll,
  FormatLineSpacing,
  FormatItalic,
  Image,
  FiberManualRecord,
} from "@material-ui/icons";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import radioStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import customSelectStyle from "assets/jss/material-kit-react/customSelectStyle";
import CustomFileInput from "components/CustomFileInput/CustomFileInput";
import Progress from "components/Progress/Progress";

import { useFormik, ErrorMessage } from "formik";
import { FormHelperText } from "@material-ui/core";
import * as yup from "yup";
import { borderColor } from "@mui/system";

import { useMutation } from "react-query";
import { useAuth } from "components/AuthProvider/AuthProvider";
import axios from "axios";
import { useSnackbar } from "notistack";
import MUIEditor, { MUIEditorState, toHTML } from "react-mui-draft-wysiwyg";
import { toolbarControlTypes } from "react-mui-draft-wysiwyg";
import { convertFromHTML, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ContentState } from "draft-js";
import { EditorState } from "draft-js";
import { useQuery } from "react-query";

const useStyles = makeStyles(styles);
const useSelectStyles = makeStyles(customSelectStyle);
const useRadioStyles = makeStyles(radioStyles);

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = yup.object({
  position: yup
    .string("Enter your Position")
    .trim()
    .required("Position is required"),
  category: yup.string().required("Category is required"),
  jobType: yup.string().required("Job Type is required"),
  // jobDescriptionState: yup
  //   .object()
  //   // .test("has text", "Cannot save an empty note", (value) =>
  //   //   value.getCurrentContent().hasText()
  //   // )
  //   .required("Job Description is required."),
  // jobDescription: yup
  //   .string()
  //   .trim()
  //   .min(50, "Must be atleast 50 characters long")
  //   .required("Job Description is required"),
  applyType: yup.string().required("Choose a option"),
  applyValue: yup
    .string()
    .trim()
    .when("applyType", {
      is: (applyType) => applyType === "Email",
      then: yup
        .string()
        .email("Enter a valid Email")
        .required("Email is required"),
      // otherwise: yup.string().url().required(" is required"),
    })
    .when("applyType", {
      is: (applyType) => applyType === "URL",
      then: yup.string().url("Enter a valid URL").required("URL is required"),
      // otherwise: yup.string().url().required("Value is required"),
    }),
  companyName: yup.string().trim().required("Name is required"),
  logoFile: yup
    .mixed()
    .required("Logo is required")
    .test(
      "FILE_SIZE",
      "Size should be less than 1 MB",
      (value) => !value || (value && value.size <= 1000000)
    )
    .test(
      "FILE_FORMAT",
      "Supported formats: png/jpg/jpeg",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  // .test(
  //   "fileSize",
  //   "File Size is too large",
  //   (value) => value && value.size <= 1000000
  // )

  // .test("logoFile", "Unsupported File Format", value && (value) =>
  //   SUPPORTED_FORMATS.includes(value.type)
  // ),
  companyWebsite: yup
    .string()
    .trim()
    .url("Website must be a valid URL")
    .required("Website is required"),
  planType: yup.string().required("Plan is required"),
  // salary: yup.string().required("Salary is required"),
  // password: yup
  //   .string("Enter your password")
  //   .min(8, "Password should be of minimum 8 characters length")
  //   .required("Password is required"),
});

export default function FormEditSection(props) {
  const jobId = props.jobId;
  const [logo, setLogo] = React.useState(false);
  const [editorStateJob, setEditorStateJob] = React.useState(
    MUIEditorState.createEmpty()
  );

  const onChangeJob = (newState) => {
    setEditorStateJob(newState);
  };
  const [editorStateCompany, setEditorStateCompany] = React.useState(
    MUIEditorState.createEmpty()
  );

  const onChangeCompany = (newState) => {
    setEditorStateCompany(newState);
  };
  const config = {
    editor: {
      style: {
        fontFamily: "Roboto Slab",
        fontSize: "14px",
      },
    },
    toolbar: {
      style: {
        padding: 0,
        color: "#00acc1",
      },
      controls: [
        toolbarControlTypes.undo,
        toolbarControlTypes.redo,
        toolbarControlTypes.bold,
        toolbarControlTypes.italic,
        toolbarControlTypes.underline,
        toolbarControlTypes.strikethrough,
        toolbarControlTypes.linkAdd,
        toolbarControlTypes.linkRemove,
        toolbarControlTypes.textAlign,
        toolbarControlTypes.orderedList,
        toolbarControlTypes.unorderedList,
      ],
    },
  };
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuth();
  const mutation = useMutation(
    (editJob) =>
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
          `${process.env.REACT_APP_SERVER_URL}/recruiter/job/editjob/${jobId}`,
          {
            method: "PATCH",
            headers: new Headers({
              Authorization: `Bearer ${state.accessToken}`,
              "Content-Type": "application/json",
            }),
            body: editJob,
          }
        );
      },
    {
      onSuccess: () => {
        // Success notification
        enqueueSnackbar("The changes have been saved.", {
          variant: "success",
        });
      },
    }
  );
  const sampleMarkup =
    '<p><strong>Our Stack (we don&#x27;t expect you to have all of these)</strong><br/><br/><br/>Vue + Vuex + Vue Router + Webpack + Less + SCSS<br/>Element UI<br/>FreeMarker<br/>AWS, Circle, Drone CI, K8s<br/><br/><br/><strong>Responsibilities</strong><br/><br/><br/>Develop mobile-first frontends in VueJS<br/><br/><br/>Focus on performance and user experience<br/><br/><br/>Create frontends for the backend management systems<br/><br/><br/>Participate in code reviews with peers and managers to ensure that each increment adheres to original vision as described in the user story and all standard resource libraries and architecture patterns as appropriate<br/><br/><br/>Participate in team ceremonies including planning, grooming, product demonstrations, and team retrospectives<br/><br/><br/>Mentoring less experienced team members<br/><br/><br/><strong>Requirements</strong><br/><br/><br/>Familiarity with at least one: Vue, React, Angular<br/><br/><br/>Familiarity with Git, ES6, Webpack, Less or Sass, and NodeJS<br/><br/><br/>Familiarity with state management like Vuex, Redux, Ngrx<br/><br/><br/>Excellent communication skills <br/><br/><br/>Knowledge of backend stack is a plus<br/><br/><br/>Based in Europe</p><p><strong>Benefits</strong><br/><br/><br/>Quarterly and flash bonuses<br/>Flexible working hours<br/>Top-of-the-line equipment<br/>Education allowance<br/>Referral bonuses<br/>Annual company holidays - we’re hoping to make it to Dubai this year<br/>Highly talented, dependable co-workers in a global, multicultural organisation<br/>We score 100% on The Joel Test<br/>Our EU team is small enough for you to be impactful<br/>Our business is globally established and successful, offering stability and security to our Team Members</p><a href="http://www.facebook.com">Example link</a>';

  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const jstate = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const planPrice = { "1 Month": 199, "2 Month": 299, "3 Month": 399 };

  const formik = useFormik({
    initialValues: {
      position: "",
      category: "",
      jobType: "",
      salary: "",
      candidateRegion: "",
      applyType: "",
      applyValue: "",
      jobDescription: "",
      jobDescriptionState: null,
      companyName: "",
      companyLogo: "",
      logoFile: null,
      companyWebsite: "",
      companyTagLine: "",
      companyDescription: "",
      companyDescriptionState: null,
      planType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // values["logoFileName"] = values.logoFile.name;
      // values["logoFileType"] = values.logoFile.type;
      // values["logoFileSize"] = values.logoFile.size;

      // let file = values.logoFile; // e.target.files[0];
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //values.companyLogo = reader.result;

      values.jobDescription = stateToHTML(editorStateJob.getCurrentContent());
      values.jobDescriptionState = convertToRaw(
        editorStateJob.getCurrentContent()
      );

      values.companyDescription = stateToHTML(
        editorStateCompany.getCurrentContent()
      );
      values.companyDescriptionState = convertToRaw(
        editorStateCompany.getCurrentContent()
      );
      // alert(JSON.stringify(values.logoFile, null, 2));
      const obj = {
        name: logo.name,
        type: logo.type,
        size: logo.size,
      };
      values.logoFile = obj;
      // values.companyDescriptionState = "";
      // values.jobDescriptionState = "";
      // this.setState({
      //   file: file,
      //   base64: reader.result,
      // });
      // alert(JSON.stringify(values, null, 2)); // POST REQUEST
      mutation.mutate(JSON.stringify(values, null, 2));
      // resetForm();
      // setEditorStateJob(MUIEditorState.createEmpty());
      // setEditorStateCompany(MUIEditorState.createEmpty());
      // };
      // };
    },
  });

  // const [selectedEnabled, setSelectedEnabled] = React.useState("");
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const radioClasses = useRadioStyles();

  const { isLoading, error, data } = useQuery(
    `edit-${jobId}`,
    () =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/public/job/editjob/${jobId}`
      ).then((res) => res.json()),
    {
      cacheTime: 30000000,
      onSuccess: (data) => {
        formik.values.position = data.payload.jobData.position;
        formik.values.category = data.payload.jobData.category;
        formik.values.jobType = data.payload.jobData.jobType;
        formik.values.salary = data.payload.jobData.salary;
        formik.values.applyType = data.payload.jobData.applyType;
        formik.values.applyValue = data.payload.jobData.applyValue;
        formik.values.candidateRegion = data.payload.jobData.candidateRegion;
        const jobBlocksFromHTML = convertFromHTML(
          data.payload.jobData.jobDescription
        );
        const jobState = ContentState.createFromBlockArray(
          jobBlocksFromHTML.contentBlocks,
          jobBlocksFromHTML.entityMap
        );
        if (!data.payload.jobData.jobDescriptionState["entityMap"]) {
          data.payload.jobData.jobDescriptionState["entityMap"] = {};
        }
        // setEditorStateJob(MUIEditorState.createWithContent({}, jobState));
        setEditorStateJob(
          MUIEditorState.createWithContent(
            {},
            convertFromRaw(data.payload.jobData.jobDescriptionState)
          )
        );
        formik.values.companyName = data.payload.jobData.companyName;
        formik.values.companyLogo = data.payload.jobData.companyLogo;
        formik.values.logoFile = data.payload.jobData.logoFile;
        setLogo(data.payload.jobData.logoFile);
        formik.values.companyWebsite = data.payload.jobData.companyWebsite;
        formik.values.companyTagLine = data.payload.jobData.companyTagLine;
        const companyBlocksFromHTML = convertFromHTML(
          data.payload.jobData.companyDescription
        );
        const companyState = ContentState.createFromBlockArray(
          companyBlocksFromHTML.contentBlocks,
          companyBlocksFromHTML.entityMap
        );
        if (!data.payload.jobData.companyDescriptionState["entityMap"]) {
          data.payload.jobData.companyDescriptionState["entityMap"] = {};
        }
        // setEditorStateJob(MUIEditorState.createWithContent({}, companyState));
        setEditorStateCompany(
          MUIEditorState.createWithContent(
            {},
            convertFromRaw(data.payload.jobData.companyDescriptionState)
          )
        );
        formik.values.planType = data.payload.jobData.planType;
      },
    }
  );

  if (isLoading) {
    return (
      <div className={classes.section}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{
              minHeight: "700px",
              paddingTop: "100px",
              textAlign: "center",
            }}
          >
            <Progress />
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  if (error) {
    return "An error occured " + error.message;
  }

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={1} sm={1} md={1}></GridItem>
        <GridItem style={{ marginTop: "60px" }} xs={10} sm={10} md={10}>
          <h2 className={classes.title}>
            Reach out to the largest remote community
          </h2>
        </GridItem>
        <GridItem xs={1} sm={1} md={1}></GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem>
          <form onSubmit={formik.handleSubmit}>
            <GridContainer alignItems="center">
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={5} sm={5} md={5}>
                <h3 className={classes.title + " align-left"}>
                  Tell us about your Job
                </h3>
              </GridItem>
              <GridItem xs={5} sm={5} md={5}>
                <p
                  className={classes.description}
                  style={{
                    textAlign: "right",
                    color: "#333",
                    marginBottom: "10px",
                    verticalAlign: "middle",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: "red" }}>
                    <b>*</b>
                  </span>
                  REQUIRED FIELDS
                </p>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* <GridItem xs={6} sm={6} md={6}></GridItem> */}
              {/* Position field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "0px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Position <span style={{ color: "red" }}>*</span>
                </h3>

                <CustomInput
                  inputProps={{
                    id: "position",
                    name: "position",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder:
                      "e.g. React Engineer, Lead Developer, Marketing Manager..",
                    value: formik.values.position,
                    error:
                      formik.touched.position &&
                      Boolean(formik.errors.position),
                  }}
                  style={{ marginTop: "0px" }}
                  id="position"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.position && Boolean(formik.errors.position)
                  }
                >
                  {formik.touched.position && formik.errors.position}
                </FormHelperText>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* Category, Job Type & Salary field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem md={4}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "18px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Category <span style={{ color: "red" }}>*</span>
                </h3>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  <InputLabel
                    htmlFor="category-select"
                    label="Select Category"
                    className={selectClasses.selectLabel}
                    error
                  ></InputLabel>
                  <Select
                    style={{ textTransform: "None !important" }}
                    MenuProps={{
                      className: selectClasses.selectMenu,
                    }}
                    classes={{
                      select: selectClasses.select,
                    }}
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{
                      name: "category",
                      id: "category-select",
                      error:
                        formik.touched.category &&
                        Boolean(formik.errors.category),
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: selectClasses.selectMenuItem,
                      }}
                    >
                      Select Category
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Software Development"
                    >
                      Software Development
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Marketing"
                    >
                      Marketing
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Customer Service"
                    >
                      Customer Service
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText
                  style={{ marginTop: "-7px" }}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  {formik.touched.category && formik.errors.category}
                </FormHelperText>
              </GridItem>
              <GridItem md={1}></GridItem>
              <GridItem md={2}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "18px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Job Type <span style={{ color: "red" }}>*</span>
                </h3>

                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                  error={
                    formik.touched.jobType && Boolean(formik.errors.jobType)
                  }
                >
                  <InputLabel
                    htmlFor="jobType-select"
                    className={selectClasses.selectLabel}
                  ></InputLabel>
                  <Select
                    MenuProps={{
                      className: selectClasses.selectMenu,
                    }}
                    classes={{
                      select: selectClasses.select,
                    }}
                    value={formik.values.jobType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{
                      name: "jobType",
                      id: "job-type-select",
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: selectClasses.selectMenuItem,
                      }}
                    >
                      Select Job Type
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Full-Time"
                    >
                      Full-Time
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Part-Time"
                    >
                      Part-Time
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="Internship"
                    >
                      Internship
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText
                  style={{ marginTop: "-7px" }}
                  error={
                    formik.touched.jobType && Boolean(formik.errors.jobType)
                  }
                >
                  {formik.touched.jobType && formik.errors.jobType}
                </FormHelperText>
              </GridItem>
              <GridItem md={1}></GridItem>
              <GridItem md={2}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "18px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Salary
                </h3>
                <CustomInput
                  inputProps={{
                    name: "salary",
                    id: "salary",
                    placeholder: "e.g. $40k-50k/year..",
                    value: formik.values.salary,
                    onChange: formik.handleChange,
                  }}
                  style={{ marginTop: "0px" }}
                  id="salary"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* Candidate region field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "25px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Candidate Region
                </h3>
                <CustomInput
                  inputProps={{
                    id: "candidateRegion",
                    placeholder:
                      "e.g. US Only, EU Only, Asia Only, CET Timezone, IST Timezone",
                    name: "candidateRegion",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.candidateRegion,
                  }}
                  style={{ marginTop: "0px" }}
                  id="candidateRegion"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <p
                  style={{
                    marginTop: "-9px",
                    textTransform: "none",
                    fontWeight: "300",
                    fontSize: "14px",
                    color: "#555",
                  }}
                  className={classes.description + " align-left"}
                >
                  <em>
                    Optional: If you need the candidate to be in a specific
                    location or timezone. By default, it's Anywhere in the
                    world.
                  </em>
                </p>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>

              {/* How to Apply section [̉̉̉̉applyType] */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "25px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  How to Apply <span style={{ color: "red" }}>*</span>
                </h3>

                <RadioGroup
                  name="applyType"
                  value={formik.values.applyType}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "applyType",
                      event.currentTarget.value
                    );
                  }}
                  style={{ marginTop: "27px" }}
                  className={
                    radioClasses.checkboxAndRadio +
                    " " +
                    radioClasses.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    value="ATS"
                    control={
                      <Radio
                        checked={formik.values.applyType === "ATS"}
                        onChange={formik.handleChange}
                        value="ATS"
                        name={formik.values.applyType}
                        aria-label="ATS"
                        icon={
                          <FiberManualRecord
                            className={radioClasses.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={radioClasses.radioChecked}
                          />
                        }
                        classes={{
                          checked: radioClasses.radio,
                          root: radioClasses.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: radioClasses.label,
                    }}
                    label={<span style={{ color: "#333" }}>RemoteUp ATS</span>}
                  />
                  <FormControlLabel
                    value="URL"
                    control={
                      <Radio
                        checked={formik.values.applyType === "URL"}
                        onChange={formik.handleChange}
                        // value="b"
                        // name={formik.values.applyType}
                        aria-label="URL"
                        icon={
                          <FiberManualRecord
                            className={radioClasses.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={radioClasses.radioChecked}
                          />
                        }
                        classes={{
                          checked: radioClasses.radio,
                          root: radioClasses.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: radioClasses.label,
                    }}
                    label={<span style={{ color: "#333" }}>URL</span>}
                  />
                  <FormControlLabel
                    value="Email"
                    control={
                      <Radio
                        checked={formik.values.applyType === "Email"}
                        onChange={formik.handleChange}
                        // value="b"
                        // name={formik.values.applyType}
                        aria-label="B"
                        icon={
                          <FiberManualRecord
                            className={radioClasses.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={radioClasses.radioChecked}
                          />
                        }
                        classes={{
                          checked: radioClasses.radio,
                          root: radioClasses.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: radioClasses.label,
                    }}
                    label={<span style={{ color: "#333" }}>Email</span>}
                  />
                </RadioGroup>
                {(formik.values.applyType === "Email" ||
                  formik.values.applyType === "URL") && (
                  <CustomInput
                    inputProps={{
                      id: "applyValue",
                      placeholder:
                        formik.values.applyType === "URL"
                          ? "URL (http://) where candidates can apply to this job"
                          : "email (@) where candidates can apply to this job",
                      name: "applyValue",
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                      value: formik.values.applyValue,
                      style: { marginTop: "-27px" },
                      error:
                        formik.touched.applyValue &&
                        Boolean(formik.errors.applyValue),
                    }}
                    id="applyValue"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                )}
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.applyValue &&
                    Boolean(formik.errors.applyValue)
                  }
                >
                  {formik.touched.applyValue && formik.errors.applyValue}
                </FormHelperText>
                <FormHelperText
                  style={{ marginTop: "14px" }}
                  error={
                    formik.touched.applyType && Boolean(formik.errors.applyType)
                  }
                >
                  {formik.touched.applyType && formik.errors.applyType}
                </FormHelperText>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>

              {/* Job description field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{
                    marginBottom: "9px",
                    marginTop: "25px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Job Description <span style={{ color: "red" }}>*</span>
                </h3>
                <MUIEditor
                  editorState={editorStateJob}
                  onChange={onChangeJob}
                  // onChange={(newState) => {
                  //   formik.setFieldValue("jobDescriptionState", newState);
                  // }}
                  // onBlur={formik.handleBlur}
                  config={config}
                />
                {/* <CustomInput
                  // labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    name: "jobDescription",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    placeholder: "",
                    value: formik.values.jobDescription,
                    error:
                      formik.touched.jobDescription &&
                      Boolean(formik.errors.jobDescription),
                  }}
                /> */}
                <p
                  style={{
                    marginTop: "-9px",
                    textTransform: "none",
                    fontWeight: "300",
                    fontSize: "14px",
                    color: "#555",
                  }}
                  className={classes.description + " align-left"}
                >
                  <i>
                    Don’t worry if that’s not 100% perfect, you can{" "}
                    <b>always edit after posting</b> your job!
                  </i>
                </p>
                <FormHelperText
                  style={{ marginTop: "-7px" }}
                  error={
                    formik.touched.jobDescription &&
                    Boolean(formik.errors.jobDescription)
                  }
                >
                  {formik.touched.jobDescription &&
                    formik.errors.jobDescription}
                </FormHelperText>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* <ErrorMessage name="jobDescription" /> */}
              {/* <CustomInput
                labelText="Your Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
              />{" "}
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              /> */}
              {/* <GridItem className="align-center" xs={12} sm={12} md={12}>
                <Button round color="success">
                  Send Message
                </Button>
              </GridItem> */}
              {/* Tell us about your company */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{ marginTop: "45px" }}
                  className={classes.title + " align-left"}
                >
                  Tell us about your Company
                </h3>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* Company Name field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "0px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Company Name <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomInput
                  inputProps={{
                    placeholder: "",
                    name: "companyName",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.companyName,
                    error:
                      formik.touched.companyName &&
                      Boolean(formik.errors.companyName),
                  }}
                  style={{ marginTop: "0px" }}
                  id="companyName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                >
                  {formik.touched.companyName && formik.errors.companyName}
                </FormHelperText>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "0px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Company Logo <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomFileInput
                  formControlProps={{
                    fullWidth: true,
                    error:
                      formik.touched.logoFile &&
                      Boolean(formik.errors.logoFile),
                  }}
                  onChange={function (event) {
                    formik.setFieldValue(
                      "logoFile",
                      event.currentTarget.files[0]
                    );
                  }}
                  inputProps={{
                    placeholder: "Format: jpg/png, Size: Max 1 MB",
                    name: "logoFile",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.logoFile
                      ? formik.values.logoFile.name
                      : "",
                    error:
                      formik.touched.logoFile &&
                      Boolean(formik.errors.logoFile),
                  }}
                  endButton={{
                    buttonProps: {
                      round: true,
                      color: "info",
                      justIcon: true,
                      fileButton: true,
                      onBlur: formik.handleBlur,
                      name: "logoFile",
                    },
                    icon: <Image />,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.logoFile && Boolean(formik.errors.logoFile)
                  }
                >
                  {formik.touched.logoFile && formik.errors.logoFile}
                </FormHelperText>
                {/* <CustomInput
                  inputProps={{
                    placeholder: "",
                    type: "file",
                    name: "logoFile",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.logoFile,
                    error:
                      formik.touched.logoFile &&
                      Boolean(formik.errors.logoFile),
                  }}
                  style={{ marginTop: "0px" }}
                  id="logoFile"
                  formControlProps={{
                    fullWidth: true,
                  }}
                /> */}
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* Company Website & Tagline field */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "25px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Company Website <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomInput
                  inputProps={{
                    placeholder: "e.g. https://myBusiness.com",
                    name: "companyWebsite",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.companyWebsite,
                    error:
                      formik.touched.companyWebsite &&
                      Boolean(formik.errors.companyWebsite),
                  }}
                  style={{ marginTop: "0px" }}
                  id="companyName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <FormHelperText
                  style={{ marginTop: "-14px" }}
                  error={
                    formik.touched.companyWebsite &&
                    Boolean(formik.errors.companyWebsite)
                  }
                >
                  {formik.touched.companyWebsite &&
                    formik.errors.companyWebsite}
                </FormHelperText>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={5} sm={5} md={5}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "25px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Company Tagline
                </h3>
                <CustomInput
                  inputProps={{
                    placeholder: "company’s mission statement (max 10 words)",
                    name: "companyTagLine",
                    value: formik.values.companyTagLine,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                  }}
                  style={{ marginTop: "0px" }}
                  id="companyTagLine"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              {/* Company Logo & Billing Email field
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "25px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Company Logo <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomInput
                  inputProps={{
                    placeholder: "",
                  }}
                  style={{ marginTop: "0px" }}
                  id="companyName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    fontSize: "1.27rem",
                    marginTop: "25px",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Billing Email <span style={{ color: "red" }}>*</span>
                </h3>
                <CustomInput
                  inputProps={{
                    placeholder: "",
                  }}
                  style={{ marginTop: "0px" }}
                  id="companyName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={4} sm={4} md={4}></GridItem> */}
              {/* Tell us more about your company */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem xs={10} sm={10} md={10}>
                <h3
                  style={{
                    marginBottom: "9px",
                    marginTop: "25px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Tell us more about your Company
                </h3>
                {/* <CustomInput
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    name: "companyDescription",
                    value: formik.values.companyDescription,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                  }}
                /> */}
                <MUIEditor
                  editorState={editorStateCompany}
                  onChange={onChangeCompany}
                  // onChange={(newState) => {
                  //   formik.setFieldValue("companyDescriptionState", newState);
                  // }}
                  // onBlur={formik.handleBlur}
                  config={config}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>

              {/* Select Plan */}
              {/* <GridItem xs={5} sm={5} md={5}></GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <h3
                  style={{
                    marginBottom: "-27px",
                    marginTop: "25px",
                    fontSize: "1.27rem",
                    paddingTop: "0px",
                  }}
                  className={classes.title + " align-left"}
                >
                  Select Plan <span style={{ color: "red" }}>*</span>
                </h3>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                  error={
                    formik.touched.planType && Boolean(formik.errors.planType)
                  }
                >
                  <InputLabel
                    htmlFor="planType-select"
                    className={selectClasses.selectLabel}
                  ></InputLabel>
                  <Select
                    MenuProps={{
                      className: selectClasses.selectMenu,
                    }}
                    classes={{
                      select: selectClasses.select,
                    }}
                    inputProps={{
                      id: "job-type-select",
                      name: "planType",
                      value: formik.values.planType,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: selectClasses.selectMenuItem,
                      }}
                    >
                      Select Plan
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="1 Month"
                    >
                      1 Month
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="2 Month"
                    >
                      2 Month
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected,
                      }}
                      value="3 Month"
                    >
                      3 Month
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText
                  style={{ marginTop: "-7px" }}
                  error={
                    formik.touched.planType && Boolean(formik.errors.planType)
                  }
                >
                  {formik.touched.planType && formik.errors.planType}
                </FormHelperText>
              </GridItem>

              <GridItem xs={5} sm={5} md={5}></GridItem> */}

              {/* Submit Button */}
              <GridItem xs={1} sm={1} md={1}></GridItem>
              <GridItem
                xs={10}
                sm={10}
                md={10}
                style={{ textAlign: "center", marginTop: "53px" }}
              >
                <Button
                  round
                  color="success"
                  size="lg"
                  type="submit"
                  // onClick={formik.onSubmit}
                  // href="/post-a-job"
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  <Done />
                  <span className="post-a-job">
                    Save Changes
                    {/* Confirm & Pay
                    {formik.values.planType &&
                      " $" + planPrice[formik.values.planType]} */}
                  </span>
                </Button>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}></GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
