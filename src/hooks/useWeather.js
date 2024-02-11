import { useEffect, useState } from "react";

const useWeather = () => {
    const [weatherData, setWeatherData] = useState({
        location: "",
        climate: "",
        temperature: "",
        maxTemperature: "",
        minTemperature: "",
        humidity: "",
        cloudPercentage: "",
        wind: "",
        time: "",
        longitude: "",
        latitude: "",
    });
    const [loading, setLoading] = useState({
        state: false,
        message: "",
    });
    const [error, setError] = useState(false);

    const fetchWeatherData = async (latitude, longitude) => {
       
        try {
            setLoading({
                ...loading,
                state: true,
                message: "Loading...",
            });
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`);
            if (!response.ok) {
                throw new Error(`Something Bad Happened! status: ${response.status}`);
            }
            const data = await response.json();
            
            setWeatherData({
                ...weatherData,
                location: data.name,
                climate: data.weather[0].main,
                temperature: data.main.temp,
                maxTemperature: data.main.temp_max,
                minTemperature: data.main.temp_min,
                humidity: data.main.humidity,
                cloudPercentage: data.clouds.all,
                wind: data.wind.speed,
                time: data.dt,
                longitude: data.coord.lon,
                latitude: data.coord.lat,
            });
        } catch (error) {
            setError(error);
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: "",
            });
        }
    };

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: "Fetching Location...",
        });
        navigator.geolocation.getCurrentPosition((position) => {
            fetchWeatherData(position.coords.latitude, position.coords.longitude);
        });
    }, []);
    return { weatherData, loading, error };
};

export default useWeather;
