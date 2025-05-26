//loading pets select button from api
const petCategory = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategoryBtn(data?.categories)
}
// loading pets carts from api
const allPetsCarts = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllPets(data?.pets)
    showThumbnail(data?.pets)
    adoptUsingId(data?.pets)
    sortPetPrice(data?.pets)
}
// loading pets cart based on category
const specificPetsCarts = async(category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    displayAllPets(data?.data)
    showThumbnail(data?.data)
    adoptUsingId(data?.data)
    sortPetPrice(data?.data)
}
// loading pets details based on pets id
const detailsPetsCarts = async(petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    displayPetsBio(data?.petData)
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
            const allButtons = document.querySelectorAll('.btnAction');
            allButtons.forEach(btn => btn.classList.remove('activated'));
            specificPetsCarts(item.category);
            // Add 'activated' class to the clicked button
            buttonActive.classList.add('activated');
        });
    });   
} 
//displaying thumbnail after click like button
const showThumbnail = (thumbnails) => {
    const likedPets = document.getElementById('likedPets');
    thumbnails.forEach(thumbnail => {
    const displayThumbnail = document.getElementById(`show-thumbnail-${thumbnail.petId}`);
    displayThumbnail.addEventListener('click', () => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('px-2','pt-2');
        displayThumbnail.setAttribute('disabled', true)
        thumbnailContainer.innerHTML =`
        <img
        src="${thumbnail.image}"
        alt="Shoes"
        class="rounded-xl h-28 object-cover" /> 
        `
        likedPets.append(thumbnailContainer)
    })
    })
}
//displaying pets desails after clicking details
const displayPetsBio = (details) => {
    document.getElementById('detailsModal').showModal();
    document.getElementById('modalDetails').innerHTML = `
        <div>
            <img src="${details.image}" class="rounded-xl w-full">
        </div>
        <div>
            <h2 class="text-2xl font-bold">${details.pet_name}</h2>
            <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=jQkL4uOqbTW7&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Breed: ${details.breed == undefined?'No Info':details.breed}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=85102&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Birth: ${details.date_of_birth == undefined?'No Info':details.date_of_birth}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=70834&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Gender: ${details.gender == undefined?'No Info':details.gender}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=70834&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Vaccinated: ${details.vaccinated_status == undefined?'No Info':details.vaccinated_status}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <img src="https://img.icons8.com/?size=100&id=85843&format=png&color=838383" class="w-7">
                    <h2 class="text-lg text-gray-500">Price: ${details.price == undefined?'No Info':details.price}$</h2>
                </div>
        </div>
        <div>
            <h2 class="text-lg font-semibold">Details Information</h2>
            <div class="flex items-center gap-2">
                    <p class=" text-gray-500">Price: ${details.pet_details == undefined?'No Info':details.pet_details}</p>
                </div>
        </div>
        <div>
            <form method="dialog" class="w-full">
                <button class="btn w-full bg-[#0e79813b] text-lg text-[#0e7a81]">Close</button>
            </form>
        </div>
    `;
    
}
//displaying pets adoption in modal
const adoptUsingId = (id) => {
    const showInterval = document.getElementById('showInterval');
    const adoptModal = document.getElementById('adoptModal');
    id.forEach(pets =>{
        const adoptId = document.getElementById(`adopt-${pets.petId}`);
        adoptId.addEventListener('click', () => {
            adoptModal.showModal();
        let seconds = 3;
        showInterval.innerText = seconds;
        const interval = setInterval(() =>{
            seconds--;
        adoptId.setAttribute('disabled', true)
        showInterval.innerText = seconds;
        if(seconds <= 1){
            clearInterval(interval);
            adoptModal.close();
        }
        }, 1000)
        })
    })
}
//sorting pets based on price
const sortPetPrice = (pets) => {
    const sortBtn = document.getElementById('low-to-high');
    sortBtn.addEventListener('click', ()=>{
        pets.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
    });
    displayAllPets(pets);
    })
  
};
// displaying pets carts
const displayAllPets = (allPets) => {
    const petsCart = document.getElementById('pets-cart');
    petsCart.innerHTML='';
            if(allPets.length === 0){
            petsCart.classList.remove('grid');
            petsCart.innerHTML=`
            <div class="bg-gray-200 h-[500px] rounded-md flex flex-col justify-center items-center gap-3">
                <img src="assets/error.webp" class="w-40">
                <h2 class="text-2xl font-bold">No Information Available</h2>
                <p class="max-w-[700px] text-center text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
            `;
        }else{
            petsCart.classList.add('grid');
        }
    allPets.forEach((pet) => {
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
                    <h2 class="text-lg text-gray-500">Price: ${pet.price == undefined?'No Info':pet.price}$</h2>
                </div>
                <div class="flex justify-between px-3 pt-3">
                <i id="show-thumbnail-${pet.petId}" class="btn pt-2 hover:bg-[#0E7A81] fa-regular fa-thumbs-up text-2xl hover:text-white"></i>
                <button id="adopt-${pet.petId}" class="btn px-3 text-[#0E7A81] text-lg hover:bg-[#0E7A81] hover:text-white adoptBtn">Adopt</button>
                <button onclick="detailsPetsCarts(${pet.petId})" class="btn px-3 text-[#0E7A81] text-lg hover:bg-[#0E7A81] hover:text-white">Details</button>
                </div>
            </div>
        `;
        petsCart.append(cartContainer);
    })
}