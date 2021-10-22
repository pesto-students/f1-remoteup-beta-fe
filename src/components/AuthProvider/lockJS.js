import Auth0Lock from "auth0-lock";
import { useAuth } from "./AuthProvider";

const AUTH_CONFIG_JS = {
  domain: "remoteup-jobseeker.us.auth0.com",
  clientId: "3zYB2hIqezjK8Dxo9qA2js42ZGCXC2ft",
  // callbackUrl: "http://localhost:4040/",
  // container: "auth0-login-container",
};

const lockJS = new Auth0Lock(
  process.env.REACT_APP_AUTH0_CLIENT_ID_JS,
  process.env.REACT_APP_AUTH0_DOMAIN_JS,
  {
    auth: {
      redirect: false,
      responseType: "token id_token",
      // redirectUrl: "http://localhost:3000/",
      sso: false,
      autoParseHash: true,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE_JS,
    },
    languageDictionary: {
      title: "Log In as Jobseeker",
      signUpTitle: "Sign Up as Jobseeker",
      loginWithLabel: "Log In with %s",
    },
    autoclose: true,
    allowSignUp: true,
    allowShowPassword: true,
    //allowedConnections: ["Username-Password-Authentication"],
    allowedConnections: ["google-oauth2", "linkedin"],
    // container: AUTH_CONFIG.container,
    theme: {
      logo: "https://drive.google.com/uc?export=view&id=1-Z7gjMlh9R_f0YcppuReWog4EaVeV67E",
      primaryColor: "#00acc1",
      labeledSubmitButton: false,
    },
  }
);

function isAuthenticated_JS() {
  // Check whether the current time is past the access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem("expires_at_JS"));
  return new Date().getTime() < expiresAt;
}

export { lockJS, isAuthenticated_JS };
