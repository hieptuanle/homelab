#define LED_PIN D3

void setupLED()
{
  pinMode(LED_PIN, OUTPUT);
}

void turnOnLED()
{
  digitalWrite(LED_PIN, HIGH);
}

void turnOffLED()
{
  digitalWrite(LED_PIN, LOW);
}