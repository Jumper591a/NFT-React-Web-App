import swag_logo_1 from "../images/swag_logo_1.png";

const axios = require("axios");
const fs = require("browserify-fs");
const FormData = require("form-data");
const pinata_api_key = process.env.REACT_APP_PINATA_API_KEY;
const pinata_secret_api_key = process.env.REACT_APP_PINATA_SECRET_API_KEY;

export const testAuthentication = () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key,
      },
    })
    .then(function (response) {
      //handle your response here
      console.log("Response: ", response);
    })
    .catch(function (error) {
      //handle error here
      console.log("error: ", error);
    });
};

export const pinFileToIPFS = (metadata = "", image = "") => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let file;
  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  if (image) {
    console.log(typeof image, "image", image);
    const blob = new Blob(["foo"]);
    const stream = blob.stream();
    const reader = stream.getReader();

    data.append("file", fs.createReadStream(reader));
    console.log("data", data);
  }
  if (metadata) {
    // file = new Blob([metadata], { type: "text/plain" });
    const metadata_formatted = JSON.stringify(metadata);
    data.append("pinataMetadata", metadata_formatted);
  }

  //   pinataOptions are optional
  //   const pinataOptions = JSON.stringify({
  //     cidVersion: 0,
  //     customPinPolicy: {
  //       regions: [
  //         {
  //           id: "FRA1",
  //           desiredReplicationCount: 1,
  //         },
  //         {
  //           id: "NYC1",
  //           desiredReplicationCount: 2,
  //         },
  //       ],
  //     },
  //   });
  //   data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${15}`,
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key,
      },
    })
    .then(function (response) {
      //handle response here
      console.log("pinning response", response);
    })
    .catch(function (error) {
      //handle error here
      console.log("pinning error", error);
    });
};

export const pinJSONToIPFS = (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(
        "JSON pinning response",
        response,
        "IPFShash",
        response.data["IpfsHash"]
      );
    })
    .catch(function (error) {
      //handle error here
      console.log("JSON pinning error", error);
    });
};
