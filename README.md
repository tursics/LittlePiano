# Little Piano

Der Titel ist noch temporär und wird sich bestimmt noch ändern.

# Beschreibung

Dieses Projekt ist mein Beitrag zu [Coding da Vinci](http://codingdavinci.de/). Ich hatte zehn Wochen vom 25. April bis 5. Juli 2015 zeigt gehabt diesesn Prototypen zu entwickeln.

Die Notenrollen für selbstspielende Klaviere sind so etwas wie die MP3s für Computer. Nur halt schon 100 Jahre alt. In den alten Patentbeschreibungen findet man Zeichnungen von 2 Klavieren mit Kurbelantrieb, die diese Notenrollen benutzen.

# Die Idee

Das Handy ist die Kurbel. Wenn man es dreht spielt die Musik. Das Problem: Die Notenrollen sind bisher nur abfotografiert, es gibt noch keine MP3-Dateien davon. Man muss im Internet "passende Platzhaltermusik" finden und die Bilder der Notenrollen anzeigen (man muss die Daten ja irgendwie benutzen). Ganze Notenrollen wurden auch nicht eingescannt, nur ein paar Zentimeter vom Anfang.

Die Bilder der Patente beschreiben gut, worum es hier geht - und das früher solche Klaviere existierten. Man könnte sie als Hilfe/Intro nehmen und für die Präsentation.

# Datenauswahl

* [Notenrollen](http://codingdavinci.de/daten/#deutsches-museum) für selbstspielende Klaviere des Deutschen Museums
* [Patentbeschreibungen und ­zeichnungen](http://codingdavinci.de/daten/#landesarchiv-baden-w%C3%BCrttemberg) des Landesarchiv Baden-Württemberg

# App

Die App wird erstmal nur im Browser laufen. Weitere Schritte kommen später. Eine Testversion befindet sich unter http://tursics.de/sample/piano/

# Testgeräte

* iOS 8 auf einem iPad 3 (Browser)
  * Sound-Dateien können nicht rückwärts abgespielt werden
* BlackBerry OS 10 auf einem Z10 (Browser)
  * UNGEEIGNET
  * Geschwindigkeitsänderungen führen zu Stille von ca. 3 Sekunden und anschließender neuer Geschwidigkeit
  * NoSleep-Lib funktioniert nicht: Der Bildschirm geht ständig aus
* Android 2.x auf einem Sony Ericsson Xperia (Browser)
  * UNGEEIGNET
  * Darstellungsproblem (Exceptions?)
  * kein Kompass
* Windows 8 auf einem Laptop (Browser)
  * UNGEEIGNET
  * Kein Gyroskop im Computer verbaut
* OS 10.10 auf einem iMac (Browser)
  * UNGEEIGNET
  * Kein Gyroskop im Computer verbaut
