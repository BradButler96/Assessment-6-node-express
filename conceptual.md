### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
	- Callbacks, promises, async/await

- What is a Promise?
	- A promise is the value returned when an async function is performed. Since the response is not known until it is fulfilled the promise is basically a placeholder until the value is returned.

- What are the differences between an async function and a regular function?
	- Regular functions return whatever value is specified with essentially no wait time. An async function returns a promise that will return a value when the promise is fulfilled. If you have a series of regular functions JavaScript will run them chronologically and return the value before moving on to the next function. If you have a series of async functions they will run chronologically but will return a promise then move to the next function and return the desired value once the promise is fulfilled, which could be after the next function or functions have been run. To avoid that from happening we will typically use .then() or await.

- What is the difference between Node.js and Express.js?
	- Express is a framework built on top of Node.js. Express makes managing app development faster and easier but node is more robust and better for large scale apps

- What is the error-first callback pattern?
	- In error-first callbacks the first argument of the callback function is the error and the second argument is reserved for successful data returned from the callback function.
	
- What is middleware?
	- It is a function that runs in between the request and response 

- What does the `next` function do?
	- Next executes the middleware follow the current on being executed

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
	- The individual requests being made do not rely on each other so they could all be performed at the same time, then once they have all been completed the array can be returned. This would be faster than waiting for each one to complete before moving to the next one. It would also be better to create a fuction that takes a name and username as arguments then performs the request and returns the desired info rather than hard-coding each individual request.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
