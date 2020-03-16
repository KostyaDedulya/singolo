window.onload = () => {
  addMenuActiveLinksHandler();
  addScrollChangeOnHashChange();
  addPhoneDisplayHandler();
  addPortfolioFilterHandler();
  addPortfolioItemHandler();
  addModalWindowContactFormHandler();
  addSliderHandler();
}

const addMenuActiveLinksHandler = () => {
  const menuLinks = document.querySelectorAll('.menu__link');
  menuLinks.forEach(item => {
    item.addEventListener('click', (event) => {
      menuLinks.forEach(link => link.classList.remove('menu_active'));
      event.target.classList.add('menu_active');
    })
  });
}

const addScrollChangeOnHashChange = () => {
  window.addEventListener('hashchange', (event) => {
    if (location.hash === '#contacts') return;
    window.scrollBy(0, -75);
  });
}

const addPhoneDisplayHandler = () => {
  const phones = document.querySelectorAll('.phone');
  phones.forEach(phone => {
    phone.addEventListener('click', (event) => {
      if (event.target.classList.contains('phone__shadow')) return;
      const display = phone.querySelector('.phone__display');
      display.classList.toggle('phone__display_showed');
    });
  })
}

const addPortfolioFilterHandler = () => {
  const filterTags = document.querySelectorAll('.portfolio__filter__tag');
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  const portfolioFilter = document.querySelector('.portfolio__filter');
  let portfolioPhotos = [];
  portfolioItems.forEach(item => portfolioPhotos.push(item.attributes.src.value));
  portfolioFilter.addEventListener('click', (event) => {
    if (event.target.classList.contains('portfolio__filter__tag')) {
      filterTags.forEach(tag => tag.classList.remove('portfolio__filter__tag_active'));
      event.target.classList.add('portfolio__filter__tag_active');
      portfolioPhotos.sort(() => Math.random() - 0.5);
      portfolioItems.forEach((item, i) => {
        item.setAttribute('src', portfolioPhotos[i]);
      })
    }
  })
}

const addPortfolioItemHandler = () => {
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  document.querySelector('.portfolio__layout').addEventListener('click', (event) => {
    if (event.target.classList.contains('portfolio__item')) {
      portfolioItems.forEach(item => item.classList.remove('portfolio__item_active'))
      event.target.classList.add('portfolio__item_active');
    }
  })
}

const addModalWindowContactFormHandler = () => {
  document.querySelector('.contacts__form').addEventListener('submit', (event) => {
    event.preventDefault();
    let subject = document.querySelector('.contacts__form__subject').value;
    let message = document.querySelector('.contacts__form__message').value;
    subject = subject ? `Тема: ${subject}` : `Нет темы`;
    message = message ? `Описание: ${message}` : `Нет описания`;    
    let modal = createModal(subject, message);
    document.body.append(modal);
    closeModal(modal);
  });
}

const createModal = (subject, message) => {
  const layout = document.createElement('div');
  layout.classList.add('layout');
  let template = `
  <div class="modal">
    <h3 class="modal__sent">Письмо отправлено</h3>
    <p class="modal__subject">${subject}</p>
    <p class="modal__message">${message}</p>
    <button class="modal_close">OK</button>
  </div>`;
  layout.innerHTML = template;
  return layout;
}

const closeModal = (modal) => {
  modal.querySelector('.modal_close').addEventListener('click', (event) => {
    modal.remove();
  })
}

const addSliderHandler = () => {
  const slides = Array.from(document.querySelectorAll('.slider__item'));
  const leftArrow = document.querySelector('.slider__button_left');
  const rightArrow = document.querySelector('.slider__button_right');
  const sliderContainer = document.querySelector('.slider__container');
  let step = sliderContainer.offsetWidth;
  let currentSlide = 0;
  let position = 0;
  leftArrow.addEventListener('click', (event) => {
    currentSlide = slideTransform('left', currentSlide, slides);
  })
  rightArrow.addEventListener('click', (event) => {
    currentSlide = slideTransform('right', currentSlide, slides);
  })

  const slideTransform = (direction, currentSlide, slides) => {    
    if (direction === 'left') {
      position--;
      if (currentSlide - 1 < 0) currentSlide = slides.length - 1;
      else currentSlide = currentSlide - 1;
      slides[currentSlide].style.transform = `translateX(${(-position)* step - currentSlide * step}px)`
      sliderContainer.style.transform = `translateX(${position * step}px)`

    }
    if (direction === 'right') {
      position++;
      if (currentSlide + 1 > slides.length - 1) currentSlide = 0;
      else currentSlide = currentSlide + 1;
      slides[currentSlide].style.transform = `translateX(${(-position)* step - currentSlide * step}px)`
      sliderContainer.style.transform = `translateX(${position * step}px)`;
    }
    return currentSlide;
  }
}
