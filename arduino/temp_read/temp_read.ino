void setup()
{
  Serial.begin(74880);
  setupSHT3x();
  setupWifi();
}

void loop()
{
  float sht3xTemp, sht3xHumidity;
  readtSHT3x(sht3xTemp, sht3xHumidity);
  sendTemperature(sht3xTemp, sht3xHumidity, "SHT3x");
  Serial.print("SHT3x Temperature: ");
  Serial.println(sht3xTemp);
  Serial.print("SHT3x Humidity: ");
  Serial.println(sht3xHumidity);
  float lm35Temp = getLM35Temp();
  Serial.print("LM35 Temperature: ");
  Serial.println(lm35Temp);
  Serial.println("Sending temperature to server...");
  sendTemperature(lm35Temp, 0, "LM35");
  Serial.println("Temperature sent to server");
  delay(2000); // Wait for 2 seconds
}