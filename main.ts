
    let jsonString: string = `{
        "piloci": [
            "Pirx",
            "Exupery",
            "Idzikowski",
            "Główczewski"
        ],
        "lotniska": {
            "WAW": ["Warszawa", [3690, 2800]],
            "NRT": ["Narita", [4000, 2500]],
            "BQH": ["Biggin Hill", [1802, 792]],
            "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]
        }
    }`;

    interface ILotnisko {
        miasto: string;
        pasy: number[];
    }

    class Pilot {
        nazwisko: string;
    }

    interface ILiniaLotnicza {
        piloci: Pilot[];
        lotniska: Map<string, ILotnisko>;
    }

    let dataStructure: ILiniaLotnicza = JSON.parse(jsonString);

    let el = document.querySelector("div[id=main_div]") as HTMLElement;
    let parag = document.querySelector("p[id = testowy_paragraf]");

    //Zmiana pragrafu
    parag.innerHTML = "Zmieniony testowy paragraf";


    // Tworzy nowy element paragrafu
    let p = document.createElement("p");
    p.innerHTML = "Dodany paragraf";
    document.body.appendChild(p);

    //Wybieranie elementów data-id-pasazera, dodałem listę na stronę główną aby nie tworzyć drugiego pliku
    let pozycja: NodeListOf<HTMLElement> = document.querySelectorAll("li[class=pax]");
    let najwiekszyPax: HTMLElement = null;
    let najwiekszy: string = "";
    pozycja.forEach((el) => {
        if (el.dataset.idPasazera > najwiekszy) {
            najwiekszy = el.dataset.idPasazera;
            najwiekszyPax = el;
        }
    });
    console.log(najwiekszyPax.innerHTML);

    //Promise
    function kolorek(time: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(function () {
                el.style.backgroundColor = "blue"
            }, time)
        })
    }

    kolorek(1000);

    //Przerobione tęczoweKolory()
    function kolorek2(time: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(function () {
                resolve()
            }, time)
        })
    }

    kolorek2(1000).then(() => {
        el.style.backgroundColor = 'blue';
        return kolorek2(1000)
    }).then(() => {
        el.style.backgroundColor = 'green';
        return kolorek2(1000)
    }).then(() => {
        el.style.backgroundColor = 'indigo';
        return kolorek2(1000)
    }).then(() => {
        el.style.backgroundColor = 'yellow';
        return kolorek2(1000)
    }).then(() => {
        el.style.backgroundColor = 'red';
        return kolorek2(1000)
    }).then(() => {
        el.style.backgroundColor = 'purple';
        return kolorek2(1000)
    });

    //Zdjecie z repo

    let opis: string = '"avatar_url": "';

    let avatarUrl: Promise<string> = fetch("https://api.github.com/repos/Microsoft/TypeScript/commits").then(
        response => response.text().then(
            tekst => tekst.substr(tekst.search('"avatar_url"'))
        ).then(
            tekst2 => tekst2.substring(0, tekst2.search(','))
        ).then(
            url => url.substring(opis.length, url.length - 1)
        )
    );

    avatarUrl.then(url => {
            let myImage = new Image(500);
            myImage.src = url;
            document.body.appendChild(myImage);
        }
    );


    //Kliknięcia w prawą kolumnę bez obszaru formularza i tabeli
    let delay = document.querySelector("div[id=opoznienia]");
    let form = document.querySelector("form") as HTMLElement;
    el.addEventListener("click", handleClick);
    let clickCount: number = 0;

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

    function Fibo10(i: number) {
        return Fibo(i * 10);
    }

    //input i submit
    let imie: HTMLInputElement = document.querySelector("input[name=imie]");
    let nazwisko: HTMLInputElement = document.querySelector("input[name=nazwisko]");
    let data: HTMLDataElement = document.querySelector("input[name=data]");
    let org: HTMLSelectElement = document.querySelector("select[id=origin]");
    let dest: HTMLSelectElement = document.querySelector("select[id = destination]");
    let submit: HTMLButtonElement = document.querySelector("input[id=submit]");

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

    export function Fibo(i: number) {
        if (i == 0)
            return 0;
        if (i == 1)
            return 1;
        else
            return Fibo(i-1) + Fibo(i-2);
    }