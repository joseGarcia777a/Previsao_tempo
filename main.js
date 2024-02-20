// Criado por #Jose Garcia de Souza Junior.

const form = document.getElementById('form');


form.addEventListener('submit', function(e){
    e.preventDefault();

    const estado = document.getElementById('estado');
    const clima = document.getElementById('clima');

    // link do API.
    const geoCodifica = conectaOpemWether(`http://api.openweathermap.org/geo/1.0/direct?q=${estado.value},brazil&appid=c48873c5b82c2088f582be94f0c9fef0`);
    var dadosGeo = JSON.parse(geoCodifica);
    const opemWether = conectaOpemWether(`https://api.openweathermap.org/data/2.5/weather?lat=${dadosGeo[0].lat}&lon=${dadosGeo[0].lon}&appid=9b589f5fc773e23b05730bbe917f3938&units=metric`);
    // pegando um arquivo json e passando para array.
    var dadosTemp = JSON.parse(opemWether);

    resultado(dadosTemp, dadosGeo[0].name, dadosGeo[0].country);
    
    
    clima.setAttribute('src',`https://openweathermap.org/img/wn/${dadosTemp.weather[0].icon}@2x.png`);

    historico(dadosTemp, dadosGeo[0].name, dadosGeo[0].country);
});


// Cria uma conexao com o site da API.
function conectaOpemWether(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

// Exibe os resultados no html.
function resultado(dados, dados2, dados3){
    var visorTemp = document.getElementById('visorTemp');
    var visorHumi = document.getElementById('visorHumi');
    var visorEstado = document.getElementById('visorEstado');
    var visorPais = document.getElementById('visorPais');

    visorTemp.innerHTML = `${dados.main.temp.toFixed(0)}°C`;
    visorHumi.innerHTML = `${dados.main.humidity}%`;
    visorEstado.innerHTML = dados2;
    visorPais.innerHTML = dados3;
}

function historico(dados, dados2, dados3){
    var visorTempHist = document.getElementById('visorTempHist');
    var secHist = document.getElementById('secHist');
    
        var temp = `${dados.main.temp.toFixed(0)}°C`;

        let linha = '<div class="h histori">';
        linha += `<img id="climaHist" src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png"/>`;
        linha += `<h4 id="visorPaisHist">${dados3}</h4>`;
        linha += `<h4 id="visorEstadoHist">${dados2}</h4>`;
        linha += '<h4>Temperatura:</h4>';
        linha += `<p id="visorTempHist">${visorTempHist.innerHTML = temp}</p>`;
        linha += '<h4>Humidade relativa do ar:</h4>';
        linha += `<p id="visorHumiHist">${dados.main.humidity}%</p>`;
        linha += '</div>';

        secHist.innerHTML += linha;
        secHist.style.display = 'block';
};