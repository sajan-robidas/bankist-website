const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Button scroll
btnScrollTo.addEventListener("click", function(e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());

    console.log("Current Scroll (X/Y)", window.pageXOffset, windows.pageYOffset);

    console.log(
        "height/width viewport",
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
    );

    // scroll
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset
    // );
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: "smooth",
    // });

    section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////
// page navigation
// document.querySelectorAll(".nav__link").forEach(function (cl) {
//   cl.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab ");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabscontain = document.querySelectorAll(".operations__content");

// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB")));
tabsContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab ");
    console.log(clicked);
    //  Guard clause
    if (!clicked) return;
    // remove active classes
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabscontain.forEach((c) => c.classList.remove("operations__content--active"));

    // active tab
    clicked.classList.add("operations__tab--active");

    // Active Content area
    console.log(clicked.dataset.tab);
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

// Menu Fade Animation
const nav = document.querySelector(".nav");

const handleHover = function(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// nav.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");
//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");
//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// Observer Api
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

// Observer Api
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function(entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const sectionAll = document.querySelectorAll(".section");

const revealSection = function(entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.target) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
sectionAll.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// Lazy loading image

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;
    //  Replace src with dataset src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Building slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

slides.forEach((s, i) => (s.style.transfrom = `translateX(${100 * i} %)`));

const slider = document.querySelector(".slider");

slider.style.transfrom = "scale(0.5)";
slider.style.overflow = "visible";

// Next slide
btnRight.addEventListener("click", function() {});

// console.log(document.documentElement);

// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector(".header");

// const allSelector = document.querySelectorAll(".section");
// console.log(allSelector);
// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML =
//   'create new element <button class="btn btn--close-cookie">Got it</button>';

// // header.prepend(message);
// header.append(message);

// // Delete Element
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// // style

// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);

// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// const logo = document.querySelector(".nav__logo");
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = "nice logo";

// btn--scroll-to
// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());

//   console.log("Current Scroll (X/Y)", window.pageXOffset, windows.pageYOffset);

//   console.log(
//     "height/width viewport",
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );
//   // scroll
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: "smooth",
//   // });

//   section1.scrollIntoView({ behavior: "smooth" });
// });
// Event Handler
// const h1 = document.querySelector("h1");

// h1.addEventListener("mouseenter", function (e) {
//   alert("addEventListener: my name is sajan");
// });
// h1.onmouseenter = function (e) {
//   alert("addEventListener: my name is Razan");
// };

// alertH1 = function (e) {
//   // alert("addEventListener: my name is sajan");
//   // remove function
//   // h1.removeEventListener("mouseenter", alertH1);
// };

// h1.addEventListener("mouseenter", alertH1);

// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// Event Propagation

// const rabdomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${rabdomInt(0, 225)},${rabdomInt(0, 225)},${rabdomInt(0, 225)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Link", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   // stop propagation
//   // e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("nav", e.target, e.currentTarget);
// });

// Dom Traversing

// const h1 = document.querySelector("h1");
// // Going downwards : child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orange";

// // Going Upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // Going sideways : siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

// Lifecycle DOM Event => 21
// window.addEventListener("load", function (e) {
//   console.log("page fully load", e);
// });

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });