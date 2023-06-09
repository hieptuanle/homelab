#include <Wire.h>
#include <ArtronShop_SHT3x.h>

ArtronShop_SHT3x sht3x(0x44, &Wire);

#define LM35_PIN A0 // ADC0 pin
#define SCL_PIN 5   // D1

void setupSHT3x()
{
  Wire.begin();
  while (!sht3x.begin())
  {
    Serial.println("SHT3x not found !");
    delay(1000);
  }
}

void readtSHT3x(float &temperature, float &humidity)
{
  if (sht3x.measure())
  {
    temperature = sht3x.temperature();
    humidity = sht3x.humidity();
  }
  else
  {
    Serial.println("SHT3x read error");
  }
}

float getLM35Temp()
{
  float voltage = analogRead(LM35_PIN) / 1023.0 * 3.3; // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - VCC)
  float temperature = voltage * 100;                   // Convert the voltage to a temperature
  return temperature;
}