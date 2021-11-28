import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

// @material-ui/icons
import SubjectIcon from "@mui/icons-material/Subject";
import Search from "@material-ui/icons/Search";
import Category from "@material-ui/icons/FilterListOutlined";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import customSelectStyle from "assets/jss/material-kit-react/customSelectStyle.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import JobsSection from "./Sections/JobsSection.js";

import { useAuth } from "components/AuthProvider/AuthProvider.js";
import { lockRE } from "components/AuthProvider/lockRE.js";
import { search } from "superagent";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useSelectStyles = makeStyles(customSelectStyle);

export default function LandingPage(props) {
  const { state, dispatch } = useAuth();
  console.log(state);
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const { ...rest } = props;

  // state["category"] = "All";
  // state["search"] = "";

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
                    component={Link}
                    round
                    color="info"
                    size="lg"
                    // onClick={() => lockRE.show()}
                    to="/post-a-job"
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
                  component={Link}
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
              <GridItem
                md={8}
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                <Card
                  raised
                  style={{ marginTop: "50px" }}
                  // className={classes.card}
                >
                  <CardBody
                    formHorizontal
                    style={{ padding: "0.35rem 1.35rem" }}
                  >
                    <form style={{ marginBottom: "0rem" }}>
                      <GridContainer>
                        <GridItem md={1} style={{ paddingTop: "2px" }}>
                          <Button
                            size="sm"
                            justIcon
                            round
                            color="white"
                            style={{ marginLeft: "-15px" }}
                          >
                            <Search style={{ color: "#3c4858" }} />
                          </Button>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={3}
                          md={6}
                          style={{
                            paddingLeft: "0px",
                            paddingRight: "0px",
                            marginLeft: "-10px",
                          }}
                        >
                          <CustomInput
                            id="name"
                            inputProps={{
                              placeholder: "Job title, keywords, company..",
                              autoComplete: "off",
                              value: state.search,
                              onChange: (e) =>
                                dispatch({
                                  type: "SEARCH",
                                  search: e.target.value,
                                }),
                            }}
                            formControlProps={{
                              fullWidth: true,
                              style: {
                                margin: "0px",
                                padding: "5px 0 0 0",
                              },
                              // className: classes.formControl,
                            }}
                          />
                        </GridItem>
                        <GridItem
                          md={1}
                          style={{ paddingRight: "0px", paddingTop: "2px" }}
                        >
                          <Button size="sm" justIcon round color="white">
                            <Category style={{ color: "#3c4858" }} />
                          </Button>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={3}
                          md={4}
                          style={{
                            paddingRight: "0px",
                            paddingLeft: "0px",
                            paddingTop: "2px",
                          }}
                        >
                          <FormControl
                            fullWidth
                            className={selectClasses.selectFormControlCategory}
                          >
                            <InputLabel
                              htmlFor="category-select"
                              label="Select Category"
                              placeholder="Select Category"
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
                              value={state.category}
                              onChange={(e) =>
                                dispatch({
                                  type: "CATEGORY",
                                  category: e.target.value,
                                })
                              }
                              // onBlur={formik.handleBlur}
                              inputProps={{
                                name: "category",
                                id: "category-select",
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
                                  selected:
                                    selectClasses.selectMenuItemSelected,
                                }}
                                value="All"
                              >
                                All remote jobs categories
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: selectClasses.selectMenuItem,
                                  selected:
                                    selectClasses.selectMenuItemSelected,
                                }}
                                value="Software Development"
                              >
                                Software Development
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: selectClasses.selectMenuItem,
                                  selected:
                                    selectClasses.selectMenuItemSelected,
                                }}
                                value="Marketing"
                              >
                                Marketing
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: selectClasses.selectMenuItem,
                                  selected:
                                    selectClasses.selectMenuItemSelected,
                                }}
                                value="Customer Service"
                              >
                                Customer Service
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        {/* <GridItem xs={12} sm={3} md={3}> */}
                        {/* <Button
                            block
                            color="primary"
                            style={{ margin: "0px !important" }}
                            // className={classes.button}
                          >
                            Sign up
                          </Button> */}
                        {/* </GridItem> */}
                      </GridContainer>
                    </form>
                  </CardBody>
                </Card>
              </GridItem>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <JobsSection />
          {/* <ProductSection /> */}
          {/* <TeamSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
