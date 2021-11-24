import Auth0Lock from "auth0-lock";
import { useAuth } from "./AuthProvider";

const AUTH_CONFIG_RE = {
  domain: "remoteup-recruiter.au.auth0.com",
  clientId: "unShVL6Aw4XlWEfhEV4wUqyfOTZDbBuw",
  // callbackUrl: "http://localhost:4040/",
  // container: "auth0-login-container",
};

const lockRE = new Auth0Lock(
  process.env.REACT_APP_AUTH0_CLIENT_ID_RE,
  process.env.REACT_APP_AUTH0_DOMAIN_RE,
  {
    additionalSignUpFields: [
      {
        name: "name",
        placeholder: "Name",
        validator: function (name) {
          return {
            valid: name.length >= 3,
            hint: "Must have 3 or more characters",
          };
        },
      },
    ],
    auth: {
      redirect: true,
      responseType: "token id_token",
      // redirectUrl: "http://localhost:3000/",
      sso: false,
      autoParseHash: true,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE_RE,
    },
    languageDictionary: {
      // emailInputPlaceholder: "name@companyName.com",
      title: "Log In as Recruiter",
      signUpTitle: "Sign Up as Recruiter",
      loginWithLabel: "%s",
      passwordInputPlaceholder: "Password: recruiter@1234",
      emailInputPlaceholder: "Email: remoteup.recruiter@gmail.com",
    },
    autoclose: true,
    allowSignUp: true,
    allowShowPassword: true,
    //allowedConnections: ["google-oauth2", "linkedin"],
    allowedConnections: ["Username-Password-Authentication"],
    prefill: {
      email: "remoteup.recruiter@gmail.com",
    },
    // container: AUTH_CONFIG.container,
    theme: {
      // logo: "https://drive.google.com/uc?export=view&id=1-Z7gjMlh9R_f0YcppuReWog4EaVeV67E",
      logo: "https://cdn.jsdelivr.net/gh/pesto-students/f1-remoteup-beta-fe@master/src/components/AuthProvider/RemoteUp.png",
      primaryColor: "#00acc1",
      labeledSubmitButton: false,
    },
  }
);

// lockRE.on("authenticated", function (authResult) {
//   const { state, dispatch } = useAuth();
//   dispatch({ type: "LOGIN", payload: { role: "Jobseeker" } });
//   let expiresAt = JSON.stringify(
//     authResult.expiresIn * 1000 + new Date().getTime()
//   );
//   localStorage.setItem("access_token_RE", authResult.accessToken);
//   localStorage.setItem("id_token_RE", authResult.idToken);
//   localStorage.setItem("expires_at_RE", expiresAt);
//   localStorage.setItem("loggedIn_RE", true);
// });

function isAuthenticated_RE() {
  // Check whether the current time is past the access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem("expires_at_RE"));
  return new Date().getTime() < expiresAt;
}

export { lockRE, isAuthenticated_RE };
