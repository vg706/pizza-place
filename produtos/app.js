
function create() {
const Person = new Parse.Object("Person");

Person.set("name", "Jon Snow");
Person.set("age", 30);

Person.save()
  .then(() => console.log("Successfully connected to Back4app!"))
  .catch((error) => console.error("Connection error:", error.message));
}