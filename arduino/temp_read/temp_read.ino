unsigned long lastTempCheck = 0;
unsigned long lastMotionCheck = 0;

void setup()
{
  Serial.begin(74880);
  setupSensor();
  setupMotionSensor();
  setupWifi();
  setupLED();
}

void loop()
{
  unsigned long currentMillis = millis();

  if (currentMillis - lastTempCheck >= 30000)
  {
    Serial.println("Checking temperature");
    lastTempCheck = currentMillis;
    float temp, humidity;
    readTempHumidSensor(temp, humidity);
    sendTemperature(temp, humidity, "DHT22");
    Serial.print("Temperature: ");
    Serial.println(temp);
    Serial.print("Humidity: ");
    Serial.println(humidity);

    Serial.println("Temperature sent to server");
  }

  if (currentMillis - lastMotionCheck >= 1000)
  {
    Serial.println("Checking motion");
    // It's been 1 second since the last PIR check
    lastMotionCheck = currentMillis;
    int motion;
    readMotionSensor(motion);
    if (motion == HIGH)
    {
      Serial.println("Motion detected");
      turnOnLED();
    }
    else
    {
      Serial.println("Motion not detected");
      turnOffLED();
    }
  }

  delay(1000); // Wait for 1 second
}