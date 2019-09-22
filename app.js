window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api =`${proxy}https://api.darksky.net/forecast/375ae192cee32bcc7eacf4af08e227b5/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                
                //SET DOM elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                
                //SET Icon
                setIcons(icon, document.querySelector(".icon"));
                
                //Temperature convention
                let celsius = (temperature - 32) * (5/9);
                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "C") {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    } else {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                })
            });
        });
    }else {
        locationTimezone.textContent = "Please enable location permissions.";
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});