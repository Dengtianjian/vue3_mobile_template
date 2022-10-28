import { showToast } from "vant";
import config from "../config";
import http, { IResponse } from "./http";

type TMethods = "GET" | "POST" | "OPTIONS" | "HEAD" | "DELETE" | "PUT" | "PATCH";

class Request {
  constructor(prefix: string, baseUrl: string = null, pipes = []) {
    this.#pipes = pipes;
    this.#prefix = prefix;
    this.#baseUrl = baseUrl ?? config.APIURL;
  }
  #prefix: string = "";
  #baseUrl: string = "";
  #pipes: string[] = [];

  #genUrl(uri: string | string[]): string {
    uri = Array.isArray(uri) ? uri : [uri];
    return [this.#baseUrl, this.#prefix, ...uri].filter(item => item.trim()).join("/");
  }

  static genAttachmentUrl(fileId: string): string {
    return config.APIURL + "/downloadAttachment?fileId=" + encodeURI(fileId);
  }

  pipes(pipeName: string | string[]): Request {
    this.#pipes.push(...Array.isArray(pipeName) ? pipeName : [pipeName]);
    return this;
  }
  #tokenHandle(headers: Headers): void {
    if (headers.has("Authorization")) {
      const token: string = headers.get("Authorization");
      if (token) {
        const tokenValue: string = token.slice(0, token.lastIndexOf("/"));
        const tokenExpiration: string = (Number(token.slice(token.lastIndexOf("/") + 1)) * 1000).toString();

        if (!localStorage.getItem("F_Token") || localStorage.getItem("F_Token") !== tokenValue) {
          localStorage.setItem("F_Token", tokenValue);
          localStorage.setItem("F_TokenExpiration", tokenExpiration);
        }
      } else {
        localStorage.removeItem("F_Token");
        localStorage.removeItem("F_TokenExpiration");
      }
    }
  }
  send<ResponseData>(uri: string = "", method: TMethods = "GET", query: Record<string, string> = {}, body: BodyInit | object | null = null): Promise<ResponseData> {
    if (this.#pipes.length) {
      if (method === "GET") {
        query['_pipes'] = this.#pipes.join(",");
      } else {
        if (Array.isArray(body)) {
          query['_pipes'] = this.#pipes.join(",");
        } else {
          body['_pipes'] = this.#pipes;
        }
      }
    }

    const headers = {}
    if (localStorage.getItem("F_Token")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("F_Token")}`;
    }

    //@ts-ignore ：忽略78行导致的错误 //* 错误需要返回整个响应体
    return http<ResponseData>(this.#genUrl(uri), method, query, body, headers).then(res => {
      this.#tokenHandle(res.headers);

      if (res.result) {
        return res.data;
      }

      if (res.statusCode >= 500) {
        showToast("服务器错误");
      }


      return res;
    }).finally(() => {
      this.#pipes = [];
    });
  }

  get<ResponseData>(uri: string = "", query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "GET", query);
  }
  post<ResponseData>(uri: string = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "POST", query, body);
  }
  delete<ResponseData>(uri: string = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "DELETE", query, body);
  }
  patch<ResponseData>(uri: string = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "PATCH", query, body);
  }
  put<ResponseData>(uri: string = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "PUT", query, body);
  }
  upload<ResponseData = any>(uri: string, file: File, body: Record<string, string> = {}) {
    const F: FormData = new FormData();
    for (const key in body) {
      F.append(key, body[key]);
    }
    F.append("file", file);

    return this.post<ResponseData>(uri, F, {});
  }
}

export default Request;