//Allows getting user input from the terminal.
const scan = require('readline-sync');

/**
 * The registered account name of the user.
 * @global
 * @type {string|undefined}
 * @default undefined
 */
let accountName;

/**
 * The current account balance of the user.
 * @global
 * @type {number}
 * @default 0
 */
let balance = 0;

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
 * // [1.0, 52.0, 0.37, 68.0, 70.0, 7.2]
 */
const exchangeRates = [1.0];

/** 
 * Prompts the user whether to return to Menu or exit the program.
 * @function ReturnToMenuPrompt
 * @returns {void} Does not return a value; it handles prompting the user to either return to menu or end program.
*/
function ReturnToMenuPrompt() {
        while (true) {
                let choice = scan.question('Back to the main menu (Y/N): ').toUpperCase();
                if (choice === 'Y') {
                        MainMenu();
                        break;
                } else if (choice === 'N') {
                        console.log('Thank you for using the program!');
                        process.exit();
                } else {
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
        switch (choice) {
                case '1':
                        RegisterAccountName();
                        break;
                case '2':
                        DepositAmount();
                        break;
                case '3':
                        WithdrawAmount();
                        break;
                case '4':
                        CurrencyExchange();
                        break;
                case '5':
                        RecordExchangeRates();
                        break;
                case '6':
                        ShowInterestComputation();
                        break;
                default:
                        console.log('Invalid choice!');
                        MainMenu();
        }
}
/**
 * Shows the main menu and routes the user to functions that they chose.
 * @function MainMenu
 * @returns {void}
 */
function MainMenu() {
        DisplayMenuOptions();
        let choice = parseInt(scan.question('Please select an option: '));
        HandleMenuChoice(choice);
}

/**
 * Registers the account name given by the user.
 * @function RegisterAccountName
 * @returns {void}
 */
function RegisterAccountName() {
        console.log('Register Account Name');
        accountName = scan.question('Enter Account Name: ');
        ReturnToMenuPrompt();
}

/**
 * Prompts the user in the terminal for deposit amount and adds to balance.
 * @function DepositAmount
 * @global {number} balance - The account's balance.
 * @returns {void} Adds specified deposit amount to global variable 'balance'.
 */
function DepositAmount() {
        console.log('Deposit Amount');
        console.log(`Account Name: ${accountName}`);
        console.log(`Current Balance: ${balance}`);
        console.log(`Currency: ${currencyList[0].symbol}`);
        console.log('');

        let deposit = parseFloat(scan.question('Deposit Amount: '));

        if (isNaN(deposit) || deposit <= 0) {
                console.log('Invalid Input!');
                DepositAmount();
        } else {
                balance += deposit;
                console.log('New Balance: ' + balance);
                ReturnToMenuPrompt();
        }

}

function WithdrawAmount() {
        console.log('Withdraw Amount');
        console.log(`Account Name: ${accountName}`);
        console.log(`Current Balance: ${balance}`);
        console.log(`Currency: ${currencyList[0].symbol}`);
        console.log('');

        let withdraw = parseFloat(scan.question('Withdraw Amount: '))

        if (isNaN(withdraw) || withdraw <= 0) {
                console.log('Invalid Input!');
                WithdrawAmount();
        } else if (withdraw > balance) {
                console.log('Insufficient Balance!');
                WithdrawAmount();
        } else {
                balance -= withdraw;
                console.log('New Balance: ' + balance);
                ReturnToMenuPrompt();
        }
}

function displayCurrencies() {
        for (let i = 0; i < currencyList.length; i++) {
                console.log(`[${i + 1}]. ${currencyList[i].currency} (${currencyList[i].symbol})`);
        }
        console.log('');
}

function CurrencyExchange() {

        console.log('Foreign Currency Exchange');
        displayCurrencies();

        let sourceCurrency, exchangeCurrency;
        let sourceRate, exchangeRate;
        let sourceAmount, exchangedAmount;

        while (true) {
                sourceCurrency = parseInt(scan.question('Source Currency Option: '));
                if (!isNaN(sourceCurrency) && sourceCurrency >= 1 && sourceCurrency <= currencyList.length) {
                        break;
                }
                console.log('Invalid choice! Please try again.');
        }

        sourceRate = exchangeRates[sourceCurrency - 1];


        while (true) {
                sourceAmount = parseFloat(scan.question('Source Amount: '));

                if (isNaN(sourceAmount) || sourceAmount <= 0) {
                        console.log('Invalid Amount!');
                } else {
                        break;
                }
        }

        console.log('Exchanged Currency Options:');
        displayCurrencies();


        while (true) {
                exchangeCurrency = parseInt(scan.question('Exchange Currency: '));

                if (!isNaN(exchangeCurrency) &&
                        exchangeCurrency >= 1 &&
                        exchangeCurrency <= currencyList.length &&
                        exchangeCurrency !== sourceCurrency) {
                        break;
                }

                console.log('Invalid choice! Please try again.');
        }

        exchangeRate = currencyList[exchangeCurrency - 1].rate;

        exchangedAmount = sourceAmount * (exchangeRate / sourceRate);

        console.log(`Exchanged Amount: ${exchangedAmount.toFixed(2)} ${currencyList[exchangeCurrency - 1].symbol}`);

        let choice = parseInt(scan.question('Convert Another Currency (Y/N)?: '))

        while (true) {

                choice = choice.toUpperCase();

                if (choice === 'Y') {
                        CurrencyExchange();
                        break;
                } else if (choice === 'N') {
                        ReturnToMenuPrompt();
                        break;
                }
                else {
                        console.log('Invalid input. Try again!')
                        choice = parseInt(scan.question('Convert another currency (Y/N): '));
                }
        }
}

function RecordExchangeRates() {
        console.log('Record Exchange Rates');

        displayCurrencies();

        let currency;

        while (true) {
                currency = parseInt(scan.question('Select Foreign Currency: '));

                if (!isNaN(currency) && currency >= 1 && currency <= 6) {
                        break;
                }

                console.log('Invalid choice! Please enter a number from 1 to 6.');
        }

        let rate;

        while (true) {
                rate = parseFloat(scan.question('Exchange Rate: '));

                if (!isNaN(rate) && rate > 0) {
                        exchangeRates[currency - 1] = rate;
                        break;
                }

                console.log('Invalid rate! Please enter a value greater than 0.');
        }
}
function ShowInterestComputation() {

}

MainMenu();