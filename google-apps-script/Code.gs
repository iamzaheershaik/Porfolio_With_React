/**
 * Google Apps Script — Contact Form → Google Sheets
 *
 * This script auto-creates headers on the first submission.
 *
 * SETUP:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Replace the default code with this script
 * 4. Click Save (💾)
 * 5. Deploy → New deployment → Web app
 *    • Execute as: Me
 *    • Who has access: Anyone
 * 6. Click Deploy and Authorize when prompted
 * 7. Copy the Web App URL and paste it into Contact.jsx
 */

var HEADERS = ['Timestamp', 'Name', 'Email', 'Message'];

function setupHeaders(sheet) {
  var firstCell = sheet.getRange('A1').getValue();
  if (firstCell !== 'Timestamp') {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#4285f4')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 200);
    sheet.setColumnWidth(4, 300);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Auto-create headers if missing
    setupHeaders(sheet);

    sheet.appendRow([
      new Date(),           // Timestamp
      e.parameter.name,     // Name
      e.parameter.email,    // Email
      e.parameter.message   // Message
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Also set up headers when visiting the URL directly (useful for testing)
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeaders(sheet);
  } catch (err) {}

  return ContentService
    .createTextOutput('✅ Contact form endpoint is live! Headers have been set up.')
    .setMimeType(ContentService.MimeType.TEXT);
}
