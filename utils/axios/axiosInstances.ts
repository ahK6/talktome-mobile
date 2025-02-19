import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const anonAxiosApi = axios.create();
export const privateAxiosApi = axios.create();

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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2YxYTc5YTZjZmQ3NzU5MTA0MmU0NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM4NTQ1OTYxLCJleHAiOjE3Mzg1ODkxNjF9.XZBPPrRGLGNUk4aXaPfYXCHJ8gxVFt5kqI7_Oh2UqIk";

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
