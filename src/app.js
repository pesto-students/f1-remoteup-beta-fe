import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { IconButton } from "@material-ui/core";
import { Close as IconClose } from "@material-ui/icons";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RemoteUpLanding from "views/LandingPage/LandingPage";
import PostAJob from "views/PostAJob/PostAJob";
import Dashboard from "views/Dashboard/Dashboard";
import Jobs from "views/Jobs/Jobs";
import JobApply from "views/JobApply/JobApply";
import JobDetails from "views/JobDetails/JobDetails";
import Applicants from "views/Applicants/Applicants";
import { AuthProvider } from "components/AuthProvider/AuthProvider";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

var hist = createBrowserHistory();

const queryClient = new QueryClient();

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose
        style={{
          color: "white",
          width: "14px",
          height: "14px",
          verticalAlign: "middle",
        }}
      />
    </IconButton>
  );
}

export default function App(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider
          action={(snackbarKey) => (
            <SnackbarCloseButton snackbarKey={snackbarKey} />
          )}
          maxSnack={4}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
          style={{ marginTop: "0px" }}
        >
          <Router history={hist}>
            <Switch>
              <Route path="/post-a-job" component={PostAJob} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/applicants" component={Applicants} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/job" component={JobDetails} />
              <Route path="/apply" component={JobApply} />
              <Route path="/applicants" component={Applicants} />
              {/* <Route path="/landing-page" component={LandingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/components" component={Components} /> */}
              <Route path="/" component={RemoteUpLanding} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
