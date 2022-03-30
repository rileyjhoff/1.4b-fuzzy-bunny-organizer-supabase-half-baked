import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        const familyDiv = document.createElement('div');
        const familyNameEl = document.createElement('h3');
        const bunniesDiv = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        familyDiv.classList.add('family');
        bunniesDiv.classList.add('bunnies');
        // put the family name in the name element
        familyNameEl.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            //    make an element with the css class 'bunny', and put the bunny's name in the text content
            const anchor = document.createElement('a');
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;
            anchor.href = `../edit-bunny/?id=${bunny.id}`;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            // bunnyDiv.addEventListener('click', async () => {
            //     await deleteBunny(bunny.id);
            //     displayFamilies();
            // });
            // append this bunnyEl to the bunniesEl
            anchor.append(bunnyDiv);
            bunniesDiv.append(anchor);
        }
        // append the bunniesEl and nameEl to the familyEl
        familyDiv.append(familyNameEl, bunniesDiv);
        // append the familyEl to the familiesEl
        familiesEl.append(familyDiv);
    }
}

window.addEventListener('load', async () => {
    const families = await getFamilies();
    console.log(families);
    displayFamilies(families);
});
