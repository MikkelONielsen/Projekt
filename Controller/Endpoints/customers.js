import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------

customerRouter.get('/', (req, res) => {
    let isLoggedIn = false
    if (req.session.isLoggedIn) {
        isLoggedIn = true
        res.render('../GUI/views/customers.pug', {knownUser: isLoggedIn})
    } else {
        res.redirect('/customerLogin')
    }
    
})

customerRouter.post('/login', (req, res) => {
    const {username, password} = req.body
    if (checkUser(username, password)) {
        req.session.isLoggedIn = true
        res.redirect('/')
    } else {
        res.send('Forkert brugernavn eller adgangskode')
    }
})

customerRouter.get('/secret', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('customers', {knownUser: req.session.isLoggedIn})
    } else {
        res.redirect('/customerLogin')
    }
})

customerRouter.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// TODO
// Simulator af databaseopkald
function checkUser(user, password) {
    let returnValue = false
    if (user == 'Maksym' && password == '123') {
        returnValue = true
    }
    return returnValue
}


// -------------------------------
// customer-ENDPOINTS for booking |
// -------------------------------

customerRouter.post('/Journey/Book/4day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controller.addJourney4Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

customerRouter.post('/Journey/Book/3day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controller.addJourney3Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

customerRouter.get('/Journey/Mypage/:id', async (req, res) => {
    
        try {
            const customerId = req.params.customerId;
            const customerJourneys = await controller.getCustomerJourneys(customerId);
            const customer = await controller.getCustomer(customerId);
    
            res.render('../GUI/views/CustomerPage', { trips: customerJourneys, customer: customer });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
});
    
     


export default customerRouter;