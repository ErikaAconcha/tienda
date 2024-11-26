/**
* Template Name: Bocor
* Template URL: https://bootstrapmade.com/bocor-bootstrap-template-nice-animation/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Implementacion Carrito
   */

  /** Carrito de compras */
const cart = [];

/**
 * Actualiza el contador del carrito en el botón del encabezado
 */
function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

/**
 * Renderiza los productos en el modal del carrito
 */
  function renderCart() {
    const cartItems = document.querySelector('#cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.name} - Talla: ${item.size} - Color: ${item.color} - $${item.price}
        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button>
      `;
      cartItems.appendChild(li);
    });

    // Añadir eventos para eliminar productos
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCartCount();
        renderCart();
      });
    });
}


  /**
   * Añade un producto al carrito
   */
  function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    renderCart();
  }

  /**
 * Enlace para preguntar por los productos vía WhatsApp
 */
function checkoutWhatsApp() {
  const phoneNumber = '+573128566435'; // Cambia al número correcto si es necesario

  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  // Construir el mensaje con todos los detalles de los productos
  const message = cart.map((item, index) => {
    return `${index + 1}. Producto: ${item.name}%0A` +
           `   - Precio: $${item.price}%0A` +
           `   - Talla: ${item.size || 'No aplica'}%0A` +
           `   - Color: ${item.color || 'No aplica'}%0A`;
  }).join('%0A');

  // Crear el enlace de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola,%20quiero%20preguntar%20por:%0A%0A${message}`;
  window.open(whatsappUrl, '_blank');
}


  /**
   * Inicializa los eventos relacionados con el carrito
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Botones de "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.portfolio-info');
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');
        const size = productElement.querySelector('.select-size').value;
        const color = productElement.querySelector('.select-color').value;
    
        // Añadir producto al carrito con talla y color
        cart.push({ name, price, size, color });
        updateCartCount();
        renderCart();
      });
    });

    // Botón de finalizar compra
    const checkoutBtn = document.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', checkoutWhatsApp);
    }
  });

  

})();