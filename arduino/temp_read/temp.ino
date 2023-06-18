#include "DHT.h"

#define DHT_PIN 5 // D1
#define DHT_TYPE DHT22

DHT dht(DHT_PIN, DHT_TYPE);

void setupDHT22()
{
  Serial.println("DHT22 setup");
  dht.begin();
}

void readDHT22(float &temperature, float &humidity)
{
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
}

void setupSensor()
{
  setupDHT22();
}

void readTempHumidSensor(float &temperature, float &humidity)
{
  readDHT22(temperature, humidity);
}
