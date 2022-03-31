import { 
    checkAuth, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');
const sortEl = document.getElementById('sort');

logoutButton.addEventListener('click', () => {
    logout();
});

let families = [];

sortEl.addEventListener('change', async () => {
    if (sortEl.value === '1') {
        const rawFamilies = await getFamilies();
        families = rawFamilies.map(family => {family.bunnyCount = family.fuzzy_bunnies.length; return family;});      }    
    if (sortEl.value === '2') {
        families = [...families].sort(compareBunnies).reverse();
    }
    if (sortEl.value === '3') {
        families = [...families].sort(compareBunnies);
    }
    await displayFamilies(families);
});

async function displayFamilies(families) {
    // fetch families from supabase
    // console.log(families);
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
    const rawFamilies = await getFamilies();
    families = rawFamilies.map(family => {family.bunnyCount = family.fuzzy_bunnies.length; return family;});
    displayFamilies(families);
});

function compareBunnies(a, b) {
    const bunniesA = a.bunnyCount;
    const bunniesB = b.bunnyCount;
    let comparison = 0;
    if (bunniesA > bunniesB) {
        comparison = 1;
    }
    if (bunniesB > bunniesA) {
        comparison = -1;
    }
    return comparison;
}

// counts fuzzy_bunnies.length and sorts from lowest to highest
// families.map(family => family.fuzzy_bunnies.length).sort()

// counts fuzzy_bunnies.length and sorts from highest to lowest
// families.map(family => family.fuzzy_bunnies.length).sort().reverse()

function sortFamilies(families, value) {
    if (value === 2) {
        families.sort()
    }
}