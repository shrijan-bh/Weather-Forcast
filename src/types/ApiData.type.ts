interface Temperature {
  temp: number;
}

interface Weather {
  main: string;
  icon: string;
}

interface ApiData {
  name: string;
  main: Temperature;
  weather: Weather[];
  sys: { id: number };
  cod: number;
  id: number;
}

export default ApiData;
