//loading pets select button from api
const petCategory = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategoryBtn(data.categories)
}
// loading pets carts from api
const allPetsCarts = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllPets(data.pets)
}
petCategory();
allPetsCarts();

//displaying category buttons
const displayCategoryBtn = (category) => {
    const petCategory = document.getElementById('petcategory');
    category.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.id}" class="btn font-bold px-14 py-8 rounded-full btnAction"><img class="w-10" src="${item.category_icon} ">${item.category}</button>
        `;
        petCategory.append(buttonContainer);
        const buttonActive = document.getElementById(`btn-${item.id}`);
        buttonActive.addEventListener('click', () => {
            // Remove 'activated' class from all buttons
            const allButtons = document.querySelectorAll('.btnAction');
            allButtons.forEach(btn => btn.classList.remove('activated'));
            // Add 'activated' class to the clicked button
            buttonActive.classList.add('activated');
        });
    });   
}
// displaying pets carts
const displayAllPets = (allPets) => {
    const petsCart = document.getElementById('pets-cart');
    allPets.forEach((pet) => {
        console.log(pet)
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('card');
        cartContainer.innerHTML =`
            <figure class="px-10 pt-10">
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        console.log(petsCart)
        petsCart.append(cartContainer);
    })
}