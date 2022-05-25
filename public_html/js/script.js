const toggleSwitch = document.querySelector('input[type="checkbox"]')
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const textBox = document.getElementsByClassName('text-box')

function fadeIn() {
    document.body.className = 'fadeIn'
}

// Dark mode styles
function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 70%)'
    for (let elem of textBox) {
        elem.style.backgroundColor = 'rgb(255 255 255 / 85%)'
    }
    toggleIcon.children[2].textContent = 'Dark Mode'
    toggleIcon.children[1].classList.remove('fa-sun')
    toggleIcon.children[1].classList.add('fa-moon')
}

// Light mode styles
function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 70%)'
    for (let elem of textBox) {
        elem.style.backgroundColor = 'rgb(0 0 0 / 70%)'
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

window.addEventListener('scroll', matrixScroll)

function matrixScroll() {
    const matrixScroller = document.getElementById('matrix-scroll').querySelectorAll('h1')
    matrixScroller.forEach(object => object.innerHTML = shuffleWords(object.innerHTML))
    const changeWords = document.getElementById('matrix-scroll')
    const expertise = document.getElementById('expertise')
    if (changeWords.getBoundingClientRect().top < 280) {
        matrixScroller[1].innerHTML = '\"What Kind Of Development?\", you ask...'
        expertise.style.setProperty('opacity', '1')
        expertise.style.setProperty('transition', 'opacity 2s')
    } else {
        matrixScroller[1].innerHTML = shuffleWords('011101001001101010011101001001101010011101001001101010')
        expertise.style.setProperty('opacity', '0')
    }
}

function shuffleWords(string) {
    let tickerArray = string.split('')

    for (let i = 0; i < tickerArray.length; i++) {
        let randomNumber = Math.floor(Math.random() * tickerArray.length)
        // Create a temp variable to transfer values between array indices
        let temp = tickerArray[i]
        tickerArray[i] = tickerArray[randomNumber]
        tickerArray[randomNumber] = temp
    }
    return tickerArray.join('')
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

const slider = document.getElementById("slider")
let startX
slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX
    onTouchDrag()
})

function onTouchDrag() {
    const dragSlider = document.querySelector('.slider')
    const dragSliderIndex = parseInt(getComputedStyle(dragSlider).getPropertyValue("--slider-index"))

    dragSlider.addEventListener('touchmove', (e) => {
        e.preventDefault()
        const drag = e.touches[0].clientX

        if (drag < startX - 100) {
            if (dragSliderIndex + 1 >= dragSlider.children.length) {
                dragSlider.style.setProperty("--slider-index", 0)
            } else {
                dragSlider.style.setProperty("--slider-index",  dragSliderIndex + 1)
            }
        } else if (drag > startX + 100) {
            if (dragSliderIndex < 1) {
                dragSlider.style.setProperty("--slider-index", dragSlider.children.length - 1)
            } else {
                dragSlider.style.setProperty("--slider-index", dragSliderIndex - '1')
            }
        }
    })
}

const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver
(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('appear');
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        })
    },
    appearOptions);

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});
