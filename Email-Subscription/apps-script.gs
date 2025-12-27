var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // wait up to 10 seconds

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    // Get headers and normalize
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      .map(h => h.toString().trim());

    var emailIndex = headers.indexOf("Email"); // column index
    if (emailIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', error: 'Email column not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var incomingEmail = e.parameter.Email ? e.parameter.Email.toString().trim().toLowerCase() : "";

    if (!incomingEmail) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', error: 'No email provided' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Check duplicates if there are existing rows
    if (sheet.getLastRow() > 1) {
      var existingEmails = sheet
        .getRange(2, emailIndex + 1, sheet.getLastRow() - 1)
        .getValues()
        .flat()
        .map(email => email.toString().trim().toLowerCase()); // normalize

      if (existingEmails.includes(incomingEmail)) {
        return ContentService
          .createTextOutput(JSON.stringify({ result: 'duplicate' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Prepare new row
    var nextRow = sheet.getLastRow() + 1;
    var newRow = headers.map(function(header) {
      if (header.toLowerCase() === 'timestamp') return new Date();
      return e.parameter[header] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
