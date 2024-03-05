github repo: https://github.com/cs0320-s24/mock-ergresal-dhu34

# Project Details
This project implements the front - end development for a mock server web application. It allows users to load files (using mocked data and files), 
and then either search through them, or view them. 
The necessary responses are outputted in a REPLHistory output, which 
responds with a new line (or multiple) every time the user clicks the submit 
button. 
The user may input the key word 'mode' in order to change the mode of output
from 'brief' to verbose. Essentially, this changes the program setting so that
both the necessary output and input of that command are outputted back to the 
user. Each previous response will be logged on the webpage, to be accessed
by the user. 

# Design Choices
In this project, we opted to intake a command string by the user, handle this 
using REPLInput.tsx, and then handle the output using REPLFunction.tsk. 
This REPLFunction was an interface which allowed for a commandMap which mapped
commands to functions implementing the REPLFunction interface. 
The output was chosen to be a string array, which made outputting the array in 
REPLHistory much more simple (we inputted a new paragraph for each mapped
element of the history array). By having an array, we could place each row
of the file (in search and view) on a different line, improving user
accessibility in terms of output readability. 
See inline comments for further design choices in regards to each function
(particularly in REPLFunctions.tsk)

# Errors/Bugs
No bugs were found as of the submission of this project

# Tests
Our tests focused on the front-end development side of things in this project. 
In order to test the front-end, we used Playwright testing, which essentially
awaits a command to take place on a mocked webpage, and searches for
certain properties of the page, testing it from there. 
For example, by going to the localhost page created once the server was started,
then clicking the submit button, and then clicking the submit button, "Invalid
Input" should be outputted in the REPLHistory array. 
Our testing files prioritized the functionality of our webpage in terms of 
our html, css, and typescript files working concurrently and supporting each
other to support multiple user commands
For further testing examples, see /tests/e2e/App.spec.ts

# How to
In order to run this program, (particularly in the VSCode npm environment),
one must submit 'npm start', which will create a local host with a default 
port number of 8000. If this number is taken, another one will be used,
so the user should search in their browser: http://localhost:{portnumber}/
Going to this webpage once the program has begun should yield a login page.
In order to interact with the webpage, users must first log in to the page with
a correct username and password. These are stored in a mockedUsernames.json
file. Upon inputting the correct KV pair of username and password, the
inner program page will be brought up, allowing the user to either sign out,
or input a command into the command line, and then submit using the submit 
button.
Using the REPLFunction interface, these are the available keywords which 
will yield significant results. load_file, mode, view, search. These are to be 
used in the command line as follows: 

LOAD: 
load_file {filename} 
ex: load_file file1
    will load the file1 content into myData and store it for future calls to
    search and view

VIEW: 
view
    if data is loaded using load_file, will output the data in the form of 
    rows, where each row of data is a new line. 
    if data is not yet loaded, response will be "Data not loaded"

SEARCH:
search {columnIndex | columnName} {object to search}
ex: search 0 Hello  // searches index 0 for Hello
    search a Hello // searches column a for Hello
    if data is not yet loaded, response will be "Data not loaded"
    if data is loaded using load_file, will output the rows in which the 
    object was found (each row will be outputted on a new line)
    If the columnNames are ints, then whichever is found first (columnIndex
    or columnName) will be regarded as the column to search through. (ie. 
    if headers are [3,2,1], then 'search 1 hello' will search through index(1), 
    which is name (2))

MODE: 
mode
    this function changes the mode from verbose to brief (or vice versa)

Each of these commands are listed in the REPLFunction.tsk file, where a 
commandMap maps strings to functions which implement the REPLFunction interface.
In order to update/add commands as a web developer, they would need to alter 
this commandMap map, and create their own function which also implements
REPLFunction. This would require their function to output an array of strings,
allowing the program to print each element in the array on a new line.

# Collaboration
In this project, we referenced the class-livecode repository as well
as the mock-gearup in order to implement the majority of our web development. 
This included style (css files), html (index.html), and components (typescript).
We used the LoginButton implementation from the gearup, along with many aspects
of other components files. However, our implementation of REPLHistory was
revised to include a string array rather than an array, so we could output
items on separate lines during each submit iteration. 