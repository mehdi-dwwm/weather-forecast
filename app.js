const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds" : "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Mist" : "wi wi-day-fog",
    "Drizzle" : "wi wi-day-sleet",
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true){
    let ville;
    if(withIP){
        // 1. Récupérer l'adresse ip de PC qui ouvre la page
    const ip = await fetch('https://api.ipify.org?format=json')
    .then(resultat => resultat.json())
    .then(json => json.ip)

// 2. Récupérer la ville grâce à l'adresse ip
    ville = await fetch('http://api.ipstack.com/' + ip + '?access_key=71606aad9438efef5afc69bd432f30a4')
    .then(resultat => resultat.json())
    .then(json => json.city)
    } else {
        ville = document.querySelector('#ville'). textContent;
    }
     

    // 3. Récupérer les infos météo grâce àa la ville  
    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=bc89e05b7ef4040f432fb3ed0f9fbc3d&lang=fr&units=metric')
        .then(resultat => resultat.json())
        .then(json => json)
    // 4. Afficher les informations météo
    displayWeatherInfos(meteo)
}

function displayWeatherInfos(data){
    const name = data.name.toUpperCase();
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.querySelector('#body').className = conditions.toLowerCase();

}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
}); 

ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
});

main();