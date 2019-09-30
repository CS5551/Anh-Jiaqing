
const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./customers.js');

// ------------ Begin - command configuration -----------------

const idOptions = {
    describe: 'ID of cutomer',
    demand : true,
    alias : 'i'
}

const emailOptions = {
    describe: 'Email of cutomer',
    demand : true,
    alias : 'e'
}

const nameOptions = {
    describe: 'Name of a customer',
    demand : true,
    alias : 'n'
}

const argv =  yargs

    .command('add','Add a new customer',{
      id: idOptions,
      email: emailOptions,
      name: nameOptions
    })
    .command('list','List all customers')
    .command('read','Read a customer',{
      id: idOptions,
    })
    .command('remove','Remove a customer',{
      id: idOptions,
    })
    .command('update','Update a customer',{
      id: idOptions,
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.id,argv.email,argv.name);
    if (customer){
      customers.logCustomer(customer);                                //add a new note
    } else {
      console.log("Customer already exists");
    }
}

else if (command === 'list') {
  var AllCustomers = customers.getAll();
  console.log(`Printing ${AllCustomers.length} note(s).`);
  AllCustomers.forEach((customer)=>{                                //list all note(s)
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
  var customer = customers.getCustomer(argv.id);
  if(customer){
    customers.logCustomer(customer);                                //read a note
  } else {
    console.log("Customer not found");
  }
}
else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.id);
    var message = customerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
}
else if (command === 'update') {
  var customer = customers.getCustomer(argv.id);
  if (customer) {
    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter new email ' +  `<${customer.email}>: `, (answer1) => {
      rl.question('Enter new name ' + `<${customer.name}>: `, (answer2) => {
        var customerUpdated = customers.update(argv.id, answer1, answer2);
        if(customerUpdated) {
          customers.logCustomer(customerUpdated);                                //read a customer
          rl.close();
        }
      });
    });
  } else {
    console.log("Customer not found");
  }
}

else{
  console.log('command note recognized');
}
