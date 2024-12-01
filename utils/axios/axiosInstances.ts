import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const anonAxiosApi = axios.create({
  timeout: 20000,
  timeoutErrorMessage: "ERROR_TIMEOUT_ANONAPI",
});
export const privateAxiosApi = axios.create({
  timeout: 20000,
  timeoutErrorMessage: "ERROR_TIMEOUT_PRIVATENAPI",
});

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const anonRequestInterceptor = async (
  request: InternalAxiosRequestConfig<any>
) => {
  if (__DEV__) {
    console.log("\n\n\n\n\n");
    console.log(
      `[AnonApiRequest] method=${request.method}, url=${request.url}\n`,
      "data: ",
      JSON.stringify(request.data, null, 2)
    );
    console.log("\n\n\n\n\n");
  }
  return request;
};

const anonResponseInterceptor = async (response: AxiosResponse) => {
  if (__DEV__) {
    console.log("\n\n\n\n\n");
    console.log(
      `[AnonApiResponse] status=${response.status}, url=${response.config.url}\n`,
      "data: ",
      JSON.stringify(response.data, null)
    );
    console.log("\n\n\n\n\n");
  }
  return response;
};

const privateRequestInterceptor = async (
  request: InternalAxiosRequestConfig<any>
) => {
  //
  // Para incluir sesión
  //
  // await setAuthHeader();
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IktBTW9rQm92Yk5BOGFWTjUyaVZEWHciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MjY1ODU5MDMsImV4cCI6MTcyNjY3MjMwMywiaXNzIjoiaHR0cHM6Ly9mc24tb2F1dGguYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOlsiaHR0cHM6Ly9mc24tb2F1dGguYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwiZWNvbV9jdXN0b21lcnNfYXBpIiwiZWNvbV96b25lc19hcGkiLCJlY29tX2NhdGVnb3J5X2FwaSIsImVjb21fYnJhbmNoX29mZmljZXNfYXBpIiwiZWNvbV9wcm9kdWN0c19hcGkiLCJlY29tX2JyYW5kX2FwaSIsImVjb21fc2VsZWN0b3JzX2FwaSIsImVjb21fcHJvZHVjdHNfcHJpY2VzX2FwaSIsImVjb21fcHJvZHVjdHNfYWxsb3dlZF9xdWFudGl0aWVzX2FwaSIsImVjb21fYXZhaWxhYmlsaXRpZXNfYXBpIiwiZWNvbV9kZWxpdmVyeWRhdGVfYXBpIiwiZWNvbV9pbnZlbnRvcnlfY291cG9uc19hcGkiLCJlY29tX3Byb2R1Y3RfZ3JvdXBzIiwiZWNvbV9vcmRlcnNfYXBpIiwiZWNvbV9wcm9tb3NfYXBpIiwiZWNvbV9leHBsb3JhdGlvbl9hcGkiLCJiaXRkZXNrX211bHRpbWVkaWEiLCJlY29tX2Zhdm9yaXRlc19hcGkiLCJlY29tX2Zzbl9leHRlcm5hbF9hcGkiLCJlY29tX3BheW1lbnRzX2FwaSJdLCJjbGllbnRfaWQiOiJzYW5uaWNvLWJsYXpvciIsInN1YiI6IjA4ZjQ2N2JkLTRlMGYtNGU0ZS1iNGRhLTcyYmQyZGZhNjRkMSIsImF1dGhfdGltZSI6MTcyNjU4NTkwMSwiaWRwIjoibG9jYWwiLCJyb2xlIjpbImRlbGV0ZS1hcmVhIiwiQWRtaW5pc3RyYU1wb3MiLCJUcmFuc3BvcnRpc3RhIiwiQWRtaW5pc3RyYXJPcmdhbml6YWNpb24iLCJBUElfVHJhbnNhY2Npb25lcyIsIndyaXRlLWdsb2JhbGFnZW50c3RhdHVzIiwiQWRtaW5Eb2N1bWVudHMiLCJzdWJzY3JpcHRpb25fYWRtaW4iLCJBZG1pbiIsInBydWViYVdvbXBpIiwid3JpdGUtYWdlbnRncm91cHMiLCJwY19FamVjdXRpdm8iLCJTdG9yZXNBZG1pbiIsImJpdGRlc2tfYWRtaW4iLCJNcG9zQWRtaW4iLCJzdXJ2ZXlfYWRtaW4iLCJyZWFkLWFnZW50c3RhdHVzIiwiYWRtaW5WZW5kZWRvcmVzIiwid3JpdGUtYWdlbnRzdGF0dXMiLCJyZWFkLWFnZW50Z3JvdXBzIiwicmVhZC1hZ2VudCIsInBjX1Jlc3BvbnNhYmxlVGFyZWEiLCJWZW50YXNBZG1pbiIsInBheW1lbnRfYWRtaW4iLCJFY29tbWVyY2VBZG1pbiIsIlNvbGljaXRhck1wb3MiLCJ3cml0ZS1hZ2VudCIsIkNvbWVyY2lvQWRtaW4iLCJwcnVlYmFzIiwiM2RzVHJhbnNhY3Rpb25zIiwid29tcGlBZG1pbiIsInBjX0xpZGVyUmVxdWVyaW1pZW50byIsImRlbGV0ZS1hZ2VudCJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlY29tX2N1c3RvbWVyc19hcGkiLCJlY29tX3pvbmVzX2FwaSIsImVjb21fY2F0ZWdvcnlfYXBpIiwiZWNvbV9icmFuY2hfb2ZmaWNlc19hcGkiLCJlY29tX3Byb2R1Y3RzX2FwaSIsImVjb21fYnJhbmRfYXBpIiwiZWNvbV9zZWxlY3RvcnNfYXBpIiwiZWNvbV9wcm9kdWN0c19wcmljZXNfYXBpIiwiZWNvbV9wcm9kdWN0c19hbGxvd2VkX3F1YW50aXRpZXNfYXBpIiwiZWNvbV9hdmFpbGFiaWxpdGllc19hcGkiLCJlY29tX2RlbGl2ZXJ5ZGF0ZV9hcGkiLCJlY29tX2ludmVudG9yeV9jb3Vwb25zX2FwaSIsImVjb21fcHJvZHVjdF9ncm91cHMiLCJlY29tX29yZGVyc19hcGkiLCJlY29tX3Byb21vc19hcGkiLCJlY29tX2V4cGxvcmF0aW9uX2FwaSIsImJpdGRlc2tfbXVsdGltZWRpYSIsImVjb21fZmF2b3JpdGVzX2FwaSIsImVjb21fZnNuX2V4dGVybmFsX2FwaSIsImVjb21fcGF5bWVudHNfYXBpIl0sImFtciI6WyJwd2QiXX0.TEbkFGhlEfoPbA-2_13qp-IkeN_KIMWAa8Mj4oT01bDlN9jykyaMNNBrk1QXLkopvqGgor0sQ27Ed1pBiIOYZVsO82ne7XexBe2WiqHngnSY4LTst8r-XHPNyTn0Zkys0-m7kpCTUwZGypqYiEI8Ebdx0X8GWdO0kYctl0F8cWIMB-J8Cl_iZCssjpb93lwtRAXbyzbgJ5t1vl5zxXY-JJRN1fYDwXpZkhdozHNULTWIA_dNFDvkGOnTmXsEjdAdeX8YmKHcOhOk917bGJp-LW61xFkByKgsdhLiRSmnGACevnAyRzC81nJ4QueNbhW4NPNIJ1642gljwDstTfWI2Q";

  // if (!!store.getState().customers.loggedInfo?.data?.access_token) {
  request.headers.Authorization = `Bearer ${token}`;
  // }

  if (__DEV__) {
    console.log("\n\n\n\n\n");
    console.log(
      `[private request] method=${request.method}, url=${request.url}\n`,
      "data: ",
      JSON.stringify(request.data, null, 2)
    );
    console.log("\n\n\n\n\n");
  }
  return request;
};

const throwException = (
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any => {};

const privateResponseInterceptor = async (response: AxiosResponse) => {
  if (__DEV__) {
    console.log("\n\n\n\n\n");

    console.log("\n\n\n\n\n");
  }
  return response;
};

const onError = (error: any) => {
  if (__DEV__) {
    console.log("\n\n\n\n\n");
    console.log(`[AnonApiError]`, JSON.stringify(error, null, 2));
    console.log("\n\n\n\n\n");
  }
  return error;
};

anonAxiosApi.interceptors.request.use(anonRequestInterceptor);
anonAxiosApi.interceptors.response.use(anonResponseInterceptor);

privateAxiosApi.interceptors.request.use(privateRequestInterceptor);
privateAxiosApi.interceptors.response.use(privateResponseInterceptor);
