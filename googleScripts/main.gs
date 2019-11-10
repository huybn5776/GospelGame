var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet1 = spreadsheet.getSheets()[0];

function doGet(request) {
  const result = getAllData();
  return createResponse(result);
}

function doPost(request) {
  const postData = JSON.parse(request.postData.contents);
  const data = writeNewData(postData);
  spreadsheet.toast("A隊: " + data.scoreA + ", B隊: " + data.scoreA, "新分數");
  return createResponse(data);
}

function testToast() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Task started');
}

function testWrite() {
  const result = writeNewData({
    itemsA: "蘑菇×1 | 衝剌蘑菇×1",
    itemsB: "飛龜×1 | 衝剌蘑菇×1",
    newFriendA: "金幣 50×1",
    newFriendB: "",
    result: "A隊贏",
    scoreA: 650,
    scoreB: 400,
    theory: "2人賽",
  });
  Logger.log(result);
}

function getAllData() {
  const json = convertSheet2JsonText(sheet1);
  return json;
}

function writeNewData(data) {
  const newData = Object.assign({}, data);
  newData.id = getNewId();
  newData.time = newData.time ? new Date(newData.time) : new Date();
  newData.inning = getNextInning();
  writeDataToSheet(newData, sheet1);
  return newData;
}

function getNextInning() {
  const inningColumnIndex = 2;
  const values = sheet1.getSheetValues(sheet1.getLastRow(), inningColumnIndex, 1, 1);
  const lastInning = parseInt(values[0]);
  return lastInning + 1;
}

function writeDataToSheet(data, sheet) {
  const firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const firstRowValues = firstRange.getValues();
  const titleColumns = firstRowValues[0];
  const rowData = [];
  for (var i = 0; i < titleColumns.length; i++) {
    rowData[i] = data[titleColumns[i]];
  }
  sheet1.appendRow(rowData);
}

function convertSheet2JsonText(sheet) {
  const rowStartIndex = 3;
  const colStartIndex = 1;

  const firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const firstRowValues = firstRange.getValues();
  const titleColumns = firstRowValues[0];

  // after the second line(data)
  const lastRow = sheet.getLastRow();
  const rowValues = [];
  for (var rowIndex = rowStartIndex; rowIndex <= lastRow; rowIndex++) {
    var range = sheet.getRange(rowIndex, colStartIndex, 1, sheet.getLastColumn());
    var values = range.getValues();
    rowValues.push(values[0]);
  }

  // create json
  const jsonArray = [];
  for (var i = 0; i < rowValues.length; i++) {
    var line = rowValues[i];
    var json = new Object();
    for (var j = 0; j < titleColumns.length; j++) {
      json[titleColumns[j]] = line[j];
    }
    jsonArray.push(json);
  }
  return jsonArray;
}

function createResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify(data));
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}

function getNewId() {
  const dataKey = "autoIncrementId";
  var id = getMetadataValue(dataKey);
  id = parseInt(id) || 0;
  id++;
  setMetadata(dataKey, id);
  spreadsheet.toast(id);
  return id;
}

function getMetadata(key) {
  const metadataArray = spreadsheet.createDeveloperMetadataFinder()
    .withKey(key)
    .find();
  return metadataArray && metadataArray[0];
}

function getMetadataValue(key) {
  const metadata = getMetadata(key);
  return metadata && metadata.getValue();
}

function setMetadata(key, value) {
  const metadata = getMetadata(key);
  if (metadata) {
    metadata.setValue(value);
  } else {
    spreadsheet.addDeveloperMetadata(key, value);
  }
}
