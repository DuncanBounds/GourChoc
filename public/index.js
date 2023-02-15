"use strict";

////////////////////////////////////////////////////////////
//-----------------DOM SELECTORS---------------------------

const cards = document.querySelector(".cards");
const cardsContainer = document.querySelector(".cards__container");
const allCardPopups = document.querySelectorAll(".card-popup");
const cardBtns = document.querySelectorAll(".card__btn");

const headerIconsContainer = document.querySelector(".header-icons__container");
const headerPopupsContainer = document.querySelector(
  ".header-popups__container"
);
const allHeaderPopups = document.querySelectorAll(".header-popup");
const headerSearchIcon = document.getElementById("header__icon--search");
const headerSearch = document.querySelector(".header__search");
const headerSearchInput = document.querySelector(".header__searchInput");
const headerSearchBtn = document.querySelector(".header__searchBtn");

const navList = document.querySelector(".nav__list");
const allNavDropdowns = document.querySelectorAll(".nav-dropdown");

const hamNavBtn = document.querySelector(".nav-hamburger__btn");
const hamBtnIcons = document.querySelectorAll(".nav-hamburger__icon");
const hamNav = document.querySelector(".nav-hamburger");
const hamNavList = document.querySelector(".nav-hamburger__list");
const hamNavSublists = document.querySelectorAll(".nav-hamburger__sublist");

////////////////////////////////////////////////////////////
//--------------------- ES6 CLASSES------------------------

/////////////////////////////////////////////////////////
//---------------HAMBURGER NAVIGATION BUTTON EVENTS-----------

class HamburgerNav {
  constructor() {
    hamNavBtn.addEventListener("click", this.hamNavToggle.bind(this));
    hamNavList.addEventListener("click", this.hamNavSubToggle.bind(this));
  }

  hamNavToggle() {
    //e.preventDefault();
    hamNavBtn.classList.toggle("nav-hamburger__btn--fixed");

    hamBtnIcons.forEach((icon, i) => {
      icon.classList.toggle("nav-hamburger__icon--active");
      icon.classList.toggle("nav-hamburger__icon--inactive");
    });

    hamNav.classList.toggle("nav-hamburger--active");

    hamNavSublists.forEach((sublist) => {
      sublist.classList.remove("nav-hamburger__sublist--active");
    });
  }

  hamNavSubToggle(e) {
    e.preventDefault();

    const clicked = e.target.closest(".nav-hamburger__link");
    const navTarget = e.target.closest(
      ".nav-hamburger__link"
    ).nextElementSibling;
    const icon = e.target.closest(".nav-hamburger__link").firstElementChild;

    navTarget.classList.toggle("nav-hamburger__sublist--active");
    icon.classList.toggle("nav-hamburger__list--icon--active");
  }
}

const hamburgerNavigation = new HamburgerNav();

//////////////////////////////////////////////////////////////////
//-----------------HEADER POPUPS EVENTS (SIGN IN/CART)-------------

class HeaderPopups {
  constructor() {
    headerIconsContainer.addEventListener("click", this.openPopup.bind(this));
    headerPopupsContainer.addEventListener(
      "click",
      this.closePopupBtn.bind(this)
    );
    headerPopupsContainer.addEventListener(
      "click",
      this.closePopupWin.bind(this)
    );
  }

  openPopup(e) {
    e.preventDefault();

    const clicked = e.target.closest(".header__icon");

    if (!clicked) return;

    headerPopupsContainer.classList.add("header-popups__container--active");

    allHeaderPopups.forEach((popup) => {
      popup.classList.remove("header-popup--active");

      document
        .querySelector(`.header-popup-${clicked.dataset.icon}`)
        .classList.add("header-popup--active");
    });
  }

  closePopupWin(e) {
    e.preventDefault();

    if (e.target.classList.contains("header-popups__container")) {
      headerPopupsContainer.classList.remove(
        "header-popups__container--active"
      );

      allHeaderPopups.forEach((popup) => {
        popup.classList.remove("header-popup--active");
      });
    }
  }

  closePopupBtn(e) {
    e.preventDefault();

    const clicked = e.target.closest(".header-popup__btn--close");

    if (!clicked) return;

    headerPopupsContainer.classList.remove("header-popups__container--active");

    document
      .querySelector(`.header-popup-${clicked.dataset.btn}`)
      .classList.remove("header-popup--active");
  }
}

const headerPopups = new HeaderPopups();

///////////////////////////////////////////////////////////////////
//-------------------------SEARCH BAR IN HEADER -------------------

class Search {
  constructor() {
    headerSearchIcon.addEventListener("click", this.openSearch.bind(this));
    headerSearchBtn.addEventListener("click", this.closeSearch.bind(this));
  }

  openSearch() {
    headerSearch.classList.add("header__search--active");
    headerSearchInput.classList.add("header__searchInput--active");
    headerSearchBtn.classList.add("header__searchBtn--active");
  }

  closeSearch() {
    headerSearch.classList.remove("header__search--active");
    headerSearchInput.classList.remove("header__searchInput--active");
    headerSearchBtn.classList.remove("header__searchBtn--active");
  }
}

const searchBar = new Search();

////////////////////////////////////////////////////////////////
//----------------NAV DROPDOWN LINKS HOVER EVENTS----------------

class Dropdowns {
  constructor() {
    navList.addEventListener("mouseover", this.dropdownAppear.bind(this));
    navList.addEventListener("mouseout", this.dropdownDisappear.bind(this));
  }

  dropdownAppear(e) {
    const hovered = e.target.closest(".nav__link");

    if (!hovered) return;

    hovered.classList.add("nav__link--active");

    allNavDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("nav-dropdown--active");

      document
        .querySelector(`.nav-dropdown__${hovered.dataset.link}`)
        .classList.add("nav-dropdown--active");
    });
  }

  dropdownDisappear(e) {
    const hovered = e.target.closest(".nav__link");

    if (!hovered) return;

    hovered.classList.remove("nav__link--active");
    document
      .querySelector(`.nav-dropdown__${hovered.dataset.link}`)
      .classList.remove("nav-dropdown--active");
  }
}

const dropdowns = new Dropdowns();

//////////////////////////////////////////////////////////////
//------------------CARD POP UPS CLICK EVENTS------------------

class CardPopups {
  constructor() {
    cardsContainer.addEventListener("click", this.openPopup.bind(this));

    cardsContainer.addEventListener("click", this.closePopupBtn.bind(this));

    cards.addEventListener("click", this.closePopupWin.bind(this));
  }

  openPopup(e) {
    const clicked = e.target.closest(".card__btn");

    if (!clicked) return;

    allCardPopups.forEach((popup) => {
      popup.classList.remove("card-popup--active");

      document
        .querySelector(`.card-popup--${clicked.dataset.tab}`)
        .classList.add("card-popup--active");
    });
  }

  closePopupBtn(e) {
    const clicked = e.target.closest(".card-popup__btn--close");

    if (!clicked) return;

    document
      .querySelector(`.card-popup--${clicked.dataset.tab}`)
      .classList.remove("card-popup--active");
  }

  closePopupWin(e) {
    e.preventDefault();

    if (e.target.classList.contains("card-popup"))
      allCardPopups.forEach((popup) => {
        popup.classList.remove("card-popup--active");
      });
  }
}

const cardPopups = new CardPopups();

/////////////////////////////////////////////////////////
//------------------------SLIDER--------------------------

//------DOM ELEMENT SELECTORS------

const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const btnLeft = document.querySelector(".slides__btn--left");
const btnRight = document.querySelector(".slides__btn--right");

//-----SLIDER CLASS-------

class Slider {
  constructor() {
    this.curSlide = 0;
    this.maxSlide = slides.length;
    this.init();

    btnLeft.addEventListener("click", this.prevSlide.bind(this));
    btnRight.addEventListener("click", this.nextSlide.bind(this));
    document.addEventListener("keydown", this.changeSlideArrowKey.bind(this));
    dotContainer.addEventListener("click", this.clickDot.bind(this));
  }

  get setCurSlide() {
    return this.curSlide;
  }

  set setCurSlide(slide) {
    this.curSlide = slide;
  }

  createDots() {
    slides.forEach((slide, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  activateDots(slide) {
    document.querySelectorAll(".dots__dot").forEach((dot, i) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  nextSlide() {
    if (this.curSlide == this.maxSlide - 1) {
      this.setCurSlide = 0;
    } else if (this.curSlide !== this.maxSlide - 1) {
      this.setCurSlide = this.curSlide + 1;
    }

    this.goToSlide(this.curSlide);
    this.activateDots(this.curSlide);
  }

  prevSlide() {
    if (this.curSlide === 0) {
      this.setCurSlide = this.maxSlide - 1;
    } else if (this.curSlide !== 0) {
      this.setCurSlide = this.curSlide - 1;
    }

    this.goToSlide(this.curSlide);
    this.activateDots(this.curSlide);
  }

  changeSlideArrowKey(e) {
    if (e.key === "ArrowLeft") {
      this.prevSlide();
    }
    if (e.key === "ArrowRight") {
      this.nextSlide();
    }
  }

  clickDot(e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      this.setCurSlide = +slide;
      this.goToSlide(this.curSlide);
      this.activateDots(this.curSlide);
    }
  }

  init() {
    this.goToSlide(0);
    this.createDots();
    this.activateDots(0);
  }
}

const slider = new Slider();

////////////////////////////////////////////////////////////////
//--------------------- LAZY LOADING IMAGES----------------------

const imgTargets = document.querySelectorAll("img[data-src]");

class LazyImgs {
  constructor() {
    this.lazyLoadingImages();
  }

  lazyLoadingImages() {
    const loadImg = function (entries, observer) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      //Replace src with data-src
      console.log(entry.target.srcset);
      console.log(entry.target.dataset.src);
      entry.target.srcset = entry.target.dataset.src;
      console.log(entry.target.srcset);

      //Remove blur once image loaded
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("img__lazy");
      });

      observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: "300px",
    });

    imgTargets.forEach((img) => {
      imgObserver.observe(img);
    });
  }
}

const lazyImgs = new LazyImgs();
