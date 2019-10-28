console.log("Client Side Java Script")

const weatherForm = document.querySelector('form')
const search = document.querySelector('#location')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',function(e){
    e.preventDefault()

    var address = search.value
    
    address = address.trim()
    if(address.charAt(0) == ';')
    {
        address = '^'
    }

    messageOne.textContent = 'Loading......'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + address).then(function(response){
        response.json().then(function(data){
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
