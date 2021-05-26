// Elements du DOM
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBtn = document.getElementById("rejouer");
const body = document.getElementsByTagName("body")[0];

// Modèle de coeur
const coeurVide = '<svg class="ion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.516 3c2.382 0 4.487 1.564 4.487 4.712 0 4.963-6.528 8.297-10.003 11.935-3.475-3.638-10.002-6.971-10.002-11.934 0-3.055 2.008-4.713 4.487-4.713 3.18 0 4.846 3.644 5.515 5.312.667-1.666 2.333-5.312 5.516-5.312zm0-2c-2.174 0-4.346 1.062-5.516 3.419-1.17-2.357-3.342-3.419-5.515-3.419-3.403 0-6.484 2.39-6.484 6.689 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-4.586-3.414-6.689-6.484-6.689z"/></svg>';
const coeurPlein = '<svg class="ion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
const bgLose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

// PLAY
const play = () => {

    // nombre aléatoire
    // Math.random() génère un nombre aléatoire entre 0 et 0.99
    // * 101 car (* 100 = aléa entre 0 et 99.99) donc (* 101 = entre 0 et 100.99)
    // Math.floor pour garder les entiers uniquement

    const randomNumber = Math.floor(Math.random() * 101)
    const totalVies = 6;
    let vies = totalVies;
    console.log(randomNumber);

    // Actualisation à chaque essai, toute la logique

    formulaire.addEventListener("submit", (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value); //parseInt() transforme le string (chaîne de caractères) en chiffres. ex = "3" => 3

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO 👏!!! Le nombre était bien ${randomNumber}`; // les back-tics (Alt Gr + 7) permettent d'écrire des strings avec des vaiables dynamiques (ex = ${nomDeLaVariable}).
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }

        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥"
            }
            else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud !! 🔥"
            }
            else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput -11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède ! ♨️"
            }
            else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid ❄️"
            }
            vies --;
            verifyLoose();
        }

        actualiseCoeurs(vies);

    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLose;
            body.style.color = "#990000";
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu 😢, la réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener("click", () => {
        message.style.display = "none";
        document.location.reload(true);
    })
}

play();