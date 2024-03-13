var axios = require("axios").default;

var options = {
  method: "POST",
  url: "https://dev-34crl0ebsqxu7bk8.us.auth0.com/oauth/token",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "J6gVT41459QgJleFcrOHJAOZX1fW36gS",
    client_secret:
      "ABYS_pm2_MGJM5fHLvwnVKre-7o5XYC8s4EEmrusogJ1G2FeUWrgrlFOXGQ7gZbx",
    audience: "https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/",
  }),
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
