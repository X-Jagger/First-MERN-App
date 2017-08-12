var db = new Mongo().getDB('playground');
db.employees.insert({
	name: "X-Jagger",
	age: 22
})