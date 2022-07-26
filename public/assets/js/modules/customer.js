var customer = {};

var customers = [];

var customerModel = {
    attributes: {
        'image' : 'image',
        'lastname' : 'text',
        'firstname' : 'text',
        'email' : 'text',
        'city' : 'text',
        'country' : 'select'
    }
}

var customerForm = {
    mode : 'create',
    service : {
        'create' : './services/create-customer.php',
        'edit' : './services/update-customer.php',
    }
}


function delegateCellText(tag, rowNode, text = ''){
    var cell = document.createElement(tag);
    var text = document.createTextNode(text);
    cell.appendChild(text);
    rowNode.appendChild(cell)
}

function delegateCellInput(tag, rowNode, value = '', name = ''){
    var cell = document.createElement(tag);
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('value', value);
    input.setAttribute('name', name);
    input.setAttribute('id', name);
    cell.appendChild(input);
    rowNode.appendChild(cell);
}

function delegateSelectOption(selectNode, value = '', text = value, selected = false){
    var option = document.createElement("option");
    option.setAttribute('value', value);
    if (selected) {
        option.setAttribute('selected', selected);
    }
    option.appendChild(document.createTextNode(text))
    selectNode.appendChild(option);
}

function renderCustomerHeader(tableNode, withActions = true){
    var row = document.createElement("tr");

    delegateCellText("th", row, "Image");
    delegateCellText("th", row, "Last Name");
    delegateCellText("th", row, "First Name");
    delegateCellText("th", row, "Email");
    delegateCellText("th", row, "City");
    delegateCellText("th", row, "Country");
    if (withActions) {
        delegateCellText("th", row);
    }

    tableNode.appendChild(row)
}

function renderCustomerForm(delegate) {
    var row = document.createElement("tr");
    row.setAttribute('id', 'customer-prototype');

    //File Input
    var cell = document.createElement("td");
    var fileInput = document.createElement("input");
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('name', 'create-image');
    cell.appendChild(fileInput);
    row.appendChild(cell);
    //Last Name
    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'create-lastname');
    input.setAttribute('value', 'DUMMY');
    cell.appendChild(input);
    row.appendChild(cell);
    //First Name
    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'create-firstname');
    input.setAttribute('value', 'DUMMY');
    cell.appendChild(input);
    row.appendChild(cell);
    //Email
    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'create-email');
    input.setAttribute('value', 'dummy@host.com');
    cell.appendChild(input);
    row.appendChild(cell);
    //City
    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'create-city');
    input.setAttribute('value', 'DUMMY');
    cell.appendChild(input);
    row.appendChild(cell);
    //Country
    var cell = document.createElement("td");
    var select = document.createElement("select");
    select.setAttribute('name', 'create-country');
    delegateSelectOption(select,"", "Select Country");
    countries.forEach(function(country){
        delegateSelectOption(select ,country);
    });
    cell.appendChild(select);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute('type', 'button');
    input.setAttribute('value', 'Create Customer');
    input.addEventListener('click', function(){
        submitCustomerForm();
    });
    cell.appendChild(input);
    row.appendChild(cell);

    delegate.appendChild(row);
}

function renderCustomer(delegate, customer, editing = false, withEdit = true) {
    if (editing) {
        var row = delegate;
        delegate.innerHTML = null;
    } else {
        var row = document.createElement("tr");
        row.setAttribute('id', 'customer-' + customer.id);
    }

    //Picture
    var cell = document.createElement("td");
    var figure = document.createElement("figure");
    figure.setAttribute('class', 'customer-picture');
    var image = document.createElement("img");
    image.setAttribute('src', customer.image);
    figure.appendChild(image);
    cell.appendChild(figure);
    row.appendChild(cell)

    //Lastname, Firstname, Email, City and Country
    delegateCellText("td", row, customer.lastname);
    delegateCellText("td", row, customer.firstname);
    delegateCellText("td", row, customer.email);
    delegateCellText("td", row, customer.city);
    delegateCellText("td", row, customer.country);

    //Actions
    if (withEdit) {
        var cell = document.createElement("td");
        var anchor = document.createElement("a");
        var text = document.createTextNode('Edit');
        anchor.setAttribute('class', 'clickable');
        anchor.appendChild(text);
        anchor.addEventListener('click', function(){
            editCustomer(customer.id);
        });
        cell.appendChild(anchor);
        row.appendChild(cell);
    }

    if (!editing) {
        delegate.appendChild(row);
    }
}

function renderEditableCustomer(delegate, customer){
    element('customer-prototype').style.display = "none";
    customerForm['mode'] = 'edit';
    delegate.innerHTML = null;

    //Picture
    var cell = document.createElement("td");
    var figure = document.createElement("figure");
    figure.setAttribute('class', 'customer-picture');
    var image = document.createElement("img");
    image.setAttribute('src', customer.image);
    figure.appendChild(image);
    var fileInput = document.createElement("input");
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('name', 'edit-image');
    fileInput.setAttribute('id', 'edit-image');
    cell.appendChild(figure);
    cell.appendChild(fileInput);
    delegate.appendChild(cell)

    //Lastname, Firstname, Email, City and Country
    delegateCellInput("td", delegate, customer.lastname, 'edit-lastname');
    delegateCellInput("td", delegate, customer.firstname, 'edit-firstname');
    delegateCellInput("td", delegate, customer.email, 'edit-email');
    delegateCellInput("td", delegate, customer.city, 'edit-city');

    var cell = document.createElement("td");
    var select = document.createElement("select");
    select.setAttribute('name', 'edit-country');
    select.setAttribute('id', 'edit-country');
    delegateSelectOption(select,"", "Select Country");
    countries.forEach(function(country){
        delegateSelectOption(select, country, country, country == customer.country);
    });
    cell.appendChild(select);
    delegate.appendChild(cell);

    //Actions
    var cell = document.createElement("td");
    var saveButton = document.createElement("input");
    saveButton.setAttribute('type', 'button')
    saveButton.setAttribute('value', 'Save');
    saveButton.addEventListener('click', function(){
        submitCustomerForm();
    });
    cell.appendChild(saveButton);

    var cancelButton = document.createElement("input");
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('value', 'Cancel');
    cancelButton.addEventListener('click', function(){
        resetEditableCustomer(delegate, customer);
    });
    cell.appendChild(cancelButton);

    var xButton = document.createElement("button");
    xButton.innerHTML = '&times';
    xButton.addEventListener('click', function(){
        renderCustomer(delegate, customer, true)
        resetCustomerFormMode();
    });
    cell.appendChild(xButton);

    delegate.appendChild(cell);
}

function resetCustomerFormMode(){
    customerForm['mode'] = 'create';
    customer = {};
    element('customer-prototype').style.display = "table-row";
}

function resetEditableCustomer(delegate, customer){
    for (var [attribute, type] of Object.entries(customerModel.attributes)) {

        switch (type){
            case 'text':
            case 'select':
                element('edit-' + attribute).value = customer[attribute]
                break;
        }
    }
}

function loadCustomers() {
    var request = new XMLHttpRequest();
    request.onload = function () {

        var response = JSON.parse(this.responseText);

        if(response.successful){
            customers = [];
            var tableDelegate = element('customersTable');
            tableDelegate.innerHTML = null;
            renderCustomerHeader(tableDelegate);
            renderCustomerForm(tableDelegate);
            customers = response.values;
            customers.forEach(function(customer){
                renderCustomer(tableDelegate, customer);
            });
        } else {
            messageModal.open(response.message, response.errors);
        }
    };
    request.open('GET', './services/customers.php');
    request.send();
}

function submitCustomerForm(){
    var form = element('customer-form');
    var formData = new FormData();

    for (var [attribute, type] of Object.entries(customerModel.attributes)) {

        switch (type){
            case 'text':
            case 'select':
                formData.append(attribute, form.elements[customerForm['mode'] + '-' + attribute].value);
                break;
            case 'image':
                formData.append(attribute, form.elements[customerForm['mode'] + '-' + attribute].files[0]);
                break;
        }
    }

    var request = new XMLHttpRequest();
    request.onload = function () {
        var response = JSON.parse(this.responseText);

        if(response.successful){
            messageModal.open(response.message, response.values, () => {
                loadCustomers();
                resetCustomerFormMode();
            });
        } else {
            messageModal.open(response.message, response.errors);
        }
    };
    request.open('POST', customerForm.service[customerForm['mode']] + "?id=" + customer.id);
    request.send(formData);
}

function editCustomer(id){
    var rowDelegate = element('customer-' + id);

    var request = new XMLHttpRequest();
    request.onload = function () {
        var response = JSON.parse(this.responseText);

        if(response.successful){

            if(customerForm['mode'] == 'edit'){
                renderCustomer(element('customer-' + customer.id), customer, true)
            }

            customer = {};
            customer = response.values[0];
            renderEditableCustomer(rowDelegate, customer);
        } else {
            messageModal.open(response.message, response.errors);
        }
    };

    var url = new URL('http://localhost/web/2022-07-23-aeptest/services/customer.php');
    url.searchParams.set('filters', JSON.stringify({
        'id' : id
    }));

    request.open('GET', url);
    request.send();
}

function searchCustomer(){
    var email = element('search-customer-email').value;

    var request = new XMLHttpRequest();
    request.onload = function () {
        var response = JSON.parse(this.responseText);

        if(response.successful){
            customers = [];
            var tableDelegate = element('customersTable');
            tableDelegate.innerHTML = null;
            renderCustomerHeader(tableDelegate, false);
            customers = response.values;
            customers.forEach(function(customer){
                renderCustomer(tableDelegate, customer, false, false);
            });
        } else {
            messageModal.open(response.message, response.errors);
        }
    };

    var url = new URL('http://localhost/web/2022-07-23-aeptest/services/customer.php');
    url.searchParams.set('filters', JSON.stringify({
        'email' : email
    }));

    request.open('GET', url);
    request.send();
}

