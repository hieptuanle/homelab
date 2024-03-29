#include <ESP8266WiFi.h>
#include "WifiCredentials.h"

const char *ssid = WIFI_SSID;         // Your WiFi SSID
const char *password = WIFI_PASSWORD; // Your WiFi password

const char *host = SERVER_ADDRESS; // Your web server address
const int httpPort = SERVER_PORT;  // Your web server port (usually 80)

void setupWifi()
{
  delay(10);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void sendTemperature(float temp, float humidity, const char *sensor)
{
  // Connect to the server
  WiFiClient client;
  if (!client.connect(host, httpPort))
  {
    Serial.println("connection failed");
    return;
  }

  // Send the temperature data to the server
  String url = "/data";
  url += "?temperature=";
  url += temp;
  url += "&sensor=";
  url += sensor;
  url += "&humidity=";
  url += humidity;

  client.print(String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");

  // Wait for the server's response
  while (client.available())
  {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
}