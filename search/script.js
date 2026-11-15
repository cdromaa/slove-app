
let dropdownMenu = document.getElementById("dropdown-menu")
let dropdownBtn = document.getElementById("search-dropdown")
let overlay = document.getElementById("overlay")

let allElements = [
    document.querySelector("h1"),
    document.querySelector("#word-search"),
    document.querySelector(".results-container"),
    document.querySelector("footer"),
    document.querySelector(".filters")
]

// console.log(allElements)

let isOpened = 0

dropdownBtn.addEventListener("click", () => {
    if (isOpened == 0) {
        isOpened = 1

        dropdownMenu.style.display = "flex"
        dropdownMenu.classList.remove("scale-down-right")
        dropdownMenu.classList.add("scale-up-right")
        dropdownBtn.style.borderRadius = "25px 25px 0px 0px";
        overlay.style.display = "unset"

        allElements.forEach((element) => {
            if (element) {
                element.classList.add("blured")
                element.classList.remove("unblured")
            }
        })
    }
    else if (isOpened == 1) {
        isOpened = 0
        dropdownMenu.classList.remove("scale-up-right")
        dropdownMenu.classList.add("scale-down-right")
        dropdownBtn.style.borderRadius = "25px"
        allElements.forEach((element) => {
            if (element) {
                element.classList.remove("blured")
                element.classList.add("unblured")
            }
        })

        setTimeout(() => {
            dropdownMenu.style.display = "none";
        }, 400);
    }
})

overlay.addEventListener("click", () => {
    if (isOpened == 1) {
        isOpened = 0
        dropdownMenu.classList.remove("scale-up-right")
        dropdownMenu.classList.add("scale-down-right")
        dropdownBtn.style.borderRadius = "25px"
        overlay.style.display = "none"
        allElements.forEach((element) => {
            if (element) {
                element.classList.remove("blured")
                element.classList.add("unblured")
            }
        })

        setTimeout(() => {
            dropdownMenu.style.display = "none";
        }, 400);

        dropdownBtn.style.borderRadius = "25px";
    }
})

function updateMargin() {
    const width = window.innerWidth; // Tracks viewport width

    let finalMargin = (width - (width / 100 * 90)) / 1.95

    if (width <= 768) {
        dropdownMenu.style.marginRight = finalMargin + 'px';
    }
}
// 3. Add event listener for screen resizing
window.addEventListener('resize', updateMargin);
// 4. Run the function once initially to set the correct starting margin
updateMargin();

// ВИПАДНЕ МЕНЮ

let checkboxFilters = document.querySelectorAll("input[type='checkbox']")
console.log(checkboxFilters)

let spanFilters = document.querySelectorAll(".filters>span")

spanFilters.forEach(filter => {
    filter.addEventListener("click", () => {
        filter.style.display = "none"
        let filterID = filter.id
        let filterIDResult = filterID.replace(/-filter$/, "")
        console.log(filterIDResult)
        document.getElementById(filterIDResult).checked = false

        updateFiltersState()
    })
});

checkboxFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        console.log(`${checkbox.name} is now ${checkbox.checked ? 'checked' : 'unchecked'}`);
        updateFiltersState()
    });
});

function updateFiltersState() {
    let checkedCheckboxes = 0
    checkboxFilters.forEach(checkedCheckbox => {
        if (checkedCheckbox.checked) {
            checkedCheckboxes += 1
        }
        else {
            checkedCheckboxes += 0
        }
    });
    console.log(checkedCheckboxes)

    if (checkedCheckboxes >= 1) {
        document.getElementById("filters").style.display = "flex"
    }
    else if (checkedCheckboxes < 1) {
        document.getElementById("filters").style.display = "none"
    }

    checkboxFilters.forEach(filterSelected => {
        if (filterSelected.checked == true) {
            document.querySelector(`.filters>span#${filterSelected.id}-filter`).style.display = "flex"
        }
        else if (filterSelected.checked == false) {
            document.querySelector(`.filters>span#${filterSelected.id}-filter`).style.display = "none"
        }
    });
}

// ПОШУК СЛІВ

let searchBar = document.getElementById("word-search")

searchBar.addEventListener("click", () => { searchBar.select() })

let resultContainer = document.getElementById("resultContainer")
let searchIDCheckboxes = []

function addCheckboxIDToArray() {
    searchIDCheckboxes = []
    checkboxFilters.forEach(checkboxID => {
        if (checkboxID.checked === true) {
            let searchFilterID = checkboxID.id
            let searchFilterIDResult = searchFilterID.replace(/-checkbox$/, "")
            searchIDCheckboxes.push(`${searchFilterIDResult}`)
        }
    })
    console.log("Назви фільтрів: " + searchIDCheckboxes)
}

checkboxFilters.forEach(searchID => {
    searchID.addEventListener('change', () => {
        addCheckboxIDToArray()
    });
});

searchBar.addEventListener("input", () => {
    let searchBarInput = searchBar.value.toLowerCase()
    console.log(searchBarInput)
})