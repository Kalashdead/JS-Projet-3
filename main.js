const prompt = require('prompt-sync')()


let attacks = [
    {
        name: "Frappe Rapide",
        hp: 10,
        precision: 1
    },
    {
        name: "Soin Léger",
        hp: -15,
        precision: 2
    },
    {
        name: "Coup Puissant",
        hp: 20,
        precision: 2
    },
    {
        name: "Frappe Dévastatrice",
        hp: 30,
        precision: 3
    },
]
let joueur =
{
    name: "",
    pvMax: 50,
    pv: 50,
    attack: attacks,
}

let ia =
{
    name: "Sombre Lutin",
    pvMax: 50,
    pv: 50,
    attack: attacks,
}



console.log("Bienvenue, tu vas assister à un combat Légendaire ! Le premier à O pv va sombrer...\n");
let game = prompt("Voulez-vous jouer ? Oui (O) Non (N)").toUpperCase()
if (game == "O") {
    joueur.name = prompt(" Entre ton nom : ")
    function randomize(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }

    function choice() {

        for (let i = 0; i < joueur.attack.length; i++) {
            console.log(i + " " + joueur.attack[i].name);
        }
        let choice = parseInt(prompt("choisi ton attaque"))
        while (choice != 0 && choice != 1 && choice != 2 && choice != 3) {
            choice = parseInt(prompt("choisi ton attaque 0, 1, 2, 3"))
        }
        return joueur.attack[choice];
    }

    function atk(atks, luncher, opponent) {

        if (randomize(0, atks.precision) === atks.precision) {
            console.log(`${luncher.name} lance ${atks.name} et inflige ${atks.hp} dégâts\n`);
            if (atks.hp < 0) {
                luncher.pv -= atks.hp
            } else {
                opponent.pv -= atks.hp
                console.log(`${opponent.name} subit ${atks.hp} dégâts, il lui reste ${opponent.pv}PV\n`);
            }

            console.log(`${opponent.name} a maintenant ${opponent.pv} PV\n`);
            console.log(`${luncher.name} a maintenant ${luncher.pv} PV\n`);
        } else {
            console.log("raté");
        }
    }

    function playia() {
        let iachoice = randomize(0, ia.attack.length - 1)
        return ia.attack[iachoice]
    }

    while (joueur.pv >= 0 || ia.pv >= 0) {
        let atkplay = choice()
        atk(atkplay, joueur, ia)

        let atkia = playia()
        atk(atkia, ia, joueur)
        if (joueur.pv <= 0) {
            console.log("------------------------------------------------");
            console.log(`|              Vous avez perdu              |`);
            console.log("------------------------------------------------");
            break
        } else if (ia.pv <= 0) {
            console.log("------------------------------------------------");
            console.log(`|                  Gagné                  |`);
            console.log("------------------------------------------------");
            break
        }
    }
} else {
    console.log("T'es naze viens jouer\n");
}