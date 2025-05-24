const clickToDropDown = () => {
    const menuDrop = document.getElementById('menu-drop');
    if (!menuDrop) return;

    if (menuDrop.classList.contains('hidden')) {
        menuDrop.classList.remove('hidden');
        menuDrop.classList.add('flex');
    } else {
        menuDrop.classList.remove('flex');
        menuDrop.classList.add('hidden');
    }
};
