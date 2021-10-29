/*eslint-disable*/
import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Login";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import SubjectIcon from "@mui/icons-material/Subject";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { lockJS } from "components/AuthProvider/lockJS";
import { lockRE } from "components/AuthProvider/lockRE";
import { useAuth } from "components/AuthProvider/AuthProvider";

import EmailModal from "components/EmailModal/EmailModal";

import image from "assets/img/bg.jpg";
import profileImage from "assets/img/faces/avatar.jpg";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { state, dispatch, profile } = useAuth();
  const [accountType, setAccountType] = useState(0);
  const location = useLocation();

  console.log(profile);
  // console.log(JSON.parse(localStorage.getItem("authResult")));

  useEffect(() => {
    console.log(profile);
    if (state.role === "Jobseeker" && profile.sub) {
      if (profile.sub.slice(0, 6) === "google") {
        setAccountType("Google");
      } else {
        setAccountType("LinkedIn");
      }
    }
  });

  return (
    <List className={classes.list}>
      {/* Modal window, if email not verified */}
      {profile.email_verified !== undefined && !profile.email_verified && (
        <EmailModal />
      )}

      {/* Home link */}
      {state.isAuthenticated && location.pathname !== "/" && (
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/"
            className={classes.navLink}
            color="transparent"
          >
            <HomeIcon className={classes.icons} />{" "}
            <span className="right-link">Home</span>
          </Button>
        </ListItem>
      )}

      {/* Post A Job button, when on dashboard */}
      {state.isAuthenticated && state.role === "Recruiter" && (
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/post-a-job"
            className={
              location.pathname === "/post-a-job"
                ? classes.navLink + " " + classes.navLinkActive
                : classes.navLink
            }
            color="transparent"
          >
            <SubjectIcon className={classes.icons} />{" "}
            <span className="right-link">Post a Job</span>
          </Button>
        </ListItem>
      )}

      {/* For Login Button */}
      {!state.isAuthenticated && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            center
            hoverColor="info"
            noLiPadding
            buttonText={<span className="right-link">Log In </span>}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={LoginIcon}
            dropdownList={[
              <Link
                to="/#"
                onClick={() => lockRE.show()}
                className={classes.dropdownLink + " center roboto-slab"}
              >
                For Recruiter
              </Link>,
              <Link
                to="/#"
                onClick={() => lockJS.show()}
                className={classes.dropdownLink + " center roboto-slab"}
              >
                For Jobseeker
              </Link>,
              // <a href="#" target="_blank" className={classes.dropdownLink}>
              //   For Jobseeker
              // </a>,
            ]}
          />
        </ListItem>
      )}
      {/* Dashboard link */}
      {state.isAuthenticated && state.role === "Recruiter" && (
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? classes.navLink + " " + classes.navLinkActive
                : classes.navLink
            }
            color="transparent"
          >
            <DashboardIcon className={classes.icons} />{" "}
            <span className="right-link">Dashboard</span>
          </Button>
        </ListItem>
      )}
      {/* Jobs link */}
      {state.isAuthenticated && state.role === "Jobseeker" && (
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/jobs"
            className={
              location.pathname === "/jobs"
                ? classes.navLink + " " + classes.navLinkActive
                : classes.navLink
            }
            color="transparent"
          >
            <WorkIcon className={classes.icons} />
            <span className="right-link">Jobs</span>
          </Button>
        </ListItem>
      )}
      {/* For authenticated Jobseeker & Recruiter */}
      {state.isAuthenticated && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            center
            caret={true}
            hoverColor="info"
            dropdownHeader={[
              <div className="center roboto-slab dropHeader">
                Welcome,{" "}
                {state.role === "Recruiter" && profile.name !== undefined && (
                  <strong>
                    {profile["https://remoteup.io/user_metadata"].name ||
                      "Sachin"}
                    !
                  </strong>
                )}
                {state.role === "Jobseeker" && (
                  <strong> {profile.given_name || "Minith"}!</strong>
                )}
                <br />
                {state.role === "Jobseeker" &&
                  "You're on a " + accountType + " account."}
              </div>,
            ]}
            buttonText={
              <span>
                <img
                  src={profile.picture || profileImage}
                  className={classes.img}
                  alt="profile"
                />
                {"  "}
                <span className="right-link">
                  {state.role === "Jobseeker" && profile.given_name}
                  {state.role === "Recruiter" &&
                    profile["https://remoteup.io/user_metadata"] &&
                    profile["https://remoteup.io/user_metadata"].name}
                </span>
              </span>
            }
            buttonProps={{
              className: classes.navLink + " " + classes.imageDropdownButtonR,
              color: "transparent",
              round: false,
            }}
            dropdownList={[
              { divider: true },
              [
                <Link
                  to="/#"
                  onClick={() => dispatch({ type: "LOGOUT" })}
                  className={classes.dropdownLink + " center robot-slab"}
                >
                  <LogoutIcon className="logout-icon" />
                  Log Out
                </Link>,
              ],
            ]}
          />
        </ListItem>
      )}
      {/* For Notifications (Later Work)*/}
      {/* {state.isAuthenticated && (
        <ListItem className={classes.listItem + " notification"}>
          <Button
            justIcon
            simple
            href="#pablo"
            className={classes.notificationNavLink}
            onClick={(e) => e.preventDefault()}
            color="transparent"
          >
            <NotificationsIcon className="notification" />
          </Button>
        </ListItem>
      )} */}
    </List>
  );
}
