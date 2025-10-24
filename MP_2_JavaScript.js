//Last Names: Ortega, De Leon, Lee, Robenta
//Language: JavaScript
//Paradigm(s): Object-Oriented, Functional, Procedural

//Allows getting user input from the terminal.
const scan = require('readline-sync'); // Import readline-sync for terminal input

/**
 * The registered account name of the user.
 * @global
 * @type {string|undefined}
 * @default undefined
 */
let accountName; // Variable to store the user's account name

/**
 * The current account balance of the user.
 * @global
 * @type {number}
 * @default 0
 */
let balance = 0.00; // Initialize balance to zero

/**
 * The list of supported currencies with their symbols.
 * Philippine Peso (PHP) is always the base currency.
 * @global
 * @constant
 * @type {Array<{currency: string, symbol: string}>}
 * @example
 * // Example element:
 * // { currency: 'United States Dollar', symbol: 'USD' }
 */
const currencyList = [
        { currency: 'Philippine Peso', symbol: 'PHP' },
        { currency: 'United States Dollar', symbol: 'USD' },
        { currency: 'Japanese Yen', symbol: 'JPY' },
        { currency: 'British Pound Sterling', symbol: 'GBP' },
        { currency: 'Euro', symbol: 'EUR' },
        { currency: 'Chinese Yuan Renminni', symbol: 'CNY' },
];

/**
 * Stores the exchange rate of each supported currency relative to PHP.
 * The first element (index 0) represents PHP with a rate of 1.0.
 * @global
 * @type {number[]}
 * @default [1.0]
 * @example
 * // Example contents after recording rates:
 * // [1.00, 52.00, 0.37, 68.00, 70.00, 7.20]
 */
const exchangeRates = [1.00]; // PHP default rate

/** 
 * Prompts the user whether to return to Menu or exit the program.
 * @function ReturnToMenuPrompt
 * @returns {void} Does not return a value; it handles prompting the user to either return to menu or end program.
*/
function ReturnToMenuPrompt() {
        // Prompt user to return to main menu or exit program
        while (true) {
                let choice = scan.question('Back to the main menu (Y/N): ').toUpperCase(); // Ask user choice and convert to uppercase
                if (choice === 'Y') { // If yes, show main menu
                        MainMenu();
                        break;
                } else if (choice === 'N') { // If no, exit the program
                        console.log('Thank you for using the program!');
                        process.exit(); // Terminates the process
                } else { // Invalid input, repeat prompt
                        console.log('Invalid Input!');
                }
        }
}

/**
 * Displays the Menu options.
 * @function DisplayMenuOptions
 * @returns {void} Does not return a value; it displays the choices of the menu.
 */
function DisplayMenuOptions() {
        // Display Menu Options using console.log
        console.log('Select Transaction:');
        console.log('[1]. Register Account Name');
        console.log('[2]. Deposit Amount');
        console.log('[3]. Withdraw Amount');
        console.log('[4]. Currency Exchange');
        console.log('[5]. Record Interest Rates');
        console.log('[6]. Show Interest Computation');
        console.log('');
}
/**
 * Handles logic for switch statement used when user is prompted for choice in the Menu.
 * @param {number} choice - user input based on the Menu options.
 * @returns {void} Does not return a value; executes other functions depending on the choice of the user.
 */
function HandleMenuChoice(choice) {
        // Handle Menu Choice using switch statement
        switch (choice) {
                case 1:
                        RegisterAccountName(); // Go to account registration
                        break;
                case 2:
                        DepositAmount(); // Deposit money
                        break;
                case 3:
                        WithdrawAmount(); // Withdraw money
                        break;
                case 4:
                        CurrencyExchange(); // Perform currency exchange
                        break;
                case 5:
                        RecordExchangeRates(); // Record exchange rates
                        break;
                case 6:
                        ShowInterestComputation(); // Compute interest
                        break;
                default:
                        console.log('Invalid choice!'); // Handle invalid input
                        MainMenu(); // Return to main menu
        }
}
/**
 * Shows the main menu and routes the user to functions that they chose.
 * @function MainMenu
 * @returns {void} Does not return a value; it displays the main menu and handles user choice.
 */
function MainMenu() {
        // Handle Main Menu display and logic using DisplayMenuOptions and HandleMenuChoice respectively.
        DisplayMenuOptions(); // Show menu options
        let choice = parseInt(scan.question('Please select an option: ')); // Read user choice as integer
        HandleMenuChoice(choice); // Execute function based on choice
}

/**
 * Registers the account name given by the user.
 * @function RegisterAccountName
 * @returns {void} Does not return a value; sets the global variable 'accountName'.
 */
function RegisterAccountName() {
        console.log('Register Account Name');
        if (accountName !== undefined) { // If account already registered
                console.log(`An account already exists.`); // Show current name
        } else { // If no account registered yet
        accountName = scan.question('Enter Account Name: '); // Set global variable 'accountName'
        }
        ReturnToMenuPrompt(); // Ask user to return or exit
}
/**
 * Checks if an account name is registered.
 * @function checkAccountExists
 * @global {string|undefined} accountName - The registered account name of the user.
 * @returns {boolean} Returns false if no account name is registered; otherwise, returns true.
 */
function checkAccountExists() {
        if (accountName === undefined) { // If accountName not set
                console.log('No account registered yet. Please register an account name first.');
                return false; // Return false if no account exists
        }
        return true; // Otherwise, return true
}
/**
 * Prompts the user in the terminal for deposit amount and adds to 'balance'.
 * @function DepositAmount
 * @global {number} balance - The account's balance.
 * @returns {void} Does not return a value; adds specified deposit amount to global variable 'balance'.
 */
function DepositAmount() {
        // if (!checkAccountExists()) { // Prevent deposit if no account
        //         ReturnToMenuPrompt();
        // }

        let accountInput = scan.question('Enter Account Name: '); // Ask for account name

        if (accountInput !== accountName) { // Validate account name
                console.log('Account name does not match. Withdrawal cancelled.');
                ReturnToMenuPrompt();
                return;
        }

        console.log('Deposit Amount');
        console.log(`Account Name: ${accountName}`);
        console.log(`Current Balance: ${balance.toFixed(2)}`); // Display 2 decimal places
        console.log(`Currency: ${currencyList[0].symbol}`);
        console.log('');

        let deposit = parseFloat(scan.question('Deposit Amount: ')); // Get user input for deposit

        while (true) {
                if (isNaN(deposit) || deposit <= 0) { // Validate input
                        console.log('Invalid Input!');
                        deposit = parseFloat(scan.question('Deposit Amount: ')); // Retry
                } else {
                        balance += deposit; // Add deposit to balance
                        console.log('New Balance: ' + balance.toFixed(2));
                        ReturnToMenuPrompt(); // Ask user to return or exit
                }
        }

}

/**
 * Prompts the user in the terminal for withdraw amount and subtracts from 'balance'.
 * @function DepositAmount
 * @global {number} balance - The account's balance.
 * @returns {void} Does not return a value; subtracts specified withdraw amount to global variable 'balance'.
 */
function WithdrawAmount() {
        // if (!checkAccountExists()) { // Ensure account exists
        //         ReturnToMenuPrompt();
        // }

        let accountInput = scan.question('Enter Account Name: '); // Ask for account name

        if (accountInput !== accountName) { // Validate account name
                console.log('Account name does not match. Withdrawal cancelled.');
                ReturnToMenuPrompt();
                return;
        }

        console.log('Withdraw Amount');
        console.log(`Account Name: ${accountName}`);
        console.log(`Current Balance: ${balance.toFixed(2)}`);
        console.log(`Currency: ${currencyList[0].symbol}`);
        console.log('');

        let withdraw = parseFloat(scan.question('Withdraw Amount: ')) // Read withdrawal amount

        while (true) {
        if (isNaN(withdraw) || withdraw <= 0) { // Validate input
                console.log('Invalid Input!');
                withdraw = parseFloat(scan.question('Withdraw Amount: ')) // Retry
        } else if (withdraw > balance) { // Prevent overdraft
                console.log('Insufficient Balance!');
                withdraw = parseFloat(scan.question('Withdraw Amount: '))
        } else {
                balance -= withdraw; // Deduct from balance
                console.log('New Balance: ' + balance.toFixed(2));
                ReturnToMenuPrompt(); // Ask user to return or exit
        }
        }
}

/**
 * Displays the list of supported currencies with their symbols.
 * @function displayCurrencies
 * @returns {void} Does not return a value; it displays the list of currencies.
 */
function displayCurrencies() {
        for (let i = 0; i < currencyList.length; i++) {
                console.log(`[${i + 1}]. ${currencyList[i].currency} (${currencyList[i].symbol})`); // Display index and currency info
        }
        console.log('');
}

/**
 * Handles the currency exchange process.
 * @function CurrencyExchange
 * @returns {void} Does not return a value; it manages the currency exchange workflow.
 */
function CurrencyExchange() {
        // if (!checkAccountExists()) { // Stop if no account exists
        //         ReturnToMenuPrompt();
        //         return;
        // }

        let accountInput = scan.question('Enter Account Name: '); // Ask for account name

        if (accountInput !== accountName) { // Validate account name
                console.log('Account name does not match. Withdrawal cancelled.');
                ReturnToMenuPrompt();
                return;
        }

        console.log('Foreign Currency Exchange');
        displayCurrencies(); // Show all currency options

        let sourceCurrency, exchangeCurrency;
        let sourceRate, exchangeRate;
        let sourceAmount, exchangedAmount;

        // Ask for source currency
        while (true) {
                sourceCurrency = parseInt(scan.question('Source Currency Option: '));
                if (!isNaN(sourceCurrency) &&
                        sourceCurrency >= 1 &&
                        sourceCurrency <= currencyList.length &&
                        exchangeRates[sourceCurrency - 1] !== undefined) { // Ensure rate exists
                        break;
                }

                if (exchangeRates[sourceCurrency - 1] === undefined) { // Missing rate
                        console.log('Exchange rate for selected currency is not recorded yet. Please record the exchange rate first.');
                        ReturnToMenuPrompt();
                        return;
                }

                console.log('Invalid choice! Please try again.'); // Retry
        }

        sourceRate = exchangeRates[sourceCurrency - 1]; // Get rate of source currency

        // Ask for amount to exchange
        while (true) {
                sourceAmount = parseFloat(scan.question('Source Amount: '));

                if (isNaN(sourceAmount) || sourceAmount <= 0) { // Validate amount
                        console.log('Invalid Amount!');
                } else {
                        break;
                }
        }

        console.log('Exchanged Currency Options:');
        displayCurrencies(); // Show again for destination currency

        // Ask for target currency
        while (true) {
                exchangeCurrency = parseInt(scan.question('Exchange Currency: '));

                if (!isNaN(exchangeCurrency) &&
                        exchangeCurrency >= 1 &&
                        exchangeCurrency <= currencyList.length &&
                        exchangeCurrency !== sourceCurrency &&
                        exchangeRates[exchangeCurrency - 1] !== undefined) { // Ensure target rate exists
                        break;
                }

                if (exchangeRates[exchangeCurrency - 1] === undefined) {
                        console.log('Exchange rate for selected currency is not recorded yet. Please record the exchange rate first.');
                        ReturnToMenuPrompt();
                        return;
                }

                console.log('Invalid choice! Please try again.'); // Retry input
        }

        exchangeRate = exchangeRates[exchangeCurrency - 1]; // Get target rate

        exchangedAmount = sourceAmount * (sourceRate / exchangeRate); // Conversion formula

        console.log(`Exchanged Amount: ${exchangedAmount.toFixed(2)} ${currencyList[exchangeCurrency - 1].symbol}`); // Display converted value

        let choice = scan.question('Convert Another Currency (Y/N)?: '); // Ask for another transaction

        while (true) {

                choice = choice.toUpperCase(); // Standardize input

                if (choice === 'Y') { // If yes, restart
                        CurrencyExchange();
                        break;
                } else if (choice === 'N') { // If no, return to menu
                        ReturnToMenuPrompt();
                        break;
                }
                else {
                        console.log('Invalid input. Try again!') // Invalid input handling
                        choice = scan.question('Convert another currency (Y/N): ');
                }
        }
}
/**
 * Records the exchange rates for supported currencies.
 * @function RecordExchangeRates
 * @returns {void} Does not return a value; it updates the exchange rates in the global variable array 'exchangeRates'.
 */
function RecordExchangeRates() {
        // if (!checkAccountExists()) { // Stop if no account exists
        //         ReturnToMenuPrompt();
        //         return;
        // }

        let accountInput = scan.question('Enter Account Name: '); // Ask for account name

        if (accountInput !== accountName) { // Validate account name
                console.log('Account name does not match. Withdrawal cancelled.');
                ReturnToMenuPrompt();
                return;
        }

        console.log('Record Exchange Rates');

        displayCurrencies(); // Show all currencies

        let currency;

        while (true) {
                currency = parseInt(scan.question('Select Foreign Currency: ')); // Get currency option

                if (!isNaN(currency) && currency >= 1 && currency <= 6) { // Validate choice
                        break;
                }

                console.log('Invalid choice! Please enter a number from 1 to 6.');
        }

        let rate;

        while (true) {
                rate = parseFloat(scan.question('Exchange Rate: ')); // Get rate input

                if (!isNaN(rate) && rate > 0) { // Ensure positive valid rate
                        exchangeRates[currency - 1] = rate; // Store rate
                        break;
                }

                console.log('Invalid rate! Please enter a value greater than 0.');
        }

        ReturnToMenuPrompt(); // Return to main menu
}
/** * Shows interest computation based on the current balance.
 * @function ShowInterestComputation
 * @returns {void} Does not return a value; it displays interest computation details.
 */
function ShowInterestComputation() {
        // if (!checkAccountExists()) { // Stop if no account exists
        //         ReturnToMenuPrompt();
        //         return;
        // }

        let accountInput = scan.question('Enter Account Name: '); // Ask for account name

        if (accountInput !== accountName) { // Validate account name
                console.log('Account name does not match. Withdrawal cancelled.');
                ReturnToMenuPrompt();
                return;
        }

        const interestRate = 0.05; // Annual interest rate
        const daysInYear = 365; // Standard year

        console.log('Show Interest Amount');
        console.log(`Account Name: ${accountName}`);
        console.log(`Current Balance: ${balance.toFixed(2)}`);
        console.log(`Currency: ${currencyList[0].symbol}`);
        console.log('Interest Rate: ' + (interestRate * 100) + '%');
        console.log('');

        let interestAmount = parseFloat((balance * (interestRate / daysInYear)).toFixed(2)); // Daily interest
        let totalAmount = balance; // Start with current balance
        let periodInDays = parseInt(scan.question('Total Number of Days: ')); // Ask duration
        let count = 0;

        console.log('Day | Interest | Balance');

        while (count < periodInDays) { // Loop through number of days
                totalAmount += interestAmount; // Add daily interest
                console.log(`${count + 1}   | ${interestAmount}     | ${totalAmount.toFixed(2)}`); // Display each day’s interest
                count++; // Increment day counter
        }

        ReturnToMenuPrompt(); // Return to main menu
}

MainMenu(); // Start the program by showing the main menu

