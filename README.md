# Little Piano

Dieses Projekt ist mein Beitrag zu [Coding da Vinci](http://codingdavinci.de/). Ich hatte zehn Wochen vom 25. April bis 5. Juli 2015 zeigt gehabt diesen Prototypen zu entwickeln.

# Zusammenfassung

Hinsetzen, Radio an und Musik hören. Das ist kinderleicht. Aber wie funktionierte das vor der Erfindung des Radios? Z.B mit einem Grammophon ... oder einem selbstspielenden Klavier. Verwandle dein Handy in so ein Klavier und lausche den Klängen längst vergangener Zeiten.

# Beschreibung

Als ich das erste Mal von Notenrollen für selbstspielende Klaviere gehört habe war ich überrascht, dass es so etwas überhaupt gibt - eine Rolle, die die Noten vorgibt. Aber dann fiel mir ein, dass ein Leierkasten nach dem gleichen Prinzip funktioniert. Und gesteuert wird der Leierkasten mit einer Kurbel, die die Geschwindigkeit bestimmt.

Selbstspielende Klaviere funktionieren ohne Kurbel, aber in den Patentzeichnungen des Landesmuseums Baden-Württemberg finden sich tatsächlich Zeichnungen für Klaviere mit Notenrollen, die per Kurbel bedient werden. Somit war die Idee geboren: Die Notenrollen des Deutschen Museums aus München sollen mit einer Kurbel abgespielt werden können.

Als Kurbel soll ein Handy dienen. Dreht man es auf der Stelle, fängt die Musik an zu spielen. Dreht man es schneller, erhöht sich auch die Geschwindigkeit der Musik. Dreht man das Handy andersherum, wird die Musik rückwärts gespielt. Daraus ergeben sich viele Möglichkeiten und spannende Fragen: Schafft man es, sein Handy konstant zu drehen um die Musik in normaler Geschwindigkeit zu hören? Wie klingt es, wenn man schnell die Richtungen hin und her ändert?

Um das herauszufinden, braucht man also nur sein eigenes Handy. Und eine Webseite. Die modernen Webseiten sind in der Lage, beliebige Klänge abzuspielen und die Drehung des Handys mit dem eingebauten Lagesensor zu bestimmen. Es reicht ein wenig HTML, JavaScript und CSS und schon ist das Projekt fertig.

Die Notenrollen werden zurzeit noch vom Museum digitalisiert. Viele Bilder sind bereits verfügbar, aber abgespielte Klänge wurden noch nicht aufgezeichnet. Somit muss zur Präsentation auf anderes Tonmaterial zurückgegriffen werden. Das Ziel des Projekts ist es jedoch, die Musik aus den aufgezeichneten Notenrollen aus dem Museum zu verwenden. Daher werden diese, sobald sie verfügbar sind, auch eingebaut.

# Datenauswahl

* [Notenrollen](http://codingdavinci.de/daten/#deutsches-museum) für selbstspielende Klaviere des Deutschen Museums
* [Patentbeschreibungen und ­zeichnungen](http://codingdavinci.de/daten/#landesarchiv-baden-w%C3%BCrttemberg) des Landesarchiv Baden-Württemberg

# Lizenzen

Der Quelltext steht unter einer MIT-Lizenz. Die Grafiken der Notenrollen steht unter der CC-BY-SA 4.0 "Deutsches Museum", die Patentbeschreibungen unter der CC-BY 3.0 "Landesarchiv Baden-Württemberg".

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
