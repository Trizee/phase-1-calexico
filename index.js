fetch('http://localhost:3000/menu')
.then(r => r.json())
.then(data => {
    data.forEach(fillMenu)
    displayItem(data[0])
})

function fillMenu(data){
    const menuItem = document.createElement('span')
    const menu = document.querySelector('#menu-items')

    menuItem.textContent = data.name
    menu.appendChild(menuItem)

    menuItem.addEventListener('click',()=>{
        displayItem(data)
    })
}

function displayItem(data){
    const img = document.querySelector('#dish-image')
    const dishName = document.querySelector('#dish-name')
    const dishDes = document.querySelector('#dish-description')
    const dishPrice = document.querySelector('#dish-price')
    const inCart = document.querySelector('#number-in-cart')

    img.src = data.image
    dishName.textContent = data.name
    dishDes.textContent = data.description
    dishPrice.textContent = data.price
    inCart.textContent = data.number_in_bag

    const form = document.querySelector('#cart-form')
    const cartAmount = document.querySelector('#cart-amount')

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        data.number_in_bag = parseInt(inCart.textContent) + parseInt(cartAmount.value)
        patchCart(data)
        
        inCart.textContent = data.number_in_bag

        
    })

}

function patchCart(data){
    fetch(`http://localhost:3000/menu/${data.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify(data)      
    })
    .then(r => r.json())
    .then(data =>console.log(data))
}


    
    
    