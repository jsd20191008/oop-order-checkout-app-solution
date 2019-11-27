$(function () {
  $('#add-item').submit(function (event) {
    event.preventDefault()

    const newItemName = $('#new-item-name').val()
    const newItemPrice = $('#new-item-price').val()
    console.log(newItemName)
    console.log(newItemPrice)

    // clear out the input field
    $('#new-item-name').val('')
    $('#new-item-price').val('')

    addNewItem(newItemName, newItemPrice)
  })

  // -------- **Add New Item** ---------

  function addNewItem (newItemName, newItemPrice) {
    // add new lineItem to Checkout class
    const newItemId = generateRandomId()

    /* OOP logic */
    checkout.addItem({
      id: newItemId,
      name: newItemName,
      price: parseFloat(newItemPrice),
      quantity: 1
    })

    const newItemHtml = buildItemHtml(newItemId, newItemName, newItemPrice)

    $('.table tbody').append(newItemHtml)
    displaySummary()
  }

  // -------- **INCREMENT / DECREMENT** ---------

  // The listeners below are using jQuery's .on() method
  // and attaching event listeners to the <body>
  // which allows us to listen to events for
  // elements that are dynamically added
  // after the initial page load

  // listen for click event on the "increment" button
  $('body').on('click', '.item button.increment', function () {
    const itemId = $(this).parent().parent().data('id')

    console.log(itemId)

    const itemQty = parseFloat($(this).parent().parent().find('.qty-col').text())

    console.log(itemQty)

    /* OOP logic */
    checkout.incrementQuantity(itemId)

    let updatedQty = itemQty + 1
    $(this).parent().parent().find('.qty-col').text(updatedQty)

    displaySummary()
  })

  // listen for click event on the "increment" button
  $('body').on('click', '.item button.decrement', function () {
    const itemId = $(this).parent().parent().data('id')

    console.log(itemId)
    const itemQty = parseFloat($(this).parent().parent().find('.qty-col').text())

    console.log(itemQty)

    /* OOP logic */
    checkout.decrementQuantity(itemId)

    let updatedQty = itemQty - 1
    $(this).parent().parent().find('.qty-col').text(updatedQty)

    displaySummary()
  })

  // -------- **Remove Item** ---------

  $('body').on('click', '.item button.remove', function () {
    const itemId = $(this).parent().parent().data('id')

    /* OOP logic */
    checkout.removeItem(itemId)

    $(this).parent().parent().remove()
    displaySummary()
  })

  // -------- Utility Functions ---------

  // html template for an item
  function buildItemHtml (itemId, itemName, itemPrice) {
    return (
      `
      <tr class="item" data-id="${itemId}">

        <td class='name-col'>${itemName}</td>
        <td class='price-col'>${itemPrice}</td>
        <td class='qty-col'>1</td>
        <td class='actions'>
          <button class='increment btn btn-secondary'>+</button>
          <button class='decrement btn btn-secondary'>-</button>
          <button class='remove btn btn-danger'>remove</button>
        </td>
      </tr>
      `
    )
  }

  function generateRandomId () {
    return Math.floor(Math.random() * 1000) + 1
  }

  function displaySummary () {
    const subtotal = checkout.subtotal
    const tax = checkout.calculateTax()
    const total = checkout.calculateTotal()

    console.log(subtotal)
    console.log(tax)
    console.log(total)

    $('#subtotal .summary-value').text(subtotal.toFixed(2))
    $('#tax .summary-value').text(tax.toFixed(2))
    $('#total .summary-value').text(total.toFixed(2))
  }

  // -------- OOP Logic (classes) ---------

  class Checkout {
    constructor () {
      this._items = []
      this._subtotal = 0
    }

    get subtotal () {
      return this._subtotal
    }

    addItem (item) {
      this._items.push(item)

      this.calculateSubtotal()
    }

    calculateSubtotal () {
      const newSubtotal = this._items.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseInt(item.quantity))
      }, 0)

      this._subtotal = newSubtotal
    }

    calculateTax () {
      return this._subtotal * 0.08875
    }

    calculateTotal () {
      return this.calculateTax() + this._subtotal
    }

    incrementQuantity (itemId) {
      const foundItem = this._items.find((item) => {
        return item.id === itemId
      })

      foundItem.quantity++

      this.calculateSubtotal()
    }

    decrementQuantity (itemId) {
      const foundItem = this._items.find((item) => {
        return item.id === itemId
      })

      foundItem.quantity--

      this.calculateSubtotal()
    }

    removeItem (itemId) {
      // find the index (in the _items) array of the item to be removed
      const removedItemIndex = this._items.findIndex((item) => {
        return item.id === itemId
      })

      // use splice() to remove the item matching that index
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

      this._items.splice(removedItemIndex, 1)

      this.calculateSubtotal()
    }
  }

  const checkout = new Checkout()
  displaySummary()

  /* Testing OOP logic */

  // checkout.addItem({
  //   id: 1,
  //   name: 'something cool',
  //   price: '9.99',
  //   quantity: 2
  // })
  //
  // checkout.addItem({
  //   id: 2,
  //   name: 'something else',
  //   price: '9.99',
  //   quantity: 3
  // })
  //
  // console.log(checkout)
  // checkout.calculateSubtotal()
  // console.log(checkout.calculateTax())
  // console.log(checkout.calculateTotal())
  // console.log(checkout)
  // checkout.incrementQuantity(2)
  // console.log(checkout)
  // checkout.decrementQuantity(1)
  // checkout.decrementQuantity(1)
  // console.log(checkout)
  // checkout.removeItem(1)
  // console.log(checkout)

  // -------- end of OOP Logic (Classes) ---------
})
