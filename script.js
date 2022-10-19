$(document).ready(function () {
    //9-5 business hours
    var hourDisplay = [
      "9AM",
      "10AM",
      "11AM",
      "12PM",
      "1PM",
      "2PM",
      "3PM",
      "4PM",
      "5PM",
    ];
    var currentHour = moment().format("h");
    var amPm = moment().format("a");
    //make an empty array for storage
    var savedNote = JSON.parse(localStorage.getItem("savedNote")) || [];

    var inputEl;
  
    //grab local storage values
    var savedCalendarNotes = JSON.parse(localStorage.getItem("savedNote"));
  
    //now that the elements have been appended...add the notes from local storage, if any
    //check to see if the iterated time has notes. if so pull from the local storage
    function addNotes() {
      $.each(hourDisplay, function (i, time) {
        $.each(savedCalendarNotes, function (j, val) {
          if (time === val.time) {
            
            var noteEl = $(`[data-time=${time}]`);
        
            noteEl.val(val.note);
          }
        });
      });
    }
    //declare index variables
    var getIndex;
    var currentTimeIndex;
  
    //create the schedule with appropriate field of time and buttons
    $.each(hourDisplay, function (i, time) {
      //making currentTime look like the hourdisplay variable
      var currentTime = currentHour + amPm.toUpperCase();
      //first get the index of the iterated time that is not equal to the current
      getIndex = hourDisplay.indexOf(currentTime);
      currentTimeIndex = hourDisplay.indexOf(time);
  
      if (currentTime === time) {
        //add to the input field to make sure there is style 
        inputEl = `<input type='text' class='bg-danger col border p-3 note text-light' value='' data-time=${time} />`;
      } else {
        //make sure that the times are color coded when it's not the current time
  
        if (getIndex !== -1 && getIndex < currentTimeIndex) {
          //green means available
          inputEl = `<input type='text' class='bg-success col border p-3 note text-light' value='' data-time=${time} />`;
        } else {
          //past time slots are gray
          inputEl = `<input type='text' class='bg-secondary col border p-3 note text-dark' value='' data-time=${time} />`;
        }
      }
  
      //creating a row with 3 columns
      var row = $(`<div class='row'>
      <div class="col-2 text-right border-top border-bottom p-3 time">
              ${time}
          </div>
          ${inputEl}
          <button class="btn-sm btn-info col-2 border-top border-bottom p-3 save">
              Save <i class="far fa-save"></i>
          </button>`);
      $(".calendar").append(row);
    });
  
    $(".date").text(moment().format("MMMM Do YYYY"));
  
  
    $(".save").on("click", function () {
      //saving note to blank array from previous stated variable
      savedNote.push({
        time: $(this).prev().prev().text().trim(),
        note: $(this).prev().val(),
      });
 
      localStorage.setItem("savedNote", JSON.stringify(savedNote));
    });
  
    addNotes();
  });