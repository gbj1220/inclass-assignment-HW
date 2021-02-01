const express = require("express");               // 1. tells computer to use node express modules under node
const app = express();                            // 2. puts express() function in a variable we can use to manipulate data
const PORT = process.eventNames.PORT || 3000;     // 3. opens a local server for us to work with


app.use(express.json());                          // 6. allows us to parse incoming json files
app.use(express.urlencoded({ extended: false })); // 7. built in middleware that will parse incoming requests with urlencoded data


let teamArray = [                                 // 10. declaring an array with 1 object in it
  {                                               // 11. item has 3 parameters(id, name, playersArray) 
    id: 1,
    name: "lakers",
    playersArray: [],
  },
]


app.get('/', function (req, res) {                // 19. tells the server what to do when url only has one slash after it and nothing else
  res.status(200).send("Welcome to our first API")// 20. gives a warming message to the user that they just made their first API... sorta 
});


app.get('/team', function (req, res) {            // 24. same as above except this time the url is looking for '/team' after it
  res.status(200).json({
    teamArray,                                    // 26.returns the full array from line 10 by parsing incoming data
  })
});


app.get("/team/:teamID", function (req, res) {
  let result;                                       // 32. result is declared for later use.
  let teamIDNumber = Number(req.params.teamID)      // 33. req.params.teamID is the string being passed in the URL. We run Number on it to make it a number so we can check for it.
  teamArray.forEach((elem) => {                     // 34. looping through each element using forEach method.
    console.log(elem.playersArray)
    if (elem.id === teamIDNumber) {                 // 35. stating that if the elements id is the same as the number provided in the URL, var result = element
      result = elem                                 // 36. result is declared at the beginning of the function and element is the object. 
    } else {
      result = "Sorry that team does not exist."    // 39. if the elem.id does not match that of teamIDNumber, result will change from = element to = whatever string you choose to use as an error message.
    } 
  })

  res.status(200).json({
    result,
  })
})





app.post("/team/add-player/:teamID", function (req, res) {    
  let teamIDNum = Number(req.params.teamID)       // 53. Taking req.params.teamID which is the string of a number that will be put in to find an id on the browser
  teamArray.forEach((elem) => {                   // 54. Looping through the array 
    if (elem.id === teamIDNum) {                  // 55. If the elements id is an exact match to Number(req.params.teamID) will take that id and push req.body(whatever is typed in) and append it to the players array at that id
      elem.playersArray.push(req.body)
    }
  });
  res.status(200).json({                          // 59. res.status is just the code for the response given to the user
    teamArray,                                    // 60. passing in our teamArray so that json can parse the data and return the end result
  })
});








































app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});

// app.get('/team/')

