“AI-Powered Women Safety & Smart Route Analysis System”
Problem Statement

Women often face safety issues during:

public transport travel,
late-night commuting,
isolated road usage,
poorly lit areas.

Existing safety apps mostly provide:

SOS calling,
live location sharing.

But they do NOT:

predict unsafe zones,
analyze distress movement,
create community safety intelligence,
provide behavioral safety monitoring.

Our project attempts to bridge that gap.

Our Solution

We developed a prototype system that combines:

wearable safety sensing,
GPS tracking,
distress detection,
community safety mapping,
real-time route monitoring.

The system can:

detect sudden abnormal movement,
trigger SOS alerts,
track live location,
mark unsafe areas on a digital map.
Core Concept

The project has two connected parts:

1. Smart Safety Wearable

Using sensors attached to a wearable prototype/shoe:

motion is continuously monitored,
sudden falls or panic movements are detected.

If abnormal movement occurs:

the system triggers an alert.
2. Smart Safety Mapping System

The collected GPS data is used to:

display live location,
identify unsafe zones,
create safety markers on maps.

In future versions:

repeated distress signals from the same location
can generate AI-based danger heatmaps.
Hardware Used

We used:

ESP32 / Arduino Uno
→ Main controller
MPU6050
→ Detects sudden movement and falls
NEO-6M GPS Module
→ Provides live GPS location
Push Button
→ Manual SOS trigger
LED/Buzzer
→ Alert indication
Software Used
Arduino IDE
→ Hardware programming
Trae AI
→ Assisted development and debugging
Google Maps API
→ Live map integration
Firebase
→ Real-time data transfer and storage
How It Works
Step 1

The wearable continuously reads movement data from the MPU6050 sensor.

Step 2

The GPS module tracks live coordinates.

Step 3

If:

sudden movement,
panic motion,
or SOS button press

is detected,

the system sends:

alert status,
GPS coordinates,
to the connected dashboard.
Step 4

The web dashboard displays:

user location,
unsafe area markers,
alert notifications.
Innovation Aspect

What makes this project different is that it combines:

wearable technology,
IoT,
urban safety analysis,
behavioral distress detection,
and mapping systems

into a single scalable platform.

Instead of reacting only AFTER danger occurs,
the long-term vision is to create:

predictive urban safety intelligence.

Future Scope

Future upgrades can include:

AI-based danger prediction
crime dataset integration
machine learning safety analysis
smart-city integration
women safety heatmaps
wearable ecosystem expansion
Practical Impact

This system can help:

women commuters,
students,
late-night workers,
smart-city planners,
transport authorities.

It can contribute toward:

safer navigation,
data-driven urban planning,
and faster emergency response.
Final Closing Line

“Our goal is not just building another safety app.
We aim to create a scalable intelligent safety ecosystem that combines human reporting, wearable sensing, and real-time urban analytics to improve public safety.”
