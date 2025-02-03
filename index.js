// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
        console.log('Adding student...')
        const [name, year, email, specialization] = args;
        // --------> WRITE YOUR CODE BELOW
        //Create a new Student object
        const newStudent = new Student(name, parseInt(year), email, specialization);
        //Add student to the linked List
        studentManagementSystem.add(newStudent);
        //Display the updated linked list
        studentManagementSystem.display();
        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      const [removeEmail] = args;
      //Remove the student by email
      studentManagementSystem.removeByEmail(removeEmail);
      //Display the updated linked list
      studentManagementSystem.display();
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      //Display all students in linked list
      studentManagementSystem.display();
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const [findEmail] = args;
      //Find student by email
      const foundStudent = studentManagementSystem.findByEmail(findEmail);
      if(foundStudent){
        console.log("Student found: ", foundStudent);
      } else{
        console.log("Student not found.");
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      const [saveFileName] = args;
      //Save linked list to a file
      studentManagementSystem.saveToFile(saveFileName);
      console.log(`Data saved to ${saveFileName}`);
      // --------> WRITE YOUR CODE ABOVE

    case "load":
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      const [loadFileName] = args;
      //Load the linked list from a file
      studentManagementSystem.loadFromFile(loadFileName);
      //Display all students in linked list
      studentManagementSystem.display();
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      //Clear the linked list
      studentManagementSystem.clear();
      console.log("All data cleared.");
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
