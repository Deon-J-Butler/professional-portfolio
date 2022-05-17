const toggleSwitch = document.querySelector('input[type="checkbox"]')
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const textBox = document.getElementsByClassName('text-box')

// Dark mode styles
function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'
    for (let elem of textBox) {
        elem.style.backgroundColor = 'rgb(255 255 255 / 50%)'
    }
    toggleIcon.children[2].textContent = 'Dark Mode'
    toggleIcon.children[1].classList.remove('fa-sun')
    toggleIcon.children[1].classList.add('fa-moon')
}

// Light mode styles
function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'
    for (let elem of textBox) {
        elem.style.backgroundColor = 'rgb(0 0 0 / 50%)'
    }
    toggleIcon.children[2].textContent = 'Light Mode'
    toggleIcon.children[1].classList.remove('fa-moon')
    toggleIcon.children[1].classList.add('fa-sun')
}

// Switch theme dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
        darkMode()
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
        lightMode()
    }
}

// Event listener
toggleSwitch.addEventListener('change', switchTheme)

// Check local storage for theme
const currentTheme = localStorage.getItem('theme')

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode()
    }
}

function fadeIn() {
    document.body.className = 'fadeIn'
}

document.addEventListener("click", e => {
    let handle
    if (e.target.matches(".handle")) {
        handle = e.target
    } else {
        handle = e.target.closest(".handle")
    }
    if (handle !== null) {
        onHandleClick(handle)
    }
})

function onHandleClick(handle) {
    const slider = handle.closest(".portfolio-container").querySelector(".slider")
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
    if (handle.classList.contains("left-handle")) {
        if (sliderIndex < 1) {
            slider.style.setProperty("--slider-index", slider.children.length - 1)
        } else {
            slider.style.setProperty("--slider-index", sliderIndex - 1)
            console.log(sliderIndex)
        }
    }
    if (handle.classList.contains("right-handle")) {
        if (sliderIndex + 1 >= slider.children.length) {
            slider.style.setProperty("--slider-index", 0)
        } else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
        }
    }
}

const dragSlider = document.querySelector('.slider')
const dragSliderIndex = parseInt(getComputedStyle(dragSlider).getPropertyValue("--slider-index"))
let startX

dragSlider.addEventListener('touchstart', (e) => {
    dragSlider.classList.add('active')
    startX = e.touches[0].clientX
})

dragSlider.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const drag = e.touches[0].clientX

    if (drag < startX - 100) {
        if (dragSliderIndex + 1 >= dragSlider.children.length) {
            dragSlider.style.setProperty("--slider-index", 0)
        } else {
            console.log('made it')
            dragSlider.style.setProperty("--slider-index", dragSliderIndex + 1)
            console.log(dragSliderIndex)
        }
    } else if (drag > startX + 100) {
        if (dragSliderIndex < 1) {
            dragSlider.style.setProperty("--slider-index", dragSlider.children.length - 1)
        } else {
            console.log('second route')
            dragSlider.style.setProperty("--slider-index", dragSliderIndex - 1)
            console.log(dragSliderIndex)
        }
    }
})

dragSlider.addEventListener('touchend', () => {
    dragSlider.classList.remove('active')
})