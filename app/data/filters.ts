import type { Category, Hardware, Platform } from "@/types";

export const hardwareDict: Record<Hardware, string> = {
  pc: "Personal computer",
  phone: "Smartphone",
  server: "Server",
  sdr: "SDR",
  weather_station: "Weather station",
  lora: "LoRa",
  camera: "Camera",
  microphone: "Microphone",
  uav: "UAV",
  geiger_counter: "Geiger counter",
  air_quality_monitor: "Air quality monitor",
  lightning_detector: "Lighting detector",
  noise_sensor: "Noise sensor",
};

export const categoriesDict: Record<Category, string> = {
  writing: "Writing",
  software: "Running software",
  hardware: "Hosting hardware",
  data: "Data preparation",
  audio: "Audio",
  graphics: "Graphics",
  photos: "Photos",
  translation: "Translation",
  location: "Location-based data",
  science: "Science",
};

export const platformsDict: Record<Platform, string> = {
  web: "Web",
  android: "Android",
  ios: "iOS",
  linux: "GNU/Linux",
  windows: "Windows",
  macos: "macOS",
  esp32: "ESP32",
  nrf52: "nRF52",
};
