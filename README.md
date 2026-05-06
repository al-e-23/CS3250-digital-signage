# CS3250 Digital Signage

## Overview

This project is a web-based Digital Signage system built using HTML, CSS, and JavaScript. The application dynamically displays live information panels including:

- RSS News Feeds
- Weather Forecasts
- Cryptocurrency Trends
- Static Images
- API Content Cards
- Chicago Art Institute Artwork
- Live Clock and Date

The signage system is designed for both vertical and landscape displays and automatically refreshes content using external APIs.

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Node.js / npm
- Chart.js
- ESLint
- GitHub Actions
- Open-Meteo API
- CoinGecko API
- RSS2JSON API
- Art Institute of Chicago API

---

# Project Structure

```text
Digital-Signage/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── Assets/
│
├── docs/
│
├── app.js
├── app.module.js
├── config.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── style.css
```

---

# Features

## RSS Feed Rotation
- Displays rotating news articles from configured RSS feeds.

## Weather Display
Displays:
- Current temperature
- Wind speed
- Weather conditions
- 3-day weather forecast

## Cryptocurrency Charts
- Displays live cryptocurrency trend graphs using CoinGecko API data.

## Chicago Art Integration
- Randomly displays artwork from the Art Institute of Chicago API.

## Static Image Display
- Displays configurable images inside the signage layout.

## API Cards
- Supports custom API endpoints such as jokes, quotes, and informational cards.

## Live Clock
- Displays the current local time and date.

---

# Configuration

The application is configured through:

```text
config.json
```

Each object in the configuration file defines a content module.

Example:

```json
{
  "type": "Weather",
  "URL": "https://api.open-meteo.com/..."
}
```

---

# JSDoc Documentation

This project uses inline JSDoc comments inside the JavaScript project files, including:

```text
app.js
app.module.js
```

The JSDoc documentation helps:
- Explain functions
- Describe parameters and return values
- Improve code readability
- Improve VS Code IntelliSense support
- Assist teammates during development

Example:

```javascript
/**
 * Starts the live clock display.
 *
 * @function startClock
 * @returns {void}
 */
function startClock() {
```

Future contributors should follow the same JSDoc format when creating new functions.

Generated documentation files are stored inside:

```text
docs/
```

---

# APIs Used

## Open-Meteo
- Provides live weather forecast data.

## CoinGecko
- Provides cryptocurrency market chart data.

## RSS2JSON
- Converts RSS feeds into JSON format for easier processing.

## Art Institute of Chicago API
- Provides artwork images and metadata.

---

# CI/CD Pipeline

This project includes a GitHub Actions CI/CD workflow located in:

```text
.github/workflows/deploy.yml
```

The workflow helps automate deployment and maintain project consistency across the development team.

---

# Development Tools

## ESLint

This project uses ESLint for JavaScript linting and code consistency.

Configuration file:

```text
eslint.config.js
```

## npm

Project dependencies are managed using npm through:

```text
package.json
```

Install dependencies using:

```bash
npm install
```

---

# Authors

## Team 1: Team Anonymous

- Ramin Albari
- Daniel Campos
- Julian Aguirre
- Alejandro Casillas
- Mohamed Abdin

---

# License

This project is intended for educational and academic purposes.