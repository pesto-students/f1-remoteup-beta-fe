import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header";
import Progress from "components/Progress/Progress";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import HeaderLinks from "components/Header/HeaderLinks";
import ScrollToTopOnMount from "components/ScrollToTopOnMount/ScrollToTopOnMount";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);
const dashboardRoutes = [];

export default function Loading(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="info"
        routes={dashboardRoutes}
        brand="RemoteUp"
        rightLinks={<HeaderLinks />}
        fixed
      />
      <ScrollToTopOnMount />
      <div className={classNames(classes.mainDiv)}>
        <div className={classes.container} style={{ minHeight: "900px" }}>
          <GridContainer
            style={{
              color: "#3C4858",
            }}
            justify="start"
            alignItems="center"
          >
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ marginTop: "150px", textAlign: "center" }}
            >
              <Progress />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
