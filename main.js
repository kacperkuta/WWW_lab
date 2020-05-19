"use strict";
exports.__esModule = true;
exports.Fibo = void 0;
var jsonString = "{\n        \"piloci\": [\n            \"Pirx\",\n            \"Exupery\",\n            \"Idzikowski\",\n            \"G\u0142\u00F3wczewski\"\n        ],\n        \"lotniska\": {\n            \"WAW\": [\"Warszawa\", [3690, 2800]],\n            \"NRT\": [\"Narita\", [4000, 2500]],\n            \"BQH\": [\"Biggin Hill\", [1802, 792]],\n            \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n        }\n    }";
var Pilot = /** @class */ (function () {
    function Pilot() {
    }
    return Pilot;
}());
var dataStructure = JSON.parse(jsonString);
var el = document.querySelector("div[id=main_div]");
var parag = document.querySelector("p[id = testowy_paragraf]");
//Zmiana pragrafu
parag.innerHTML = "Zmieniony testowy paragraf";
// Tworzy nowy element paragrafu
var p = document.createElement("p");
p.innerHTML = "Dodany paragraf";
document.body.appendChild(p);
//Wybieranie elementów data-id-pasazera, dodałem listę na stronę główną aby nie tworzyć drugiego pliku
var pozycja = document.querySelectorAll("li[class=pax]");
var najwiekszyPax = null;
var najwiekszy = "";
pozycja.forEach(function (el) {
    if (el.dataset.idPasazera > najwiekszy) {
        najwiekszy = el.dataset.idPasazera;
        najwiekszyPax = el;
    }
});
console.log(najwiekszyPax.innerHTML);
//Promise
function kolorek(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            el.style.backgroundColor = "blue";
        }, time);
    });
}
kolorek(1000);
//Przerobione tęczoweKolory()
function kolorek2(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
kolorek2(1000).then(function () {
    el.style.backgroundColor = 'blue';
    return kolorek2(1000);
}).then(function () {
    el.style.backgroundColor = 'green';
    return kolorek2(1000);
}).then(function () {
    el.style.backgroundColor = 'indigo';
    return kolorek2(1000);
}).then(function () {
    el.style.backgroundColor = 'yellow';
    return kolorek2(1000);
}).then(function () {
    el.style.backgroundColor = 'red';
    return kolorek2(1000);
}).then(function () {
    el.style.backgroundColor = 'purple';
    return kolorek2(1000);
});
//Zdjecie z repo
var opis = '"avatar_url": "';
var avatarUrl = fetch("https://api.github.com/repos/Microsoft/TypeScript/commits").then(function (response) { return response.text().then(function (tekst) { return tekst.substr(tekst.search('"avatar_url"')); }).then(function (tekst2) { return tekst2.substring(0, tekst2.search(',')); }).then(function (url) { return url.substring(opis.length, url.length - 1); }); });
avatarUrl.then(function (url) {
    var myImage = new Image(500);
    myImage.src = url;
    document.body.appendChild(myImage);
});
//Kliknięcia w prawą kolumnę bez obszaru formularza i tabeli
var delay = document.querySelector("div[id=opoznienia]");
var form = document.querySelector("form");
el.addEventListener("click", handleClick);
var clickCount = 0;
function handleClick(event) {
    if (event.target == form || event.target == delay) {
        if (clickCount % 2 == 0)
            form.style.backgroundColor = 'indigo';
        else
            form.style.background = 'red';
        clickCount++;
        console.log(Fibo10(clickCount));
    }
}
//Klikiecia w prawa kolumnę jedynie bez obszaru formularza
function handleClick2(event) {
    if (event.target == form || event.target == delay || form.contains(event.target) || delay.contains(event.target)) {
        if (clickCount % 2 == 0)
            form.style.backgroundColor = 'indigo';
        else
            form.style.background = 'red';
        clickCount++;
        console.log(Fibo10(clickCount));
    }
}
//Fibonacci
function Fibo10(i) {
    return Fibo(i * 10);
}
//input i submit
var imie = document.querySelector("input[name=imie]");
var nazwisko = document.querySelector("input[name=nazwisko]");
var data = document.querySelector("input[name=data]");
var org = document.querySelector("select[id=origin]");
var dest = document.querySelector("select[id = destination]");
var submit = document.querySelector("input[id=submit]");
check();
function check() {
    submit.disabled = !(imie.value != "" && nazwisko.value != "" &&
        new Date(data.value).getTime() < new Date().getTime() && org.value != dest.value);
}
imie.onchange = check;
nazwisko.onchange = check;
data.onchange = check;
org.onchange = check;
dest.onchange = check;
function Fibo(i) {
    if (i == 0)
        return 0;
    if (i == 1)
        return 1;
    else
        return Fibo(i - 1) + Fibo(i - 2);
}
exports.Fibo = Fibo;
