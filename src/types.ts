export type Plugin = (data: any, domainName?: string) => any;

export type Plugins = {
  request?: Plugin[];
  response?: Plugin[];
};

export interface GlobalConfiguration {
  baseUrl?: string;
  version?: string;
  accessToken?: string;
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
  plugins?: Plugins;
  fetchOptions?: RequestInit;
}

export interface LocalConfiguration {
  version?: string;
  plugins?: Plugins;
  fetchAll?: boolean;
  fetchOptions?: RequestInit;
}

export interface Configuration extends Omit<GlobalConfiguration, 'accessToken'>, LocalConfiguration {}
