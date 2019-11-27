# OOP Order Checkout App

### Requirements

#### Requirement #1: Add OOP Logic

For this exercise you will be creating a `Checkout` class

It will have the following properties...

* `items`: **which should be start out as an empty array**

* `subtotal`: which should start out as `0`

It should have the following methods...

* `addItem(item)`:

  - accepts an `item` object as a parameter

  - this method adds a new item to the `items` property (remember this property should be an array)

  - Each `item` object should be structured as follows:

    ```
    {
      id: 1,
      name: 'something cool',
      price: '9.99',
      quantity: 1
    }
    ```


* `calculateSubtotal()`:

  - calculates and updates the `subtotal` property based on the items in the order


* `calculateTax()`:

  - calculates the sales tax based on the tax rate (8.875%) and the current `subtotal`


* `calculateTotal()`:

  - calculates the total amount based on the sales tax and the current `subtotal`


* `incrementQuantity(itemId)`:

  - accepts an `itemId` as the parameter

  - this method should take the `itemId` and use it to find the item in the `items` (array) property that matches `itemId`; after which, it will increment the quantity of the matched item by 1


* `decrementQuantity(itemId)`:

  - which accepts an `itemId` as the parameter

  - this method should take the `itemId` and use it to find the item in the `items` (array) property that matches `itemId`; after which, it will decrement the quantity of the matched item by 1


* `removeItem(itemId)`:

  - accepts an `itemId` as the parameter

  - this method should take the 'itemId' and use it to find the item in the `items` (array) property that matches `itemId`; after which, it will remove the matched item from the `items` property


Tip: Use console.log() as a means of testing to ensure all of your OOP logic works before moving on to Requirement #2

#### Requirement #2: Wire up the UI logic

Combine the OOP logic from Requirement #1 with the existing UI code to "wire up" the application (i.e. make the application fully functional).

This will require reviewing the existing UI code and understanding how it works.

Any changes made the UI should also be reflected in your OOP logic. For example, when a users adds a new item from the UI, that new item should be also be "added" to the instance of the `Checkout` class via the `addItem(item)` method

Tip: use the `generateRandomId()` function to generate a random id when adding a new item from the UI
