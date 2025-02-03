// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require("fs/promises"); //for asynchronous code

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null; //Head initializes as null because it's an empty list
    this.tail = null; //Tail also initializes as null
    this.length = 0; //Begins with 0 and increments as nodes are added
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    let newNode = new Node(newStudent); //Create a new student
    if(!this.head){ //If the list is empty, set head and tail to the new student
      this.head = newNode;
      this.tail = newNode;
    } else{ //Otherwise, add the new student to the end and update the tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++; //Increase the length
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if(!this.head){
      return null; //For an empty list there will be no student to remove
    }

    //Case when the student removed is from the head of the list
    if(this.head.data.getEmail() === email){ //Using method from Student object to find data by email
      this.head = this.head.next; //move the head to the next student
    if(!this.head){
      this.tail = null; //If list is now empty we need update the tail to null
    }
    this.length--; //Decrease the length
    return true; //True indicates the student was indeed removed
  }

    //Case when we remove a non-head student
    let current = this.head; //Starting from the head of the list
    while(current.next){
      if(current.next.data.getEmail() === email){
        //Checks if the email associated with the next node fits the email parameter
        current.next = current.next.next; //If there is a match, the student is removed by updating the next pointer of the current student to skip the node to be removed
        if(!current.next){
          this.tail = current; //Updates the tail if the tail is the removed one
        }
        this.length--; //Decrease the length
        return true; //Return true to indicate that a student was removed
      }
      current = current.next; //Go to next student in list
    }
    return false; //When student was not found by email, return false to indicate no student was removed
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head; //Starts from the head of the list
    while(current){
      if(current.data.getEmail() === email){ //Checks if the current email matches the email parameter
        return current.data; //displays the student data
      }
      current = current.next; //Moves to the next student in list
    }
    return -1 //Otherwise if student not found, returns -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() { //Same information as empty list when declaring the constructor
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let current = this.head; //Starts from the head of the list
    let result = []; //Store students in an array
    while(current){
      result.push(current.data.getName()); //Put students names in the array
      current = current.next; //Move to the next student in list
    }
    return result.join(", "); //Join method converts result in a string, separating names with a comma and space
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  sortStudentsByName() {
    const students = [];
    let current = this.head;
    while(current){
      students.push(current.data);
      current = current.next;
    }
    return students.sort((a, b) => a.getName().localeCompare(b.getName())); //Sort students alphabetically based on their names and compares them
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    const filteredStudents = [];
    let current = this.head;
    while(current){
      if(current.data.getSpecialization() === specialization){
        filteredStudents.push(current.data);
      }
      current = current.next;
    }
    return this.sortStudentsByName(filteredStudents);
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    const filteredStudents = [];
    let current = this.head;
    while(current){
      if(current.data.age === minAge){
        filteredStudents.push(current.data);
      }
      current = current.next;
    }
    return this.sortStudentsByName(filteredStudents);
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    try{
    const students = [];
    let current = this.head;
    while(current){
      students.push(current.data);
      current = current.next;
    }
    await fs.writeFile(fileName, JSON.stringify(students, null, 2)); //for readability and indentation
    console.log(`Data successfully saved to ${fileName}`);
  } catch(error){
    console.log(`Error saving data to ${fileName}:`, error);
  }
}

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    try{
      const data = await fs.readFile(fileName, "utf-8");
      const students = JSON.parse(data);
      this.clearStudents();
      students.forEach(student => this.addStudent(new Student(student))); //to iterate over each student in students array. For each student a new student is created using the student constructor. Add student method for adding a new student to the linked list.
      console.log(`Data successfully saved to ${fileName}`);
    } catch(error){
      console.log(`Error saving data to ${fileName}:`, error);
    }
  }

}

module.exports = { LinkedList }
