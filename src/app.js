import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { IconButton } from "@material-ui/core";
import { Close as IconClose } from "@material-ui/icons";
import SuccessIcon from "@mui/material/internal/svg-icons/SuccessOutlined";

// pages for this product
import RemoteUpLanding from "views/LandingPage/LandingPage";
import PostAJob from "views/PostAJob/PostAJob";
import Dashboard from "views/Dashboard/Dashboard";
import Jobs from "views/Jobs/Jobs";
import JobApply from "views/JobApply/JobApply";
import JobDetails from "views/JobDetails/JobDetails";
import Applicants from "views/Applicants/Applicants";
import EditAJob from "views/EditAJob/EditAJob";

import { AuthProvider } from "components/AuthProvider/AuthProvider";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";

var hist = createBrowserHistory();

export const queryClient = new QueryClient();

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose
        style={{
          color: "#3c4858",
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SnackbarProvider
            iconVariant={{
              success: (
                <SuccessIcon
                  style={{
                    marginRight: "10px",
                    marginLeft: "-5px",
                    color: "#4caf50",
                  }}
                />
              ),
            }}
            action={(snackbarKey) => (
              <SnackbarCloseButton snackbarKey={snackbarKey} />
            )}
            maxSnack={1}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
            style={{
              fontFamily: "Roboto Slab",
              backgroundColor: "white",
              borderLeftColor: "#4caf50",
              borderLeftWidth: "0.382rem",
              borderLeftStyle: "solid",
              color: "#3c4858",
            }}
          >
            <Router history={hist}>
              <Switch>
                <Route path="/post-a-job" component={PostAJob} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/jobs" component={Jobs} />
                <Route path="/job/:jobId" component={JobDetails} />
                <Route path="/apply/:jobId" component={JobApply} />
                <Route path="/applicants/:jobId" component={Applicants} />
                <Route path="/edit/:jobId" component={EditAJob} />
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
    </ErrorBoundary>
  );
}
