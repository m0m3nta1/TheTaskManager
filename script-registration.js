const button = document.getElementById('showTextButton');
const textContainer = document.getElementById('textContainer');

function showOrHideText() {
    if (textContainer.style.display === 'none') {
        textContainer.style.display = 'block';
        textContainer.innerHTML = 'Сайт предназначен для планирования различного рода мероприятий и праздников. Для обсуждения в команде того, что действительно важно.\n\nDeveloper:\nBormotin Dmitry\nBelov Daniil\nZakharyan Sergey\nDaranutsa Nikita\nVolchkov Ilia';
    } else {
        textContainer.style.display = 'none';
        textContainer.innerHTML = '';
    }
}

button.addEventListener('click', showOrHideText);