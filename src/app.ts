    // app.ts
    function greet(name: string): string {
        return `Hello, ${name}!`;
    }

    let userName: string = "TypeScript Learner";
    console.log(greet(userName));

    // Example with an interface
    interface Person {
        firstName: string;
        lastName: string;
    }

    function sayHello(person: Person): string {
        return `Greetings, ${person.firstName} ${person.lastName}!`;
    }

    let user: Person = { firstName: "Jane", lastName: "Doe" };
    console.log(sayHello(user));