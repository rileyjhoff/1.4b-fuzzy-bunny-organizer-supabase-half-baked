import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout,
    getBunny
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const bunnyName = document.getElementById('bunny-name');
const bunnyFamily = document.getElementById('family-select');

form.addEventListener('submit', async e => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    const bunny = {
        name: data.get('bunny-name'),
        family_id: data.get('family-id')
    };
    // use createBunny to create a bunny with this name and family id
    await createBunny(bunny);
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const selectEl = document.getElementById('family-select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
    // create an option tag
        const optionEl = document.createElement('option');
    // set the option's value and text content
        optionEl.value = family.id;
        optionEl.textContent = family.name;
    // and append the option to the select
        selectEl.append(optionEl);
    }
    const data = new URLSearchParams(window.location.search);
    const bunnyId = data.get('id');
    const bunnyObj = await getBunny(bunnyId);
    bunnyName.value = bunnyObj.name;
    bunnyFamily.value = bunnyObj.family_id;
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
