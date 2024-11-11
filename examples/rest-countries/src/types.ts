export type Country = {
  name: string;
  flag: string;
  population: string;
  region: string;
  subregion: string;
  capital: string;
  currencies: { name: string }[];
  languages: { name: string }[];
  topLevelDomain: string[];
  borders: string[];
};
