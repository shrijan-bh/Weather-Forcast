interface Temperature{
    temp: number;
}

interface Weather{
    main: string;
    icon: string;
}

interface ApiData {
    name: string;
    main: Temperature;
    weather: Weather[];
}

export default ApiData;