import TemperatureIcon from '@/assets/temperature.png';
import LumIcon from '@/assets/luminosity.png';
import HumIcon from '@/assets/humidity.png';
import PrecipIcon from '@/assets/precipitation.png';
import HeadIcon from '@/assets/wind_head.png';
import SpeedIcon from '@/assets/wind_speed.png';
import PressIcon from '@/assets/pressure.png';

export function useSensorIcons(sensor) {
  const sensorIcon = {
    rain: PrecipIcon,
    temperature: TemperatureIcon,
    humidity: HumIcon,
    pressure: PressIcon,
    wind_speed_avg: SpeedIcon,
    wind_heading: HeadIcon,
    luminosity: LumIcon,
  };

  return sensorIcon[sensor];
}