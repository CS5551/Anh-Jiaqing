const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomers = () => {
  try {                          //if file won't exist
    var customersString = fs.readFileSync('customers-data.json')
    return JSON.parse(customersString);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('customers-data.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new Customer

var addCustomer = (id,email,name) => {
    var customers = fetchCustomers();
    var customer = {id,email,name};

    var duplicateCustomer =  customers.filter((customer) => { // to check if note already exists
      return customer.email === email || customer.id === id;
    });

    if (duplicateCustomer.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer;
    }

  };


//to list all the notes

var getAll = () => {
    return fetchCustomers();
};


// to read a note

var getCustomer = (id) => {

    var customers = fetchCustomers();

    var getCustomer =  customers.filter((customer) => {  // to check if note exists and return note
      return customer.id === id;
    });

    return getCustomer[0];

};


// to delete a note

var remove = (id) => {

    var customers = fetchCustomers();

    var filteredCustomers =  customers.filter((customer) => { // will return all other notes other than "note to be removed"
      return customer.id !== id;
    });

    saveCustomers(filteredCustomers); //save new notes array

    return customers.length !== filteredCustomers.length;

};

var update = (id,email,name) => {

    var customers = fetchCustomers();

    var index =  customers.findIndex((customer) => {
      return customer.id === id;
    });

    if (email) {
      customers[index].email = email;
    }

    if (name) {
      customers[index].name = name;
    }

    saveCustomers(customers); //save new customers array
    return customers[index];

};

// function just to print out note to screen

var logCustomer = (customer) => {
  console.log('--');
  console.log(`ID: ${customer.id}`);
  console.log(`Email: ${customer.email}`);
  console.log(`Name: ${customer.name}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addCustomer, getAll, remove, getCustomer, logCustomer, update
};
