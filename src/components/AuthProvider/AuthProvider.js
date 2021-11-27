import React, { useEffect, useState, useReducer, useContext } from "react";
import { lockJS } from "./lockJS";
import { lockRE } from "./lockRE";

const AuthContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...action.payload,
        isAuthenticated: true,
        category: state.category,
        search: state.search,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("authResult");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
      return {
        isAuthenticated: false,
        role: "undefined",
        category: state.category,
        search: state.search,
      };
    }
    case "CATEGORY": {
      return {
        ...state,
        category: action.category,
      };
    }
    case "SEARCH": {
      return { ...state, search: action.search };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  // if (localStorage.isAuthenticated) {
  //   if (localStorage.role === "Recruiter") {
  //     lockRE.checkSession({}, function (err, authResult) {
  //       if (!err) {
  //         console.log(authResult);
  //         // dispatch({ type: "RESUME", role: "Recruiter", ...authResult });
  //         lockRE.getUserInfo(authResult.accessToken, function (error, data) {
  //           if (!error) {
  //             setProfile(data);
  //             console.log(data);
  //           } else {
  //             console.log(error);
  //           }
  //         });
  //       } else {
  //         console.log(err);
  //         // dispatch({ type: "LOGOUT" });
  //       }
  //     });
  //   } else if (localStorage.role === "Jobseeker") {
  //     lockJS.checkSession({}, function (err, authResult) {
  //       if (!err) {
  //         console.log(authResult);
  //         // dispatch({ type: "RESUME", role: "Jobseeker", ...authResult });
  //         lockJS.getUserInfo(authResult.accessToken, function (error, data) {
  //           if (!error) {
  //             setProfile(data);
  //             console.log(data);
  //           } else {
  //             console.log(error);
  //           }
  //         });
  //       } else {
  //         console.log(err);
  //         // dispatch({ type: "LOGOUT" });
  //       }
  //     });
  //   }
  // }
  let initialState;
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || {}
  );
  if (localStorage.isAuthenticated) {
    initialState = {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      role: localStorage.getItem("role"),
      category: "All",
      search: "",
      ...JSON.parse(localStorage.getItem("authResult")),
    };
  } else {
    initialState = {
      isAuthenticated: false,
      role: "undefined",
      category: "All",
      search: "",
    };
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  if (localStorage.isAuthenticated) {
    if (new Date().getTime() > localStorage.expiresAt) {
      dispatch({ type: "LOGOUT" });
    }
  }

  // lockJS.getUserInfo(state.accessToken, function (error, data) {
  //   if (!error) {
  //     // alert("hello " + profile.name);
  //     setProfile(data);
  //     console.log(data);
  //   }
  // });
  // } else if (state.role === "Recruiter") {
  //   lockRE.getUserInfo(state.accessToken, function (error, data) {
  //     if (!error) {
  //       // alert("hello " + profile.name);
  //       setProfile(data);
  //       console.log(data);
  //     }
  //   });
  // }

  console.log(state);
  console.log(profile);
  useEffect(() => {
    //   When recruiter logs in
    lockRE.on("show", function () {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      if (isSafari) {
        lockRE.hide();
        alert(
          "For Recruiter login, please don't use Safari, use Chrome or any other browser.\r\n\r\nReason: Auth0 sign-in with username password saves cookies. Due to this app being an eductional project, we don't have a domain. So, Safari will treat it as 3rd party cookie & block it."
        );
      }
    });
    lockRE.on("authenticated", function (authResult) {
      dispatch({
        type: "LOGIN",
        payload: { ...authResult, role: "Recruiter" },
      });
      console.log(authResult);
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("authResult", JSON.stringify(authResult));
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("role", "Recruiter");
      localStorage.setItem("expiresAt", expiresAt);
      lockRE.getUserInfo(authResult.accessToken, function (error, data) {
        if (!error) {
          // alert("hello " + profile.name);
          setProfile(data);
          localStorage.setItem("profile", JSON.stringify(data));
          console.log(data);
        }
      });
    });

    // When Jobseeker logs in
    lockJS.on("authenticated", function (authResult) {
      dispatch({
        type: "LOGIN",
        payload: { ...authResult, role: "Jobseeker" },
      });
      console.log(authResult);
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("authResult", JSON.stringify(authResult));
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("role", "Jobseeker");
      localStorage.setItem("expiresAt", expiresAt);
      lockJS.getUserInfo(authResult.accessToken, function (error, data) {
        if (!error) {
          // alert("hello " + profile.name);
          setProfile(data);
          localStorage.setItem("profile", JSON.stringify(data));
          console.log(data);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!state.isAuthenticated) {
      setProfile({});
    }
  }, [state.isAuthenticated]);
  const value = { state, dispatch, profile };
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
