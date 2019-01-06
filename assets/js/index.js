class Document {
  constructor(Subtype, Name, Description, ModifiedDate) {
    switch(Subtype) {
      case 'Image':
        this.Icon = 'assets/css/icons/image.png';
        break;
      case 'Spreadsheet':
        this.Icon = 'assets/css/icons/spreadsheet.png';
        break;
      case 'Document':
        this.Icon = 'assets/css/icons/document.png';
        break;
      case 'Executable':
        this.Icon = 'assets/css/icons/executable.png';
        break;
      case 'Package':
        this.Icon = 'assets/css/icons/package.png';
        break;

      case 'Presentation':
        this.Icon = 'assets/css/icons/presentation.png';
        break;
      default:
        this.Icon = 'assets/css/icons/document.png';
        break;
    }
    this.Name = Name;
    this.Description = Description;
    this.ModifiedDate = new Date(ModifiedDate);
  }
}
class Folder {
  constructor(Name, Description, ModifiedDate) {
    this.Icon = 'assets/css/icons/folder.png';
    this.Name = Name;
    this.Description = Description;
    this.ModifiedDate = new Date(ModifiedDate);
  }
}

class Actions{
  constructor(Name, Image){
    this.Name = Name;
    this.Image = 'assets/css/icons'+Image;
  }
}
/*
  generateGetRequest - make http request to read JSON data
  Parameters:
    - filePath: path to JSON file
    - success: callback function upon successful http request
    - failure: callback function in the event http request fails
*/
function generateGetRequest(filePath, success, failure){
  const request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (request.status === 200) {
                if (success)
                    success(JSON.parse(request.responseText));
            } else {
                if (error)
                    error(request);
            }
    }
  };
  request.open("GET", filePath, true);

  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8")
  request.setRequestHeader("Access-Control-Allow-Origin","*");
  request.send();


}
function sortBy(column){
  this.sortedType = column;
  const columnComparator = (column) =>
  (a, b) => a[column] == b[column] ? 0 : a[column] < b[column] ? -1 : 1
  this.documents.sort(columnComparator(column));
}
function readFolder(Folder){
  children_documents = [];
  for(let index = 0; index < Folder['Children'].length; i++){
    if(Folder['Children']['Type'] == Folder){

    }
    children_documents.push(

      new Document(
        Folder[index]['Type'],
        Folder[index]['SubType'],
        Folder[index]['Name'],
        Folder[index]['Description'],
        Folder[index]['ModifiedDate']
      )
    )
  }

  return children_documents;
}
/*
  generateTable - Populate Table and actions grid with JSON Data
  Parameters:
    - data: data containing JSON in the following format:
    ex: "GridData" : [Documents/Folders],
        "Actions" : [Name,ImageName]
*/
function generateTable(data){
  this.clearData();
  let documents = [];
  let actions = [];

  // Iterate through Data Grid array. Construct Documents and Folders objects appendChild
  // store in documents array.
  for (let index = 0; index < data['GridData'].length; index++){
    if (data['GridData'][index]['Type'] == "Folder"){
      documents.push( new Folder(
        data['GridData'][index]['Name'],
        data['GridData'][index]['Description'],
        data['GridData'][index]['ModifiedDate'],

      ));
    } else{
      documents.push(new Document(
        data['GridData'][index]['SubType'],
        data['GridData'][index]['Name'],
        data['GridData'][index]['Description'],
        data['GridData'][index]['ModifiedDate']
      ));
    }
  }

  // Populate Table with documents data.
  const table = document.getElementById("documentListBody");
  let column = 0;
  for (let index = 0; index< documents.length; index++){
    const row = table.insertRow(index);
    for (let parameter in documents[index]){
      const cell = row.insertCell(column);
      if (parameter == 'Icon' ){
        cell.innerHTML = "<img src="+ documents[index]['Icon'] + " width=50px>";
      } else {
        cell.innerHTML = documents[index][parameter];
      }

      column += 1;
    }
    column = 0;
  }

  const ul = document.getElementById("actionsList");

  for (let index = 0; index < data['Actions'].length; index++){
    const li = document.createElement("li");
    const img = document.createElement("img");
    console.log()
    img.src= 'assets/css/icons/'+data['Actions'][index]['ImageName']+'.png';
    img.style.width = "50px";
    li.appendChild(img);
    ul.appendChild(li);
  }



}
function loadJSONButton(path){
  path = document.getElementById('filePath').value;
  console.log(path);
  // call generateGetRequest to retrieve .json data from passed in Path
  this.generateGetRequest(path, this.generateTable, (err)=> console.log(error));
}

function switchMenu(){
  const actionsListEl = document.getElementById("actionsList");
  actionsListEl.classList.toggle("expanded-menu");

  const outsideDiv = document.getElementById("sidePanel");
  outsideDiv.classList.toggle("col-md-4");

  const mainPanelDiv = document.getElementById("mainPanel");
  mainPanelDiv.classList.toggle("col-md-8");

  const lastNListItems =  document.querySelectorAll("ul li:nth-of-type(n + 6)");
  for (let index = 0; index < lastNListItems.length; index++){
    lastNListItems[index].classList.toggle("hide-list-item");
  }
}

function clearData(){
  const documentTable = document.getElementById('documentListBody');
  let rowCount = documentTable.rows.length;
  while(rowCount > 0) {
    documentTable.deleteRow(0);
    rowCount -= 1;
  }

  const actionsList = document.getElementById("actionsList");
  actionsList.innerHTML = '';

}
