import DBFunctions from '../../Storage/DBFunctions.js';

function Driver(firstName, lastName) {
this.firstName = firstName;
this.lastName = lastName;
}


async function addDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName}
    return await DBFunctions.addDriverDB(d);
}

function getDriver(driver) {
    return DBFunctions.getDriverDB(driver.id);
}

function deleteDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName, id: driver.id}
    DBFunctions.deleteDriverDB(d);
}

function editDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName, id: driver.id}
    DBFunctions.editDriverDB(d);
}

async function getDrivers() {
    return await DBFunctions.getDriversDB();
}

//hent driver tasks
/*
app.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});
*/

/*
//add
let driver = new Driver('Mikkel', 'Lindhøj');
driver = await addDriver(driver);
*/

/*
//delete
let driver = new Driver('Mikkel', 'Lindhøj');
driver = await addDriver(driver);
console.log(driver);
await deleteDriver(driver);
*/

/*
//edit
let driver = new Driver('Mikkel', 'Lindhøj');
driver = await addDriver(driver);

driver.firstName = 'bølle';
console.log(driver)
await editDriver(driver);
*/

//


//get
let driver = new Driver("Mikkel", "Lindhøj");
driver = await addDriver(driver);

let c = await getDriver(driver);


/*
//getALL
let driver = new Driver("Mikkel", "Lindhøj");
driver = await addDriver(driver);

let drivers = await getDrivers();
console.log(drivers);
*/

export default {addDriver, getDrivers, deleteDriver, editDriver, getDriver}