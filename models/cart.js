// models/cart.js

class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }

    addProduct(product, quantity, size = null) {
        // Ensure quantity is a number
        quantity = parseInt(quantity, 10);
        if (isNaN(quantity) || quantity <= 0) {
            quantity = 1; // Default to 1 if invalid
        }

        let existingProductEntryIndex = -1;
        if (size) {
            existingProductEntryIndex = this.products.findIndex(
                (p) => p.item.id === product.id && p.size === size
            );
        } else {
            // For products without specific size variants, just match by ID
            existingProductEntryIndex = this.products.findIndex(
                (p) => p.item.id === product.id && p.size === null
            );
        }

        const productPrice = parseFloat(product.price.replace('R$', '').replace(',', '.'));

        if (existingProductEntryIndex >= 0) {
            const existingProductEntry = this.products[existingProductEntryIndex];
            this.totalPrice -= productPrice * existingProductEntry.quantity; // Subtract old total for this item
            existingProductEntry.quantity += quantity;
            this.products[existingProductEntryIndex] = existingProductEntry; // Update the product in the array
            this.totalPrice += productPrice * existingProductEntry.quantity; // Add new total for this item
        } else {
            this.products.push({ item: { ...product }, quantity: quantity, size: size });
            this.totalPrice += productPrice * quantity;
        }
    }

    getCart() {
        return { products: this.products, totalPrice: this.totalPrice };
    }

    deleteProduct(productId, size = null) {
        let productToDeleteIndex = -1;
        if (size) {
            productToDeleteIndex = this.products.findIndex(
                (p) => p.item.id === productId && p.size === size
            );
        } else {
            productToDeleteIndex = this.products.findIndex(
                (p) => p.item.id === productId && p.size === null
            );
        }


        if (productToDeleteIndex >= 0) {
            const productToDelete = this.products[productToDeleteIndex];
            const productPrice = parseFloat(productToDelete.item.price.replace('R$', '').replace(',', '.'));

            this.totalPrice -= productPrice * productToDelete.quantity;
            this.products.splice(productToDeleteIndex, 1);
        }
    }

    updateProductQuantity(productId, size = null, newQuantity) {
        newQuantity = parseInt(newQuantity, 10);
        if (isNaN(newQuantity) || newQuantity < 0) {
            return; // Invalid quantity
        }

        if (newQuantity === 0) {
            this.deleteProduct(productId, size);
            return;
        }

        let productToUpdateIndex = -1;
        if (size) {
            productToUpdateIndex = this.products.findIndex(
                (p) => p.item.id === productId && p.size === size
            );
        } else {
            productToUpdateIndex = this.products.findIndex(
                (p) => p.item.id === productId && p.size === null
            );
        }

        if (productToUpdateIndex >= 0) {
            const productToUpdate = this.products[productToUpdateIndex];
            const currentQuantity = productToUpdate.quantity;
            const productPrice = parseFloat(productToUpdate.item.price.replace('R$', '').replace(',', '.'));

            const priceDifference = (newQuantity - currentQuantity) * productPrice;
            this.totalPrice += priceDifference;
            productToUpdate.quantity = newQuantity;
            this.products[productToUpdateIndex] = productToUpdate;
        }
    }
}

module.exports = Cart;