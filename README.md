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

# Errors/Bugs

# Tests

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
This included style (css files), html (index.html) 