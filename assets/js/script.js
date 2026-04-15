'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}



// =============================================
// نافذة تفاصيل المشروع المنبثقة
// =============================================

// Project Modal Variables
const projectItems = document.querySelectorAll(".project-item");
const projectModal = document.querySelector("[data-project-modal]");
const projectCloseBtn = document.querySelector("[data-project-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

const projectTitle = document.querySelector("[data-project-title]");
const projectDesc = document.querySelector("[data-project-desc]");
const projectScreenshots = document.querySelector("[data-project-screenshots]");

// دالة فتح وإغلاق النافذة المنبثقة
const toggleProjectModal = () => {
  if (projectModal) {
    projectModal.classList.toggle("active");
    // منع التمرير في الخلفية عند فتح النافذة
    document.body.style.overflow = projectModal.classList.contains("active") ? "hidden" : "";
  }
};

// دالة إغلاق النافذة المنبثقة
const closeModal = () => {
  if (projectModal) {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// إضافة حدث النقر لكل مشروع
if (projectItems.length > 0) {
  projectItems.forEach(item => {
    item.addEventListener("click", function(e) {
      // منع التنقل إذا كان هناك رابط
      const anchor = this.querySelector('a');
      if (anchor && anchor.getAttribute('href') !== 'javascript:void(0)') {
        return;
      }
      
      // جلب بيانات المشروع من الخصائص المخصصة
      const name = this.getAttribute("data-project-name");
      const description = this.getAttribute("data-project-description");
      const imagesAttr = this.getAttribute("data-project-images");

      if (name && description) {
        // تعيين العنوان والوصف
        projectTitle.textContent = name;
        projectDesc.textContent = description;
        
        // مسح وإعادة ملء معرض الصور
        projectScreenshots.innerHTML = "";
        
        if (imagesAttr && imagesAttr.trim() !== "") {
          // تقسيم قائمة الصور وإزالة المسافات الزائدة
          const images = imagesAttr.split(",").map(src => src.trim());
          
          images.forEach(src => {
            if (src) {
              const img = document.createElement("img");
              img.src = src;
              img.alt = `${name} - لقطة شاشة`;
              img.loading = "lazy";
              
              // إضافة حدث النقر لعرض الصورة بالحجم الكامل
              img.addEventListener("click", (e) => {
                e.stopPropagation();
                window.open(src, '_blank');
              });
              
              projectScreenshots.appendChild(img);
            }
          });
        } else {
          // إذا لم تكن هناك صور محددة، استخدم الصورة الرئيسية للمشروع
          const mainImg = this.querySelector('.project-img img');
          if (mainImg) {
            const img = document.createElement("img");
            img.src = mainImg.src;
            img.alt = `${name} - الصورة الرئيسية`;
            img.addEventListener("click", (e) => {
              e.stopPropagation();
              window.open(mainImg.src, '_blank');
            });
            projectScreenshots.appendChild(img);
          } else {
            // رسالة في حال عدم وجود صور
            const noImagesMsg = document.createElement("p");
            noImagesMsg.textContent = "لا توجد صور متاحة لهذا المشروع حالياً.";
            noImagesMsg.style.color = "var(--light-gray)";
            noImagesMsg.style.textAlign = "center";
            noImagesMsg.style.gridColumn = "1 / -1";
            noImagesMsg.style.padding = "20px";
            projectScreenshots.appendChild(noImagesMsg);
          }
        }
        
        // فتح النافذة المنبثقة
        toggleProjectModal();
      }
    });
  });
}

// إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
if (projectCloseBtn) {
  projectCloseBtn.addEventListener("click", closeModal);
}

// إغلاق النافذة المنبثقة عند النقر على الخلفية
if (projectOverlay) {
  projectOverlay.addEventListener("click", closeModal);
}

// إغلاق النافذة المنبثقة عند الضغط على مفتاح Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
    closeModal();
  }
});

// منع إغلاق النافذة عند النقر على محتوى النافذة نفسها
const modalContent = document.querySelector(".project-modal-content");
if (modalContent) {
  modalContent.addEventListener("click", (e) => e.stopPropagation());
}