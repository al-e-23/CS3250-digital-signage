/**
 * @file app.module.js
 * @description
 * Utility module for the CS3250 Digital Signage project.
 *
 * This file contains reusable helper functions for:
 * - escaping HTML
 * - converting weather codes
 * - reading nested API values
 * - stripping HTML from RSS descriptions
 * - parsing config.json data
 * - building RSS article HTML
 *
 * These functions are exported so they can be reused or tested separately.
 */

/**
 * Escapes unsafe HTML characters to help prevent HTML injection.
 *
 * @function escapeHtml
 * @param {string} str - Raw string to sanitize.
 * @returns {string} HTML-safe string.
 */
function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;');
}

/**
 * Converts weather API codes into readable weather symbols and labels.
 *
 * @function getWeatherSymbol
 * @param {number} code - Weather condition code from the weather API.
 * @returns {string} Weather icon and description.
 */
function getWeatherSymbol(code) {
  if (code === 0)                return '☀️ Clear';
  if (code === 1)                return '🌤️ Mostly Clear';
  if (code === 2)                return '⛅️ Partly Cloudy';
  if (code === 3)                return '☁️ Overcast';
  if (code >= 45 && code <= 48) return '🌫️ Foggy';
  if (code >= 51 && code <= 55) return '🌦️ Drizzle';
  if (code >= 61 && code <= 65) return '🌧️ Rainy';
  if (code >= 71 && code <= 77) return '❄️ Snowy';
  if (code >= 80 && code <= 82) return '🌧️ Showers';
  if (code >= 85 && code <= 86) return '🌨️ Snow Showers';
  if (code >= 95 && code <= 99) return '⛈️ Thunderstorm';
  return '🌡️ Unknown';
}

/**
 * Retrieves a nested object value using a dot notation path.
 *
 * Example:
 * getValuePath(data, 'current.temperature_2m')
 *
 * @function getValuePath
 * @param {Object} obj - Source object to search through.
 * @param {string} path - Dot notation path to retrieve.
 * @returns {*} The retrieved value, or undefined if the path does not exist.
 */
function getValuePath(obj, path) {
  return path.split('.').reduce(
    (current, key) => current && typeof current === 'object' ? current[key] : undefined,
    obj
  );
}

/**
 * Removes HTML tags from a string and returns plain text.
 *
 * @function stripHtml
 * @param {string} html - HTML content string.
 * @returns {string} Plain text content.
 */
function stripHtml(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  return d.textContent || d.innerText || '';
}

/**
 * Parses the config.json array into separate RSS and static content groups.
 *
 * The first object in the config array is expected to contain the global cycle time.
 * All remaining objects are separated into RSS items and static items.
 *
 * @function parseConfig
 * @param {Array<Object>} configArray - Full configuration array from config.json.
 * @returns {Object} Parsed configuration object.
 * @returns {number} return.cycleTime - RSS article cycle time in seconds.
 * @returns {Array<Object>} return.rssItems - RSS feed configuration items.
 * @returns {Array<Object>} return.staticItems - Non-RSS configuration items.
 * @returns {number} return.staticRefreshTime - Static content refresh time in seconds.
 */
function parseConfig(configArray) {
  const cycleTime = configArray[0].cycle;
  const allItems = configArray.slice(1);
  const rssItems = allItems.filter((item) => item.type === 'RSS');
  const staticItems = allItems.filter((item) => item.type !== 'RSS');

  const staticCycles = staticItems
    .map((item) => Number(item.cycle))
    .filter((value) => Number.isFinite(value) && value > 0);

  const staticRefreshTime = staticCycles.length ? Math.min(...staticCycles) : 60;

  return { cycleTime, rssItems, staticItems, staticRefreshTime };
}

/**
 * Builds the HTML markup for RSS article cards.
 *
 * This function accepts RSS feed data, checks that the feed is valid,
 * limits the number of displayed articles, and returns article-card HTML.
 *
 * @function buildRssHtml
 * @param {Object} feedData - RSS feed data returned by the RSS2JSON API.
 * @param {string} feedData.status - RSS response status.
 * @param {Object} feedData.feed - Feed metadata.
 * @param {string} feedData.feed.title - Feed title.
 * @param {Array<Object>} feedData.items - RSS article items.
 * @param {number} maxItems - Maximum number of RSS items to render.
 * @returns {string} RSS article card HTML string.
 */
function buildRssHtml(feedData, maxItems) {
  if (feedData.status !== 'ok' || !feedData.items?.length) {
    return '<div><h1>Feed Unavailable</h1><p>' + (feedData.message || 'No items found.') + '</p></div>';
  }

  const items = feedData.items.slice(0, maxItems);
  let html = '<div class="article-feed">';

  items.forEach((item, i) => {
    const decoded = item.title
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>');

    const desc = item.description
      ? stripHtml(item.description).substring(0, 300) + '...'
      : '';

    const date = item.pubDate
      ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '';

    html += `
      <div class="article-card" style="display: ${i === 0 ? 'flex' : 'none'}" data-index="${i}">
        <div class="article-source">${escapeHtml(feedData.feed.title)} <span class="article-date">${date}</span></div>
        <h1 class="article-title">${escapeHtml(decoded)}</h1>
        <div class="article-divider"></div>
        <p class="article-desc">${escapeHtml(desc)}</p>
        <div class="article-num">${i + 1} / ${items.length}</div>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

/**
 * Exports reusable helper functions for testing and modular project structure.
 *
 * @module appModule
 */
module.exports = {
  escapeHtml,
  getWeatherSymbol,
  getValuePath,
  stripHtml,
  parseConfig,
  buildRssHtml,
};