# Calendar Task

I'm happy with how this turned out, but there is room for improvement. 

## What would I change?

Given more time, there's a few major and minor things I would:

- Place code into components. `App.js` is a little bloated, especially it's stylesheet.
- Consider using the native `<dialog>` element instead of a regular div. 
- Improve the animations. I intended to have a nice hover animation on the button, but I couldn't do it within the timeframe. The animations used to bring the calendar in are also quite basic. 
- Disable past dates. It doesn't make sense that the user can select dates _in the past_. I would disable these, too. 
- Make code more readable. Although it works, some of the logic I've wrote for the calendar isn't clear. I'd refactor this to make it more understandable.
- Resolve the various 'ToDos' I've left littered in the code. 
