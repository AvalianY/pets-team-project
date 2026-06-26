# Paw Hut / Хатинка Лапок ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

[Українська](README.ua.md) | [English](README.en.md)

> **Paw Hut** ist eine responsive Teamprojekt-Website für ein Tierheim. Die Website hilft Nutzern, Tiere zur Adoption zu finden, detaillierte Tierprofile anzusehen, mehr über das Tierheim zu erfahren und eine Anfrage zur Adoption zu senden.

## Inhalt

- [Über das Projekt](#-über-das-projekt)
- [Meine Rolle im Team](#-meine-rolle-im-team)
- [Funktionalität](#-funktionalität)
- [Technologiestack](#-technologiestack)
- [Installation und Start](#-installation-und-start)

## Über das Projekt

**Paw Hut** ist ein teamorientiertes Lernprojekt im Frontend-Bereich. Ziel war es, eine moderne, responsive und benutzerfreundliche Website für ein Tierheim zu erstellen.

Nutzer können:

- Tiere zur Adoption durchsuchen.
- Tiere nach Kategorien filtern.
- Detaillierte Informationen zu einem Tier in einem Modalfenster ansehen.
- Antworten auf häufige Fragen lesen.
- Erfolgsgeschichten ansehen.
- Eine Adoptionsanfrage über ein Formular senden.

## Meine Rolle im Team

In diesem Teamprojekt war ich **Team Lead** und verantwortlich für die Sektion **“Our Pets” / “Наші хвостики”**.

Mein Beitrag umfasste:

- Koordination des Team-Workflows und Organisation des Entwicklungsprozesses.
- Entwicklung der Sektion **Our Pets / Наші хвостики**.
- Integration externer API-Daten mit Axios.
- Dynamisches Rendering von Tierkarten.
- Umsetzung der Filterung nach Kategorien.
- Umsetzung der Pagination / “Show more”-Logik.
- Verarbeitung von Ladezuständen und API-Fehlern.
- Verbindung der Tierkarten mit einem Detail-Modalfenster.

## ✨ Funktionalität

- **Responsive Layout:** optimierte Darstellung für Mobile, Tablet und Desktop.
- **Dynamische Tierliste:** Tierkarten werden aus API-Daten gerendert.
- **Kategorie-Filterung:** Nutzer können Tiere nach Kategorien filtern.
- **Pagination / Show more:** schrittweises Nachladen weiterer Karten.
- **Tierdetails:** Modalfenster mit detaillierten Informationen zu einem Tier.
- **FAQ-Sektion:** häufig gestellte Fragen in Accordion-Form.
- **Success Stories:** Bereich mit Geschichten erfolgreicher Adoptionen.
- **Adoptionsformular:** Formular zur Kontaktaufnahme.
- **Benachrichtigungen:** Nutzerfeedback und Fehlerbehandlung.

## Technologiestack

- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Bundler:** Vite
- **API:** REST API, Axios
- **Deployment:** GitHub Pages
- **Bibliotheken und Tools:** Swiper, Accordion-js, Raty-js, SweetAlert2, SimpleLightbox, iziToast

## Installation und Start

### Voraussetzungen

- Installierte aktuelle LTS-Version von [Node.js](https://nodejs.org/).

### Schritte

1. **Repository klonen:**

   ```bash
   git clone <repository-url>
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

3. **Projekt im Entwicklungsmodus starten:**

   ```bash
   npm run dev
   ```

4. **Öffnen Sie den Link, der im Terminal erscheint**  
   normalerweise `http://localhost:5173/`.

### Projekt bauen

```bash
npm run build
```

### Production-Build ansehen

```bash
npm run preview
```
