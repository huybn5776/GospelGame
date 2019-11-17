var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet1 = spreadsheet.getSheets()[0];
var rowStartIndex = 3;
var colStartIndex = 1;
var idColIndex = 1;

function doGet(request) {
  const result = getAllData();
  return createResponse(result);
}

function doPost(request) {
  const method = request.parameter.method || 'post';
  const postData = JSON.parse(request.postData.contents);
  var result;
  switch (method) {
    case 'post':
      const data = writeNewData(postData);
      spreadsheet.toast("A隊: " + data.scoreA + ", B隊: " + data.scoreA, "新分數");
      result = data;
      break;
    case 'patch':
      result = doPatch(postData);
      break;
    case 'delete':
      result = doDelete(postData);
      break;
  }
  return createResponse(result);
}

function testDelete() {
  const result = doDelete({id: 96});
  Logger.log(result);
}

function doDelete(postData) {
  const rowIndex = findRowIndexWithData(postData);
  if (rowIndex !== -1) {
    sheet1.deleteRow(rowIndex);
    return {ok: true, code: 204};
  }
  return {ok: false, code: 404};
}

function testPatch() {
  const result = doPatch({id: 94, scoreA: 123});
  Logger.log(result);
}

function doPatch(postData) {
  const rowIndex = findRowIndexWithData(postData);
  const range = sheet1.getRange(rowIndex, 1, 1, sheet1.getLastColumn());
  const rowData = range.getValues()[0];

  const dataKeyIndex = getDateKeyIndex(sheet1);
  for (var i = 0; i < dataKeyIndex.length; i++) {
    var patchValue = postData[dataKeyIndex[i]];
    if (patchValue) {
      rowData[i] = patchValue;
    }
  }
  range.setValues([rowData]);

  const newData = new Object();
  for (var i = 0; i < dataKeyIndex.length; i++) {
    newData[dataKeyIndex[i]] = rowData[i];
  }
  return newData;
}

function findRowIndexWithData(postData) {
  const dataId = parseInt(postData.id);
  const lastRow = sheet1.getLastRow();
  for (var rowIndex = rowStartIndex; rowIndex <= lastRow; rowIndex++) {
    var idValue = sheet1.getRange(rowIndex, idColIndex, 1, 1).getValues()[0][0];
    var rowId = parseInt(idValue);
    if (rowId === dataId) {
      return rowIndex;
    }
    Logger.log(rowId);
  }
  return -1;
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
  var inningColumnIndex = getColumnIndexOf('inning');
  const values = sheet1.getSheetValues(sheet1.getLastRow(), inningColumnIndex, 1, 1);
  const lastInning = parseInt(values[0]) || 0;
  return lastInning + 1;
}

function getColumnIndexOf(key) {
  const dataKeyIndex = getDateKeyIndex(sheet1);
  var columnIndex;
  for (var i = 0; i < dataKeyIndex.length; i++) {
    if (dataKeyIndex[i] === key) {
      columnIndex = i + 1;
    }
  }
  return columnIndex;
}

function writeDataToSheet(data, sheet) {
  const dataKeyIndex = getDateKeyIndex(sheet);
  const rowData = [];
  for (var i = 0; i < dataKeyIndex.length; i++) {
    rowData[i] = data[dataKeyIndex[i]];
  }
  sheet1.appendRow(rowData);
}

function getDateKeyIndex(sheet) {
  const firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const firstRowValues = firstRange.getValues();
  return firstRowValues[0];
}

function convertSheet2JsonText(sheet) {
  const dataKeyIndex = getDateKeyIndex(sheet);

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
    for (var j = 0; j < dataKeyIndex.length; j++) {
      json[dataKeyIndex[j]] = line[j];
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
