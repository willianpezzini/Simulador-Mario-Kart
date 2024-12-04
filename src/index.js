const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Princesa Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
};

const player3 = {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
};

const player4 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
};

const player5 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

const player6 = {
    nome: "Donkey Kong",
    velocidade:4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

// Função para rolar o dado
async function rollDice() {
    return Math.floor(Math.random() *6) + 1;
};

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random < 0.66:
            result = "Curva"
            break;
    
        default:
            result = "Confronto"
            break;
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} Rolou o dado no bloco ${block} e obteve o valor de ${diceResult} e tem ${attribute}  de ${block} tendo um valor total de: ${diceResult + attribute}.`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 0; round < 5; round++) {
        console.log (`🏁  Rodada ${round + 1}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco ${block}.`);

        // rolar os dados para cada participante
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // comparação de habilidades
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "Reta"){
            totalTestSkill1 = diceResult1 + character1.velocidade
            totalTestSkill2 = diceResult2 + character2.velocidade

            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);
        
        }

        if(block === "Curva"){
            totalTestSkill1 = diceResult1 + character1.manobrabilidade
            totalTestSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
        }
        if(block === "Confronto"){
            powerResult1 = diceResult1 + character1.poder
            powerResult2 = diceResult2 + character2.poder

            console.log(`${character1.nome} batalhou contra ${character2.nome}!`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

            
            if(powerResult1 > powerResult2 && character2.pontos > 0) {
                character2.pontos--;
                console.log(`${character1.nome} venceu, ${character2.nome} perde um ponto!`)
            };

            if(powerResult2 > powerResult1 && character1.pontos > 0) {
                character1.pontos--;
                console.log(`${character2.nome} venceu, ${character1.nome} perde um ponto!`)
            };

            console.log(powerResult2 === powerResult1 ? "Confronto empatado, ninguém perde ponto!" : "");
            

        }

        // verifica o vencedor
        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.nome} venceu a batalha e marcou 1 ponto`);
            character1.pontos++;
        }else if(totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.nome} venceu a batalha e marcou 1 ponto`);
            character2.pontos++;
        }else if (totalTestSkill1 == totalTestSkill2) {
            console.log("Empatou, ninguém soma ponto!")
        };
        
        
        
        console.log("________________________________________________________________________________________________________________")
    }
};

// Função que declara o vencedor
async function declaraWinner(character1, character2) {
    console.log("----- RESULTADO FINAL -----");
    console.log(`${character1.nome}, fez um total de: ${character1.pontos} ponto(s).`);
    console.log(`${character2.nome}, fez um total de: ${character2.pontos} ponto(s).`);

    if (character1.pontos > character2.pontos) {
        console.log(`${character1.nome} venceu!!! 🏆🏆🏆`)   
    }else if (character2.pontos > character1.pontos) {
        console.log(`${character2.nome} venceu!!! 🏆🏆🏆`)   
    }else
        console.log("A partida terminou empatada!!!")
}

// Função principal, essa é uma função auto invocavel, por isso está dentro do parenteses, com interpolação de strings.
(async function main() {
    console.log(` 🏁 🏎️  Corrida entre ${player1.nome} e ${player2.nome} começando!!!\n VAAAAAAAAAI...`);

    await playRaceEngine(player3, player4);

    await declaraWinner(player3, player4);

    
})();

