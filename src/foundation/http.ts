import helper from "./helper";

type TMethods = "GET" | "POST" | "OPTIONS" | "HEAD" | "DELETE" | "PUT" | "PATCH";

export interface IResponse<ResponseData> {
  [key: string]: any,
  code: number | string,
  message: string,
  data: ResponseData,
  details: any,
  statusCode: number,
  version: string,
  result: boolean,
  headers: Headers
}

function http<ResponseData = any>(url: string, method: TMethods, query: Record<string, string> | null = null, body: BodyInit | object | Array<any> | null = null, header: Record<string, string> = {}): Promise<IResponse<ResponseData>> {
  method = method.toLowerCase() as TMethods;

  const headers = new Headers();
  headers.append("X-Ajax", "fetch");
  for (const key in header) {
    headers.append(key, header[key]);
  }
  if ((!headers.has("content-type") || !headers.has("Content-type")) && (helper.type(body) === "object" || Array.isArray(body))) {
    headers.append("content-type", " application/json; charset=utf-8");
  }
  const options: RequestInit = {
    headers,
    method: method.toUpperCase(),
    mode: "cors"
  };

  const urlObj: URL = new URL(url);
  const searchParams = new URLSearchParams(urlObj.searchParams);
  if (query) {
    for (const key in query) {
      searchParams.append(key, query[key]);
    }
  }
  searchParams.sort();
  const queryString: string = searchParams.toString();

  url = `${urlObj.origin}${urlObj.pathname}`;
  if (queryString) {
    url += `?${queryString}`;
  }

  if (method !== "GET") {
    if (helper.type(body) === "object" || Array.isArray(body)) {
      body = JSON.stringify(body);
    }
    options.body = body as BodyInit;
  }

  return new Promise<IResponse<ResponseData>>((resolve, reject) => {
    return fetch(url, options).then(async res => {
      return {
        response: res,
        text: await res.text()
      }
    }).then(({ response, text }) => {
      let responseBody: IResponse<ResponseData> = null;

      if (text) {
        responseBody = JSON.parse(text);
        responseBody['headers'] = response.headers;
      } else {
        responseBody = {
          statusCode: response.status,
          code: response.status,
          // @ts-ignore
          data: text,
          details: null,
          message: response.statusText,
          version: "",
          result: true,
          headers: response.headers
        }
      }

      if (responseBody.statusCode > 299) {
        responseBody['result'] = false;
        reject(responseBody);
      } else {
        responseBody['result'] = true;
        resolve(responseBody);
      }
    });
  });
}

export function get<ResponseData = any>(url: string, query: Record<string, string>, headers: Record<string, string> = {}) {
  return http(url, "GET", query, null, headers);
}

export function post<ResponseData = any>(url: string, body: BodyInit | object | Array<any> | null = null, query: Record<string, string>, headers: Record<string, string> = {}) {
  return http(url, "POST", query, body, headers);
}

export function put<ResponseData = any>(url: string, body: BodyInit | object | Array<any> | null = null, query: Record<string, string>, headers: Record<string, string> = {}) {
  return http(url, "PUT", query, body, headers);
}

export function patch<ResponseData = any>(url: string, body: BodyInit | object | Array<any> | null = null, query: Record<string, string>, headers: Record<string, string> = {}) {
  return http(url, "PATCH", query, body, headers);
}

export function del<ResponseData = any>(url: string, body: BodyInit | object | Array<any> | null = null, query: Record<string, string>, headers: Record<string, string> = {}) {
  return http(url, "DELETE", query, body, headers);
}

export default http;