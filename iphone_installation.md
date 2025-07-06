# 📱 iPhone 13 Installation Guide

## So installieren Sie die Buchhaltung App auf Ihrem iPhone 13

### Schritt 1: Repository auf GitHub erstellen
Da ich keinen direkten Zugriff auf GitHub habe, müssen Sie das Repository manuell erstellen:

1. Gehen Sie zu [github.com](https://github.com) und melden Sie sich an
2. Klicken Sie auf "New repository" (Neues Repository)
3. Namen: `buchhaltung-app`
4. Beschreibung: `Einfache Buchhaltung App mit Rechnungs-OCR`
5. Öffentlich (Public) auswählen
6. Klicken Sie auf "Create repository"

### Schritt 2: Code hochladen
```bash
# In dem Ordner /home/brother/buchhaltung-app ausführen:
git remote add origin https://github.com/IHR-USERNAME/buchhaltung-app.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren
1. Gehen Sie zu Ihrem Repository auf GitHub
2. Klicken Sie auf "Settings" (Einstellungen)
3. Scrollen Sie zu "Pages" im linken Menü
4. Unter "Source": Wählen Sie "Deploy from a branch"
5. Branch: `main`
6. Folder: `/ (root)`
7. Klicken Sie auf "Save"

### Schritt 4: App auf iPhone installieren

**URLs die Sie benötigen:**
- Repository: `https://github.com/IHR-USERNAME/buchhaltung-app`
- Live App: `https://IHR-USERNAME.github.io/buchhaltung-app`

**Installation auf iPhone 13:**

1. **Safari öffnen** auf Ihrem iPhone
2. **App-URL eingeben**: `https://IHR-USERNAME.github.io/buchhaltung-app`
3. **Icons erstellen** (wichtig!):
   - Öffnen Sie `https://IHR-USERNAME.github.io/buchhaltung-app/create_icons.html`
   - Klicken Sie auf "Icons herunterladen"
   - Laden Sie `icon-192.png` und `icon-512.png` herunter
   - Laden Sie diese in Ihr GitHub Repository hoch
4. **App zur Startseite hinzufügen**:
   - Tippen Sie auf das **Teilen-Symbol** (□ mit Pfeil nach oben)
   - Wählen Sie **"Zum Home-Bildschirm"**
   - Bearbeiten Sie den Namen falls gewünscht
   - Tippen Sie auf **"Hinzufügen"**

### Schritt 5: App verwenden

Die App ist jetzt auf Ihrem Home-Bildschirm installiert und funktioniert wie eine native App:

- ✅ **Offline-Nutzung**: Funktioniert ohne Internet
- ✅ **Vollbild-Modus**: Wie eine echte App
- ✅ **Kamera-Zugriff**: Für Rechnungs-Fotos
- ✅ **Datenspeicherung**: Alle Daten bleiben auf dem Gerät

### Funktionen der App:

1. **Transaktionen erfassen**:
   - Soll/Haben-Buchungen
   - Automatische Bilanzberechnung

2. **Rechnungen scannen**:
   - Foto aufnehmen
   - Automatische Datenextraktion (simuliert)
   - Direkte Buchung

3. **Konten verwalten**:
   - Standard-Konten vorkonfiguriert
   - Eigene Konten hinzufügen

4. **Berichte ansehen**:
   - Bilanz
   - Gewinn- und Verlustrechnung

### Troubleshooting

**Problem: Icons werden nicht angezeigt**
- Lösung: Icons über `create_icons.html` erstellen und in GitHub hochladen

**Problem: App lädt nicht**
- Prüfen Sie die GitHub Pages URL
- Warten Sie 5-10 Minuten nach dem ersten Upload

**Problem: Kamera funktioniert nicht**
- Safari-Berechtigungen prüfen: Einstellungen → Safari → Kamera

**Problem: Daten gehen verloren**
- Nicht in privatem/inkognito Modus verwenden
- Safari-Daten nicht löschen

### Weitere Hilfe

- Test-Seite: `https://IHR-USERNAME.github.io/buchhaltung-app/final_test.html`
- Issues: `https://github.com/IHR-USERNAME/buchhaltung-app/issues`

---

Die App ist vollständig DSGVO-konform, da alle Daten nur lokal auf Ihrem iPhone gespeichert werden!