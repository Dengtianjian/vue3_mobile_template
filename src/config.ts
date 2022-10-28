const envMode: string = import.meta.env.MODE;

interface IConfig {
  APIURL: string,
  name: string,
}

const base: IConfig = {
  APIURL:  "http://127.0.0.2", //* 默认的请求地址
  name: "脚手架Scaffold" //* 站点名称
}

const development: IConfig = {
  ...base
}

const production: IConfig = {
  ...base,
  APIURL: "https://api.cooocc.com"
}

const config: Record<string, IConfig> = {
  development,
  production
}

export default config[envMode];