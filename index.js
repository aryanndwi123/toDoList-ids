// Script for timer 
setInterval(function () {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    let time = document.getElementById("txt");
    if (h > 12) {
      h -= 12;
      s += " pm";
    } else {
      s += " am";
    }
    time.innerHTML = h + ":" + m + ":" + s;
  }, 1000);


//    Script for date in main heading 

  let date = new Date();
      document.getElementById("mainHeading").innerText += date.toDateString();

// My script for adding items to list

//   Empty the title and description fields function javascript
      updateBox = () => {
        console.log("updateBox called");
        document.querySelector("#title").value = "";
        document.getElementById("description").value = "";
      };

      // Javascript for add button functionality

      let submit = document.getElementById("add");

      submit.addEventListener("click", () => {
        console.log("add to list button is clicked");

        let tittle = document.querySelector("#title").value;
        let desc = document.getElementById("description").value;

        if (localStorage.getItem("itemsJson") === null) {
          itemsArray = [];
          itemsArray.push([tittle, desc]);
          localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
        } else {
          itemsArraystr = localStorage.getItem("itemsJson");
          itemsArray = JSON.parse(itemsArraystr);
          itemsArray.push([tittle, desc]);
          localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
        }

        // Now inserting to the table

        let table = document.getElementById("tableBody");
        let str = "";
        itemsArray.forEach((element, index) => {
          str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-md btn-primary" id="deleteNote" onclick="deleteNote(${index})">Delete</button></td>
                    </tr> `;
        });
        table.innerHTML = str;
        updateBox();
      });

      //================== Function to automatically fetch data to the table on loading and after each activity.================

      function update() {
        let table = document.getElementById("tableBody");
        itemsArraystr = localStorage.getItem("itemsJson");
        itemsArray = JSON.parse(itemsArraystr);
        let str = "";
        if (itemsArray == null) {
          table.innerHTML = str;
        } else {
          itemsArray.forEach((element, index) => {
            str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-md btn-primary" id="deleteNote" onclick="deleteNote(${index})">Delete</button></td>
                    </tr> `;
          });
          table.innerHTML = str;
        }
      }
      // for updating list just after opening page.
      update();

      //   Delete button javascript
      deleteNote = (index) => {
        console.log("delete button clicked");
        itemsArraystr = localStorage.getItem("itemsJson");
        itemsArray = JSON.parse(itemsArraystr);
        itemsArray.splice(index, 1);
        localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
        update();
      };







      const inputname = document.getElementById("title") ;
      const inputdesc = document.getElementById("description") ;
      const listContainer = document.getElementById("list-container") ;
      
      function addTask(){
          if(inputBox.value === ''){
              alert("hfdh") ; 
          }
          else{
              let li = document.createElement("li") ; 
              li.innerHTML = inputBox.value;
              listContainer.appendChild(li) ; 
              let span = document.createElement("span") ; 
              span.innerHTML = "\u00d7" ; 
              li.appendChild(span) ; 
      
          }
          inputBox.value= "" ; 
          saveData() ;
      }
      
      listContainer.addEventListener("click",function(e){
          if(e.target.tagName === "LI"){
              e.target.classList.toggle("checked"); 
              saveData() ;
          }
          else if(e.target.tagName === "SPAN"){
              e.target.parentElement.remove();
              saveData() ;
          }
      },false)
      
      function saveData(){
          localStorage.setItem("data",listContainer.innerHTML) ; 
      
      }
      function showTask(){
          listContainer.innerHTML = localStorage.getItem("data"); 
      }
      showTask()      
