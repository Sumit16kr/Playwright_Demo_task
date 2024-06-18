# Info
The framework is created with Playwright as a testing tool and typescript as a language

# Why playwright ?
I chose Playwright for UI automation due to its advanced capabilities and modern approach, including its use of WebSocket communication. This allows for real-time, bidirectional communication between the testing script and the browser, resulting in faster, more reliable tests. WebSocket usage enhances debugging, as it enables immediate feedback and interaction with the browser. Playwright’s support for multiple browsers and its ability to handle complex UI interactions, combined with these efficient communication methods, make it an excellent choice for thorough and efficient UI automation.

test conflict
# Prerequisite (Installations)
Node js (version 20x or higher)
Visual studio code 

# Setup
1.Clone the code or unzip the file containing the code
2.Run command on terminal on the framework parent path:- npm install
3.Run command to download browser binaries:- npx playwright install

# For running code
npm run tests:chrome

# For viewing reports
Go to the Test-Report folder and open the index.html file under it

# Code Location 
The actual code for the Test cases are present inside file named "project.spec.ts" which is present inside "tests" folder.
\Plain_Playwright\tests\project.spec.ts

# Test Case sepration 
    TC001 -It contains all the positive test cases
    TC002 -It contains all the negative test cases

# TC001
    Test Case 1- verify placeholder
    Test Case 2-  Verify entered  todo item is added to the list
    Test Case 3-  Verify All is selected by defaults
    Test Case 4- Fill multiple todo list items and verify items are updated
    Test Case 5- Verify complete toggle
    Test Case 6- Verify Active tab
    Test Case 7- Verify completed tab
    Test Case 8- Verify Clear completed feature
    Test Case 9- Verify Toggle all makes all task completed

# TC002
    Test case 1-Verify that completed task is not shown in active tab 
    Test case 2-Verify that completed task is not shown in active tab
    Test case 3-Verify that renaming, renames the task
    Test case 4-Verify that clearing completed task removes the footer section
    conflict test