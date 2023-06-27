const menuBtn = document.getElementById('menu-btn')
const overlay = document.getElementById('overlay')
const mobileNav = document.getElementById('mobile-nav')
const menuIcon = document.getElementById('icon-menu')
const closeMenuIcon = document.getElementById('icon-close-menu')
const buttons = document.querySelectorAll('[data-button]')
const menuBtns = document.querySelectorAll('[data-menu]')

let isNavOpen = false

function toggleClass(element, className, condition) {
  if (condition) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

function toggleNavbar() {
  isNavOpen = !isNavOpen
  document.documentElement.scrollTop = 0

  toggleClass(overlay, 'overlay-open', isNavOpen)
  toggleClass(mobileNav, 'nav-open', isNavOpen)
  toggleClass(menuIcon, 'hidden', isNavOpen)
  toggleClass(closeMenuIcon, 'hidden', !isNavOpen)
  toggleClass(document.body, 'no-scroll', isNavOpen)
}

function toggleSection(event) {
  const element = event.currentTarget
  const menuBody = element.nextElementSibling
  const isOpened = menuBody.style.maxHeight !== '0px'
  menuBody.style.maxHeight = isOpened ? '0px' : `${menuBody.scrollHeight}px`
  menuBody.style.visibility = isOpened ? 'hidden' : 'visible'
  element.setAttribute('aria-expanded', !isOpened)
  toggleClass(element, 'menu-open', !isOpened)
}

function toggleDesktopMenu(event) {
  const element = event.currentTarget
  const menuBody = element.nextElementSibling
  const isOpened = !menuBody.classList.contains('invisible')
  toggleClass(menuBody, 'invisible', isOpened)
  element.setAttribute('aria-expanded', !isOpened)
}

function handleDocumentClick(event) {
  menuBtns.forEach(item => {
    const parentElement = item.parentElement
    const menuBody = item.nextElementSibling
    if (parentElement.contains(event.target)) return
    menuBody.classList.add('invisible')
    item.setAttribute('aria-expanded', 'false')
  })
}

menuBtn.addEventListener('click', toggleNavbar)
buttons.forEach(item => item.addEventListener('click', toggleSection))
menuBtns.forEach(item => item.addEventListener('click', toggleDesktopMenu))
document.addEventListener('click', handleDocumentClick)
