let data=
JSON.parse(
localStorage.getItem(
"transactions"
)
)||[];


let budget=
localStorage.getItem(
"budget"
)||0;


let chart;


// THEME

let savedTheme=
localStorage.getItem(
"theme"
)||"dark";


if(
savedTheme==="light"
){

document.body.classList.add(
"light-theme"
);

}


themeBtn.onclick=()=>{

document.body.classList.toggle(
"light-theme"
);

localStorage.setItem(

"theme",

document.body.classList.contains(
"light-theme"
)

?

"light"

:

"dark"

);

};


// CATEGORIES

const categories={

Income:[

"Salary",
"Business",
"Freelancing",
"Investment"

],

Expense:[

"Food",
"Travel",
"Shopping",
"Rent",
"Bills",
"Health"

]

};


function updateCategories(){

category.innerHTML="";


categories[
type.value
]

.forEach(item=>{

category.innerHTML +=

`<option>

${item}

</option>`;

});

}

updateCategories();


// SAVE BUDGET

function saveBudget(){

budget=
budgetInput.value;

localStorage.setItem(
"budget",
budget
);

render();

}


// ADD TRANSACTION

function addTransaction(){

let transaction={

desc:desc.value,

amount:+amount.value,

date:date.value,

type:type.value,

category:category.value,

time:
new Date()
.toLocaleTimeString()

};


if(
!transaction.desc
||
!transaction.amount
)
return;


data.push(
transaction
);

save();

}


// SAVE

function save(){

localStorage.setItem(

"transactions",

JSON.stringify(data)

);

render();

}


// DELETE

function remove(i){

data.splice(
i,
1
);

save();

}


// EDIT

function edit(i){

let x=
data[i];

desc.value=
x.desc;

amount.value=
x.amount;

date.value=
x.date;

type.value=
x.type;

updateCategories();

category.value=
x.category;

data.splice(
i,
1
);

save();

}


// RENDER

function render(){

list.innerHTML="";

let income=0;

let expense=0;


let filtered=

data.filter(

x=>

x.desc

.toLowerCase()

.includes(

search.value
.toLowerCase()

)

);


filtered.forEach((t,i)=>{

if(
t.type==="Income"
)

income+=
t.amount;

else

expense+=
t.amount;


list.innerHTML+=`

<div class="item">

<div>

<b>

${t.desc}

</b>

<br>

${t.category}

|

${t.date}

<br>

${t.time}

</div>


<div>

₹${t.amount}

<br>

<button
onclick=
"edit(${i})">

✏️

</button>


<button
onclick=
"remove(${i})">

❌

</button>

</div>

</div>

`;

});


balance.innerText=
"₹"+(
income-expense
);

income.innerText=
"₹"+income;

expense.innerText=
"₹"+expense;

savings.innerText=
"₹"+(
income-expense
);

budgetText.innerText=
"Budget ₹"+
budget;


let used=

(expense/budget)
*100;


progressFill.style.width=
used+"%";


drawChart(
income,
expense
);

}


function drawChart(i,e){

if(chart)
chart.destroy();

chart=

new Chart(

document.getElementById(
"chart"
),

{

type:"doughnut",

data:{

labels:[

"Income",
"Expense"

],

datasets:[{

data:[i,e]

}]

}

}

);

}


search.onkeyup=
render;


render();