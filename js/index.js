//loading pet category buttons
const petCategory = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategoryBtn(data.categories)
}
petCategory();

//displaying category buttons
const displayCategoryBtn = (category) => {
    const petCategory = document.getElementById('petcategory');
    category.forEach(item => {
        console.log(item)
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    <button id="btn-${item.id}" class="btn font-bold px-14 py-8 rounded-full activated"><img class="w-10" src="${item.category_icon} ">${item.category}</button>
    `
    petCategory.append(buttonContainer)
    });
}