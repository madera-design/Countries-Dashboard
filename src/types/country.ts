export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  population: number;
  region: string;
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
}