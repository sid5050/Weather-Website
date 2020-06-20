
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.errorMessage){
            messageOne.textContent = data.errorMessage
        }
        else{
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = 'Weather condition: '+data.forecast+'. It is currently '+data.temperature+' degrees out. The high today is '+data.forecastData.body.temp_max+' with a low of '+data.forecastData.body.temp_min+' degrees.'
        }
    })
})

})