'use strict';

const pathToImages = 'img';
const pathToProductsImages = `${pathToImages}/featured`;
const featuredItemsEl = document.querySelector('.catalog__products');

/**
 * Эта функция принимает один из объектов из массива products в файле products.js.
 * @param {ProductDTO} product объект с информацией о продукте
 * @returns {string} html-разметка карточки товара
 */
function getProductMarkup(product) {
    return `
    <div class="featured__item">
        <img class="item__image" src="${pathToProductsImages}/${product.image}" alt="${product.name}">
    <div class="featured__item-hover">
        <button data-productId="${product.id}" class="add-to-cart">
            <img src="img/add-to-cart.svg" alt="Cart">
            <p class="add-to-cart__img">Add To Cart</p>
        </button>
    </div>
    <h4 class="item__name item__text">${product.name}</h4>
    <p class="item__description item__text">${product.description}</p>
    <p class="item__price item__text">$${product.price}</p>
</div>
    `;
}

/**
 * Функция вставляет карточки товаров в страницу.
 * @param {ProductDTO[]} products массив товаров из файла products.js
 * @param {HTMLDivElement} featuredItemsEl элемент с классом .featuredItems
 */
function insertProductsIntoPage(products, featuredItemsEl) {
    let productsMarkup = '';
    for (let product of products) {
        productsMarkup += getProductMarkup(product);
    }
    featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
}

/**
 * Функция назначает обработку клика на все кнопки "Add to cart".
 */
function addEventListenersForAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
}

/**
 * Функция-обработчик события клика по кнопке "Add to cart".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);
}

insertProductsIntoPage(products, featuredItemsEl);
addEventListenersForAddToCartButtons();
