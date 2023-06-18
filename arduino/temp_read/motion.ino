#define SR505_PIN D2

void setupSR505()
{
  pinMode(SR505_PIN, INPUT);
}

void readSR505(int &motion)
{
  motion = digitalRead(SR505_PIN);
}

void setupMotionSensor()
{
  setupSR505();
}

void readMotionSensor(int &motion)
{
  readSR505(motion);
}