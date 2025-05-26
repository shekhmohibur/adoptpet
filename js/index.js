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
        cartContainer.classList.add('card', 'shadow-md');
        cartContainer.innerHTML =`
            <figure class="px-5 pt-5 h-72">
                <img
                src="${pet.image}"
                alt="Shoes"
                class="rounded-xl object-cover w-full" />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">${pet.pet_name}<h2>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=jQkL4uOqbTW7&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Breed: ${pet.breed == undefined?'No Info':pet.breed}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=85102&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Birth: ${pet.date_of_birth == undefined?'No Info':pet.date_of_birth}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=70834&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Gender: ${pet.gender == undefined?'No Info':pet.gender}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=85843&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Price: ${pet.price == undefined?'No Info':pet.price}</h2>
                </div>
                <div class="flex justify-between px-3 pt-3">
                <i class="btn pt-2 hover:bg-[#0E7A81] fa-regular fa-thumbs-up text-2xl hover:text-white"></i>
                <button class="btn px-3 text-[#0E7A81] text-lg hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                <button class="btn px-3 text-[#0E7A81] text-lg hover:bg-[#0E7A81] hover:text-white">Details</button>
                </div>
            </div>
        `;
        console.log(petsCart)
        petsCart.append(cartContainer);
    })
}