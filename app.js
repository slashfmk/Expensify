

const okBtn = document.querySelector('#ok-btn');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const actionType = document.querySelector('#action-type');
const date = document.querySelector('.date');
const myForm = document.querySelector('.form-1');



let expense_total = document.querySelector('#expense_total');
let income_total = document.querySelector('#income_total');
let available_total = document.querySelector('.header__available');


const incomeList = document.querySelector('ul.incomes-list');
const expensesList = document.querySelector('ul.expenses-list');

const MANGETA = '#00bcd5';
const RED = '#de2424';


//onload(loadingData());



// Class that handles expense and income
class Element {
    constructor(desc, amount, type) {
        this.desc = desc;
        this.amount = Number(amount);
        this.type = type;
    }

}

function methodsLoader(){

    document.addEventListener('DOMContentLoaded', checkAction);
    document.addEventListener('DOMContentLoaded', checkBtn);
    document.addEventListener('DOMContentLoaded', loadingData);
    document.addEventListener('DOMContentLoaded', avail);
    actionType.addEventListener('click', checkAction);

   // document.addEventListener('click', deleteItem);
    //okBtn.addEventListener('click', storeData);
    myForm.addEventListener('submit', storeData);
    description.addEventListener('keyup', checkBtn);
    amount.addEventListener('keyup', checkBtn);


}

methodsLoader();


// Initializing
const dt = new Date();
date.textContent = `${dt.getFullYear()}`;

// Control active button
function checkBtn() {

    if (description.value === '' || amount.value === '' || isNaN(amount.value)) {
        okBtn.style.background = '#ccc';
    } else {
        if (actionType.value === 'add') {
            okBtn.style.background = MANGETA;
        }
        else{
            okBtn.style.background = RED;
        }
    }

}



// Decorating and check the form
function checkAction(){
    if (actionType.value === 'add') {
        description.style.border = 'solid 1px '+MANGETA+'';
        amount.style.border = 'solid 1px '+MANGETA+'';
        actionType.style.border = 'solid 1px '+MANGETA+'';
        okBtn.textContent = '+';

        if(description.value !== '' && amount.value !== '' && !isNaN(amount.value)){
            okBtn.style.background = ''+MANGETA+'';
        }
        else
        {

        }


    } else {
        amount.style.border = 'solid 1px '+RED+'';
        description.style.border = 'solid 1px '+RED+'';
        actionType.style.border = 'solid 1px '+RED+'';
        okBtn.textContent = '-';

        if(description.value !== '' && amount.value !== '' && !isNaN(amount.value)){
            okBtn.style.background = RED;
        }
    }

}


// Display available amount of money, total expenses and incomes
function avail(){

    available_total.textContent = availableBudget();
    expense_total.textContent = expensesTotal();
    income_total.textContent = incomesTotal();

    if(available_total.textContent < 0){
        available_total.style.color = RED;
    }
    else{
        available_total.style.color = '#fff';
    }

}



// Loading data from local Storage
function loadingData(){

    if(localStorage.getItem('incomesStack') !== null) {

        let incomesRetrieved;
        incomesRetrieved = JSON.parse(localStorage.getItem('incomesStack'));

        incomesRetrieved.forEach((itm) => {

            actionType.style.border = 'solid 1px ' + MANGETA + '';

            const el = document.createElement('li');
            el.classList.add('income-item');
            el.classList.add('list__item');

            const price = document.createElement('span');
            price.classList.add('amount-item-income');


            // income_total.textContent = Number(income_total.textContent) + itm.amount;
            income_total.textContent = incomesTotal();

            el.appendChild(document.createTextNode(`${itm.desc}`));

            price.appendChild(document.createTextNode(`${itm.amount}`));
            el.appendChild(price);

            incomeList.appendChild(el);

        });

    }


    if(localStorage.getItem('expensesStack') !== null) {

        let expensesRetrieved;
        expensesRetrieved = JSON.parse(localStorage.getItem('expensesStack'));

        expensesRetrieved.forEach((itm) => {

            const el = document.createElement('li');
            const price = document.createElement('span');

            actionType.style.border = 'solid 1px ' + RED + '';

            el.classList.add('expense-item');
            el.classList.add('list__item');


            price.classList.add('amount-item-expense');

            // expense_total.textContent = Number(expense_total.textContent) + itm.amount;
            expense_total.textContent = expensesTotal();

            el.appendChild(document.createTextNode(`${itm.desc}`));

            price.appendChild(document.createTextNode(`${itm.amount}`));
            el.appendChild(price);

            expensesList.appendChild(el);

        });
    }

}



// Storing the data in the local Storage

function storeData(e) {

    e.preventDefault();

    let incomesStack, expensesStack;

    if (description.value !== '' && !isNaN(amount.value) && amount.value !== '') {


        if (actionType.value === 'add')
        {
            const itm = new Element(description.value, amount.value, 'add');

            // Local Storage
            if(localStorage.getItem('incomesStack') === null){
                incomesStack = [];
            }else{
                incomesStack = JSON.parse(localStorage.getItem('incomesStack'));
            }

            incomesStack.push(itm);
            localStorage.setItem('incomesStack', JSON.stringify(incomesStack));


                // Adding income entry in the DOM
                actionType.style.border = 'solid 1px ' + MANGETA + '';

                const el = document.createElement('li');
                el.classList.add('income-item');
                el.classList.add('list__item');

                const price = document.createElement('span');
                price.classList.add('amount-item-income');

                el.appendChild(document.createTextNode(`${itm.desc}`));

                price.appendChild(document.createTextNode(`${itm.amount}`));
                el.appendChild(price);

                incomeList.appendChild(el);


            }
        else
            {

            const itm = new Element(description.value, amount.value, 'substract');

            // Local storage
           let expensesStack;

           if(localStorage.getItem('expensesStack') === null){
               expensesStack = [];
           }else{
                expensesStack = JSON.parse(localStorage.getItem('expensesStack'));
           }

           expensesStack.push(itm);
           localStorage.setItem('expensesStack', JSON.stringify(expensesStack));


                // Writing expense entry in the DOM

                    const el = document.createElement('li');
                    const price = document.createElement('span');

                    actionType.style.border = 'solid 1px ' + RED + '';

                    el.classList.add('expense-item');
                    el.classList.add('list__item');


                    price.classList.add('amount-item-expense');




                    el.appendChild(document.createTextNode(`${itm.desc}`));

                    price.appendChild(document.createTextNode(`${itm.amount}`));
                    el.appendChild(price);

                    expensesList.appendChild(el);



                }


    }

    avail();


}


// method that calculates the total of all incomes
function incomesTotal(){

    let incomes = document.querySelectorAll('.amount-item-income');
    let total = 0;

    incomes.forEach((item) =>{
        total += Number(item.textContent);
    });

    return total;
}

// Method that calculates the total of all expenses
function expensesTotal(){
    let incomes = document.querySelectorAll('.amount-item-expense');
    let total = 0;

    incomes.forEach((item) =>{
        total += Number(item.textContent);
    });

    console.log(total);
    return total;
}

function availableBudget(){
    return incomesTotal() - expensesTotal();
}


function deleteItem(e){

    if(e.target.classList.contains('amount-item-income')){
        console.warn(`target clicked!!`);

        // available_total.textContent = Number(available_total.textContent) - Number(e.target.textContent);
        // console.warn(available_total.textContent);
        // console.warn(available_total.textContent);
        // console.warn(e.target.textContent);
        // e.target.parentElement.remove();


    }
    // avail();
}

