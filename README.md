# 📊 Buchhaltung App

Eine einfache, benutzerfreundliche Buchhaltungs-App mit automatischer Rechnungserkennung für kleine Unternehmen und Selbstständige.

## ✨ Features

- **📋 Transaktionsmanagement**: Einfache Erfassung von Soll- und Haben-Buchungen
- **🏦 Kontenverwaltung**: Automatische Standardkonten + eigene Konten hinzufügen
- **📊 Bilanz & GuV**: Automatische Berechnung von Bilanz und Gewinn-/Verlustrechnung
- **📸 Rechnungs-OCR**: Rechnungen fotografieren und automatisch verarbeiten
- **💾 Datenpersistenz**: Alle Daten werden lokal gespeichert
- **📱 PWA**: Installierbar auf iPhone und Android
- **🌍 Offline-fähig**: Funktioniert ohne Internetverbindung

## 🚀 Installation auf dem iPhone 13

### Methode 1: Über GitHub Pages (Empfohlen)
1. Öffnen Sie Safari auf Ihrem iPhone
2. Gehen Sie zu: `https://[IHR-GITHUB-USERNAME].github.io/buchhaltung-app`
3. Tippen Sie auf das Teilen-Symbol (Pfeil nach oben)
4. Wählen Sie "Zum Home-Bildschirm"
5. Tippen Sie auf "Hinzufügen"

### Methode 2: Lokale Installation
1. Laden Sie alle Dateien herunter
2. Öffnen Sie `create_icons.html` und laden Sie die App-Icons herunter
3. Stellen Sie alle Dateien auf einen Webserver bereit
4. Öffnen Sie die URL in Safari und installieren Sie wie oben

## 📱 Verwendung

### Transaktionen
- Gehen Sie zum Tab "Transaktionen"
- Füllen Sie das Formular aus (Datum, Beschreibung, Soll-/Haben-Konto, Betrag)
- Klicken Sie auf "Transaktion hinzufügen"

### Rechnungen scannen
- Gehen Sie zum Tab "Rechnungen"
- Klicken Sie auf "Rechnung fotografieren oder hochladen"
- Wählen Sie ein Bild aus oder fotografieren Sie eine Rechnung
- Die App extrahiert automatisch die Daten
- Überprüfen Sie die Daten und erstellen Sie die Transaktion

### Konten verwalten
- Gehen Sie zum Tab "Konten"
- Fügen Sie neue Konten hinzu (Name und Typ)
- Sehen Sie alle Kontosalden in der Übersicht

### Bilanz ansehen
- Gehen Sie zum Tab "Bilanz"
- Sehen Sie Aktiva, Passiva und Eigenkapital
- Überprüfen Sie die Gewinn- und Verlustrechnung

## 🛠️ Technische Details

### Technologien
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **Speicherung**: LocalStorage (Browser)
- **OCR**: Simuliert (in Produktionsversion würde OCR-API integriert)

### Datenschutz
- Alle Daten bleiben auf Ihrem Gerät
- Keine Übertragung an externe Server
- Vollständige Kontrolle über Ihre Finanzdaten

### Kompatibilität
- ✅ iPhone (Safari 14+)
- ✅ Android (Chrome 80+)
- ✅ Desktop (Chrome, Firefox, Safari)

## 📁 Dateien

- `index.html` - Hauptanwendung
- `styles.css` - Styling
- `script.js` - Funktionalität
- `manifest.json` - PWA-Manifest
- `service-worker.js` - Service Worker für Offline-Funktionalität
- `create_icons.html` - Icon-Generator
- `final_test.html` - Vollständiger Test der App

## 🔧 Entwicklung

### Lokale Entwicklung
```bash
# Einfacher HTTP-Server
python3 -m http.server 8000

# Oder mit Node.js
npx http-server
```

### Tests ausführen
Öffnen Sie `final_test.html` in einem Browser und führen Sie alle Tests aus.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 🤝 Beitrag

Verbesserungen und Fehlerbehebungen sind willkommen! Bitte erstellen Sie einen Pull Request.

## 📞 Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue in diesem Repository.

---

Made with ❤️ by Claude Code