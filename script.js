console.log("O que faz aqui, jovem? Procurando meu código fonte?");
console.log("Ass: Pablito - Zap: 75 9 9870-1108");
let parabolaChart = null;
function tirarValores() {
    let funcaoExtenso = document.getElementById("res");
    let abc = document.getElementById("abc");
    let a = document.getElementById("func_a").value.trim(); // Remove espaços em branco antes e depois
    let b = document.getElementById("func_b").value.trim();
    let c = document.getElementById("func_c").value.trim();
    let op0 = document.getElementById("op0").value; // Captura o sinal do coeficiente 1
    let op1 = document.getElementById("op1").value; // Captura o sinal do coeficiente b
    let op2 = document.getElementById("op2").value; // Captura o sinal do coeficiente c
    let minMax = document.getElementById("minMax");
    let deltaRes = document.getElementById("delta_res");
    let direcaoParabola = document.getElementById("direcao_parabola");

    if (a === "" || b === "" || c === "") {
        alert("Você precisa digitar os valores em todos os campos!");
    } else if (a < 0 || b < 0 || c < 0) {
        alert(
            "Não digite valores negativos. Use os botões para determinar se o valor é positivo ou negativo!"
        );
    } else if (a == 0) {
        alert(
            "O coeficiente a não pode ser 0, atribua outro valor pois a função não seria quadrática."
        );
    } else {
        displayBlock();
        a = Number(a); // Converte para número após verificar se não está vazio
        b = Number(b);
        c = Number(c);

        // Multiplica b e c pelos sinais corretos
        a = op0 === "-" ? -a : a;
        b = op1 === "-" ? -b : b;
        c = op2 === "-" ? -c : c;

        let delta = b * b - 4 * a * c;

        let xVertice = -b / (2 * a);
        let yVertice = a * xVertice * xVertice + b * xVertice + c;

        deltaRes.innerHTML = `Δ = ${delta}`;

        // Cria a string da função quadrática incorporando os sinais dos coeficientes b e c
        funcaoExtenso.innerHTML = `f(x) = ${a}x² ${op1} ${Math.abs(
            b
        )}x ${op2} ${Math.abs(c)}`;
        abc.innerHTML = `
            a = ${a}<br>
            b = ${b}<br>
            c = ${c}  
        `;

        if (a > 0) {
            direcaoParabola.innerHTML =
                "Coeficiente 'a' positivo.<br> Concavidade para cima!";
        } else if (a < 0) {
            direcaoParabola.innerHTML =
                "Coeficiente 'a' negativo.<br> Concavidade para baixo!";
        }

        minMax.innerHTML = `
        Mínimo/Máximo:<br>
        x = ${xVertice.toFixed(2)},<br>
        y = ${yVertice.toFixed(2)}  
        `;

        desenharParabola(a, b, c);
    }
}

function displayBlock() {
    let blocks = document.getElementsByClassName("block");

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.display = "block";
    }
}

// Desenhando a parábola

function desenharParabola(a, b, c) {
    // Coletar o contexto do canvas
    let ctx = document.getElementById("parabolaChart").getContext("2d");

    // Limpar o gráfico existente, se houver
    if (parabolaChart) {
        parabolaChart.destroy();
    }

    // Calcular os pontos da parábola
    let data = [];
    for (let x = -10; x <= 10; x += 0.1) {
        let y = a * x * x + b * x + c;
        data.push({ x: x, y: y });
    }

    // Configuração do gráfico
    let config = {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Parábola",
                    data: data,
                    borderColor: "blue",
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                },
                y: {
                    type: "linear",
                    position: "left",
                },
            },
        },
    };

    // Desenhar o gráfico
    parabolaChart = new Chart(ctx, config);
}
