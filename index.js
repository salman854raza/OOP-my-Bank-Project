#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.blue(`\n \t▂▃▅▇█▓▒░ Welcome to HBL Bank ░▒▓█▇▅▃▂\n`));
console.log(chalk.bold.blueBright(`\t`, `=`.repeat(67), `\n`));
console.log(chalk.bold.yellow(` Hint: Account num starting from 1001 to 1010 \n`));
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money
    withdraw(Amount) {
        if (this.balance >= Amount) {
            this.balance -= Amount;
            console.log(`withdrawal of ${Amount} successful. Remaining balance : ${this.balance} `);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //credit money
    deposit(Amount) {
        if (Amount > 100) {
            Amount -= 1; // $1 fee charged if more than 100 is deposited
        }
        this.balance += Amount;
        console.log(`Deposit of ${Amount} successfully. Remaining balance ${this.balance}`);
    }
    //Check Balance 
    checkBalance() {
        console.log(`current balance : ${this.balance}`);
    }
}
// Create Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    Account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.Account = account;
    }
}
//Create bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
    new BankAccount(1004, 3000),
    new BankAccount(1005, 4000),
    new BankAccount(1006, 5000),
    new BankAccount(1007, 6000),
    new BankAccount(1008, 7000),
    new BankAccount(1009, 8000),
    new BankAccount(1010, 9000),
];
//create customers
const customers = [
    new Customer("Shanzay", "khan", "Female", 36, 3363401661, accounts[0]),
    new Customer("Salman", "Raza", "Male", 28, 3133856076, accounts[1]),
    new Customer("Farman", "Ali", "Male", 32, 3363401660, accounts[2]),
    new Customer("Danial", "Nagori", "Male", 27, 3363401668, accounts[3]),
    new Customer("Humza", "Khan", "Male", 27, 3363401668, accounts[4]),
    new Customer("Rehan", "Ali", "Male", 27, 3363401668, accounts[5]),
    new Customer("Mahek", "Iqbal", "Female", 27, 3363401668, accounts[6]),
    new Customer("Komal", "Rehman", "Female", 27, 3363401668, accounts[7]),
    new Customer("Wania", "Kumari", "Female", 27, 3363401668, accounts[8]),
    new Customer("Akshay", "Kumar", "Male", 27, 3363401668, accounts[9]),
    new Customer("Sajda", "Ali", "Female", 27, 3363401668, accounts[10]),
];
//Function to intract user with bank account
async function services() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account Number"
        });
        const Customer = customers.find(customer => customer.Account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`\n Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit"
                    });
                    Customer.Account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw"
                    });
                    Customer.Account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customer.Account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
services();
