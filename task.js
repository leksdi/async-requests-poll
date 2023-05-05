const pollTitleElement = document.getElementById("poll__title");
const pollAnswersElement = document.getElementById("poll__answers");
let buttonElement = pollAnswersElement.querySelectorAll("button");
let xhrText;
let xhrText1;

let xhr = new XMLHttpRequest();
url = "https://students.netoservices.ru/nestjs-backend/poll"

xhr.open("GET", url);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

xhr.onreadystatechange = function() {
    if ((xhr.status === 200) && (xhr.readyState === xhr.DONE)) {
        xhrText = JSON.parse(xhr.responseText);

        pollTitleElement.innerHTML = ` ${xhrText.data.title}`;
        pollAnswersElement.innerHTML = "";

        for(let item of xhrText.data.answers) {
        pollAnswersElement.innerHTML +=
            `<button class="poll__answer">
                ${item}
            </button>
            `
        }

        buttonElement = Array.from(pollAnswersElement.querySelectorAll("button"));

    }


    function func(index) {

        let xhr1 = new XMLHttpRequest();
        xhr1.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr1.send(`vote=${xhrText.id}&answer=${index}`);

        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === xhr.DONE) {
                xhrText1= JSON.parse(xhr1.responseText);
                pollAnswersElement.innerHTML = "";
                for (let item of xhrText1.stat) {
                    pollAnswersElement.innerHTML +=
                        `<div>
                   ${item.answer} : ${item.votes}
                </div>`;
                }
            }
        }
    }

    buttonElement.forEach((elem, index) => {
        elem.addEventListener("click", () => {
            func(index);
            alert("Спасибо, Ваш голос засчитан");
        })
    });

}











