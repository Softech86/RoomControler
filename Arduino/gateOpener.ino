#include <Servo.h>

Servo myservo;

int pos = 0;

void turn(int from, int to, int sleepTime = 15) {
  if (from < to)
    for (pos = from; pos <= to; pos += 1) {                               
      myservo.write(pos);              
      delay(sleepTime);                      
    }
  else
    for (pos = from; pos >= to; pos -= 1) {                               
      myservo.write(pos);              
      delay(sleepTime);                      
    }
}

void beep(int t) {
  for (int i = 0; i < t / 2; ++i) {
    digitalWrite(12, HIGH);
    delay(1);
    digitalWrite(12, LOW);
    delay(1);
  }
}

void beepOpen() {
  for (int i = 0; i < 40; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(1519);
    digitalWrite(12, LOW);
    delayMicroseconds(1519);
  }
  for (int i = 0; i < 50; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(1275);
    digitalWrite(12, LOW);
    delayMicroseconds(1275);
  }
  for (int i = 0; i < 60; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(956);
    digitalWrite(12, LOW);
    delayMicroseconds(956);
  }
}
void beepClose() {
  for (int i = 0; i < 60; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(956);
    digitalWrite(12, LOW);
    delayMicroseconds(956);
  }
  for (int i = 0; i < 50; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(1275);
    digitalWrite(12, LOW);
    delayMicroseconds(1275);
  }
  for (int i = 0; i < 30; ++i) {
    digitalWrite(12, HIGH);
    delayMicroseconds(1915);
    digitalWrite(12, LOW);
    delayMicroseconds(1915);
  }
}

void reset() {
  turn(0, 180);
  turn(180, 0); 
}

void setup() {
  // put your setup code here, to run once:
  myservo.attach(9);
  reset();
  pinMode(5, INPUT);
  pinMode(12, OUTPUT);

  Serial.begin(9600);
}

enum GateStatus {
  OPEN,
  CLOSE,
  OPENING,
  CLOSING
};
GateStatus g;

int JUDGE = 200;

bool low(int i) {
  return i <= JUDGE;
}

bool high(int i) {
  return i > JUDGE;
}

// low -> close
// high -> open

int openPos = 75, closePos = 150;

void loop() {
  // put your main code here, to run repeatedly:
  int i = analogRead(0);
  Serial.println(i);
  if (low(i) && g == OPEN) {
    g = CLOSING;
    beepClose();
    turn(openPos, closePos);
    g = CLOSE;
  }
  if (high(i) && g == CLOSE) {
    g = OPENING;
    beepOpen();
    turn(closePos, openPos);
    g = OPEN;
  }
  
}
