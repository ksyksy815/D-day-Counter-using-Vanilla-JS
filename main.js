
/*---Intro Page: getting user name and dday--- */
let body = document.getElementsByTagName('BODY')[0],
    welcomeBG = document.createElement('div'),
    messageBox = document.createElement('form'),
    grtMessage = document.createElement('h3'),
    dateLabel = document.createElement('label'),
    dateInput = document.createElement('input'),
    submit = document.createElement('input');

body.appendChild(welcomeBG);
welcomeBG.appendChild(messageBox);
messageBox.appendChild(grtMessage),
messageBox.appendChild(dateLabel),
messageBox.appendChild(dateInput);
messageBox.appendChild(submit);

welcomeBG.classList = 'welcomeBG';
messageBox.classList = 'messageBox';
grtMessage.classList = 'grtMessage';

grtMessage.textContent = 'D-Day Counter';

dateLabel.required = true;
dateLabel.setAttribute('for', 'date');
dateLabel.setAttribute('id', 'label');
dateLabel.textContent = 'When is your D-day?';

dateInput.setAttribute('type', 'date');
dateInput.setAttribute('id', 'date');
dateInput.setAttribute('name', 'date');

submit.setAttribute('type', 'submit');
submit.value = 'Submit';
submit.setAttribute('name', 'submit');
submit.setAttribute('id', 'btn');


/*---Moving to the counter */
submit.addEventListener('click', function(e) {
    e.preventDefault();
    if (dateInput.value == '') {
        dateInput.style.border = '2px hsl(345, 95%, 68%) solid';
        alert('Please choose your d-day!');
    } else if(dateInput.value !='') {
        localStorage.setItem('Dday', dateInput.value);
        moveToCounter();
    }
    
});    

function moveToCounter() {
    makeRandomStars();
    setInterval(count, 1000);
    welcomeBG.classList += ' displayNone';
}


/*---Dday presentation--- */
function count () {
    let days = document.querySelector('.d_number'),
        hours = document.querySelector('.h_number'),
        minutes = document.querySelector('.m_number'),
        seconds = document.querySelector('.s_number'),

    today = document.querySelector('.today'),
    dday = document.querySelector('.dday'),

    localSDate = new Date(dateInput.value),
    todaysDate = new Date();

    today.textContent = `TODAY: ${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`;
    dday.textContent = `YOUR D-DAY: ${localStorage.getItem('Dday')}`;    

    /*---Subtracting 9*60*60*1000 is because the default dateInput.value is set at 9:00am.--- */
    difference = ((localSDate.getTime()-(9*60*60*1000)) - todaysDate.getTime()) / ((1000 * 60 * 60 * 24)),
    remainingDay = difference,
    remainingHours = (difference - Math.floor(remainingDay)) * 24,
    remainingMin = ((difference * 24) - (Math.floor(remainingDay) * 24) - (Math.floor(remainingHours))) * 60,
    remainingSec = ((difference * 24 * 60) - ((Math.floor(remainingDay) * 24 * 60) + (Math.floor(remainingHours)* 60) + (Math.floor(remainingMin)))) * 60 ;

    days.textContent = `${Math.floor(remainingDay)}`;
    hours.textContent = `${Math.floor(remainingHours)}`;
    minutes.textContent = `${Math.floor(remainingMin)}`;
    seconds.textContent = `${Math.floor(remainingSec)}`;
}

/*---Making stars--- */
function makeRandomStars() {
    let count = 500;
    let scene = document.querySelector('.bg_scene');
    let i = 0;

    while (i < count) {
        let stars = document.createElement('i'),
        x = Math.floor(Math.random() * window.innerWidth),
        y = Math.floor(Math.random() * window.innerHeight),
        duration = Math.random() * 10,
        size = Math.random() * 2;

        stars.style.left = x + 'px';
        stars.style.top = y + 'px';
        stars.style.width = 1 + size + 'px';
        stars.style.height = 1 + size + 'px';

        stars.style.animationDuration = 5 + duration + 's';
        stars.style.animationDelay = duration + 's';

        scene.appendChild(stars);
        i++
    }
}

