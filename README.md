# React Siri

## Open Source
* Add your components and trigger a response using triggerKeys!

## Current Issues
1. Is the structure of the project correct? Could / Should it be done another way? 
- Currently App handles the voice input then runs through a if else to match against pretermined command / trigger keys then updates state to run another function in components list. 
2. App.js `commandTrigger()` function - better to use case?
3. In both components Question and Youtube the `componentDidUpdate()` function sometimes runs into a loop meaning I have to set an external variable and check against it. This seems illogical 

## Future Features
* Output / Feedback as a global object
* Conditional Rendering - https://reactjs.org/docs/conditional-rendering.html