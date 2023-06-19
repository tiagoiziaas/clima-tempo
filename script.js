const getHours = () => {
  const clock = document.getElementsByClassName('clock')[0];
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hour = hours < 10 ? `0${hours}` : hours;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  const second = seconds < 10 ? `0${seconds}` : seconds;
  clock.innerHTML = `${hour}:${minute}:${second}`;
};

setInterval(() => {
  getHours();
}, 1000);

const chaveAPI = '349bf9296b16b3a4b7bad34456deaea8';
const unidadeMedida = 'metric';
const idioma = 'pt_br';
const cidadeInput = document.getElementById('value');
const searchButton = document.getElementById('search-button');
const spanCidade = document.querySelector('.cidade');
const spanTemperatura = document.querySelector('.temperatura');
const spanTemperaturaMinima = document.querySelector('.temperatura-minima');
const spanTemperaturaMaxima = document.querySelector('.temperatura-maxima');
const spanDescricao = document.querySelector('.descricao');
const imgClima = document.querySelector('.clima');

function buscarClima() {
  const cidade = cidadeInput.value;
  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&units=${unidadeMedida}&lang=${idioma}`;

  fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const temperatura = data.main.temp;
      const temperaturaMinima = data.main.temp_min;
      const temperaturaMaxima = data.main.temp_max;
      const descricao = data.weather[0].description;
      const icone = data.weather[0].icon;

      spanCidade.textContent = cidade;
      spanTemperatura.textContent = temperatura;
      spanTemperaturaMinima.textContent = temperaturaMinima;
      spanTemperaturaMaxima.textContent = temperaturaMaxima;
      spanDescricao.textContent = descricao;

      const urlIcone = `http://openweathermap.org/img/w/${icone}.png`;
      imgClima.src = urlIcone;
      imgClima.alt = descricao;
    })
    .catch(error => {
      console.log(error);

      spanCidade.textContent = 'Cidade não encontrada';
      spanTemperatura.textContent = '';
      spanTemperaturaMinima.textContent = '';
      spanTemperaturaMaxima.textContent = '';
      spanDescricao.textContent = '';
      imgClima.src = '';
      imgClima.alt = '';
    });
}

searchButton.addEventListener('click', buscarClima);
