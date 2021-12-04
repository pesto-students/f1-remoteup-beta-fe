[![Netlify Status](https://api.netlify.com/api/v1/badges/3a60744f-678f-4f08-a360-7d2e2dcb6560/deploy-status)](https://app.netlify.com/sites/remote-up/deploys)

#

![RemoteUp Logo](./src/assets/img/RemoteUpLogo.png)

RemoteUp is a remote jobs board portal where jobseekers can save jobs & apply for jobs and recruiters can post jobs. It helps recruiters with an inbuilt ATS(Applicants Tracking System) at no extra cost.

Making this site gave us the opportunity to really stretch out and craft a site with great UX.

Welcome! we hope you enjoy the site as much as we enjoyed making it.

<br/>

# Table of Content

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](https://remote-up.netlify.app)

<br/>

Please Note:

1. We recommend using this app in Google Chrome
2. Use the app on Laptop/desktop only as of now.
3. We are using Auth0 for authentication, so for recruiter login, please don't use Safari, as it blocks third-party cookies.

<br/>
Test Credentials:

- For Recruiter
  - Email: remoteup.recruiter@gmail.com
  - Password: recruiter@1234
- For Jobseeker (use Google)
  - Email: remoteup.jobseeker@gmail.com
  - Password: jobseeker@1234

<br/>

Test card details:

We have integrated Stripe checkout. To post a job, you'll need to make a dummy payment on Stripe checkout. Use the following details:

- Card Number: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any random 3 digit number

<br/>

# Installation

- Fork or directly clone this repository to your local machine
- Use the `yarn` command to install dependencies
- Once the dependencies are finished installing, use the `yarn start` command inside the root directory to open the app in your local browser of choice

<br/>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

- [Material UI](https://mui.com)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://axios-http.com/docs/intro)
- [React Query](https://react-query.tanstack.com/)
- [Auth0-lock](https://github.com/auth0/lock)

<br/>

# Authors

- [Minith Jain](https://www.github.com/minithb)
- [Bhupendra Mukkirla](https://github.com/bhupen13au)

<br/>

# License

[MIT](https://opensource.org/licenses/MIT)
