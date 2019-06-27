const form = document.querySelector('form');
const formDate = document.querySelector('#formDate');
const formName = document.querySelector('#formName');
const formStartTime = document.querySelector('#formStartTime');
const formEndTime = document.querySelector('#formEndTime');

formStartTime.oninput = () => formEndTime.value = '';

const filter_select_el = document.querySelector('.custom-select');
const items_el = document.querySelector('#eventsContainer');

filter_select_el.onchange = function () {
    let items = items_el.getElementsByClassName('col-md-4');
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains(this.value)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
};


form.onsubmit = e => {
    e.preventDefault();

    if (formStartTime.value > formEndTime.value ||
        formStartTime.value == formEndTime.value) {
        alert('incorrect time');
        return;
    }

    const dates = document.querySelectorAll('.date');

    dates.forEach(el => {
        if (formDate.value == el.innerHTML) {
            const containerEvents = $(el).next()[0];
            const checkTime = $(containerEvents).find('.event');

            checkTime.each(el1 => {
                if ($(checkTime[el1]).find('.prevtime').html() == formStartTime.value) {
                    throw alert('Time has been declarated');
                }
            })
            checkTime.each(el2 => {
                if ($(checkTime[el2]).find('.endtime').html() == formEndTime.value) {
                    throw alert('Time has been declarated');
                }
            })
            const event = document.createElement('div');
            event.classList.add('event');
            containerEvents.appendChild(event);

            createElementFunc(event, checkTime, containerEvents);
        }
    })



    const createElementCol = () => {
        const eventContainer = document.querySelector('#eventsContainer');
        const colMd4 = document.createElement('div');
        colMd4.classList.add('col-md-4');
        colMd4.classList.add(formDate.value);
        eventContainer.appendChild(colMd4);
        filter_select_el.innerHTML += `<option value=${formDate.value}>${formDate.value}</option>`;

        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        colMd4.appendChild(eventCard);

        const date = document.createElement('div');
        date.classList.add('date');
        date.innerHTML = formDate.value;
        eventCard.appendChild(date);

        const containerEvents = document.createElement('div');
        containerEvents.classList.add('container-events');
        eventCard.appendChild(containerEvents);

        const checkTime = $(containerEvents).find('.event');

        const event = document.createElement('div');
        event.classList.add('event');
        containerEvents.appendChild(event);

        createElementFunc(event, checkTime, containerEvents, colMd4, date);
    }
    
    let counter = 0;

    if (dates.length == 0) createElementCol();
    dates.forEach(el => {
        if (formDate.value != el.innerHTML) {
            counter++;
        }
        if (dates.length == counter) {
            createElementCol();
        }
    })
}

const createElementFunc = (event, checkTime, containerEvents, colMd4, date) => {

    const name = document.createElement('div');
    name.innerHTML = document.querySelector('#formName').value;
    name.classList.add('name');
    event.appendChild(name);

    const prevtime = document.createElement('div');
    prevtime.innerHTML = document.querySelector('#formStartTime').value;
    prevtime.classList.add('prevtime');
    event.appendChild(prevtime);

    const endtime = document.createElement('div');
    endtime.innerHTML = document.querySelector('#formEndTime').value;
    endtime.classList.add('endtime');
    event.appendChild(endtime);

    const edit = document.createElement('div');
    edit.innerHTML = '<i class="far fa-edit">';
    edit.style.cursor = 'pointer'
    edit.onclick = () => {
        const changePrevTime = document.createElement('input');
        changePrevTime.setAttribute('required', true)
        changePrevTime.type = 'time';
        changePrevTime.style.width = '90px';

        const changeNextTime = document.createElement('input');
        changeNextTime.setAttribute('required', true)
        changeNextTime.type = 'time';
        changeNextTime.style.width = '90px';
        prevtime.replaceWith(changePrevTime);
        endtime.replaceWith(changeNextTime);

        const ok = document.createElement('div');
        ok.innerHTML = '<i class="fas fa-check">';
        ok.style.cursor = 'pointer'
        edit.replaceWith(ok);
        ok.onclick = () => {
            if (changeNextTime.value == '' || changePrevTime.value == '') {
                return;
            }
            if (changePrevTime.value > changeNextTime.value ||
                changePrevTime.value == changeNextTime.value) {
                alert('incorrect time');
                return;
            }
            checkTime.each(el1 => {
                if ($(checkTime[el1]).find('.prevtime').html() == changePrevTime.value) {
                    throw alert('Time has been declarated');
                }
            })
            checkTime.each(el2 => {
                if ($(checkTime[el2]).find('.endtime').html() == changeNextTime.value) {
                    throw alert('Time has been declarated');
                }
            })
            changePrevTime.replaceWith(prevtime);
            changeNextTime.replaceWith(endtime);
            prevtime.innerHTML = changePrevTime.value;
            endtime.innerHTML = changeNextTime.value;
            edit.innerHTML = '<i class="far fa-edit">';
            ok.replaceWith(edit);

        }
    }
    event.appendChild(edit);

    const deleted = document.createElement('div');
    deleted.innerHTML = '<i class="fas fa-times">';
    deleted.style.cursor = 'pointer';

    deleted.onclick = () => {
        
        const datee = $(event).parent().prev()[0];
        const colMd44 = $(datee).parent().parent()[0];
        console.log(datee);
        console.log(colMd44);

        event.remove();

        if ($(containerEvents).children().length == 0) {
            $(`[value = "${datee.innerHTML}"]`).remove();
            colMd44.remove();
        }
        
    }
    event.appendChild(deleted);
}