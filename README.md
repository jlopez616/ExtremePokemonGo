**CMSI 185** Computer Programming, Fall 2016

# Assignment 1213
Alright, this is it—the culmination of your introduction to computer programming. The training wheels are off, you will need to look things up, and only a minimal amount of code has been written to get you started.

## Background Reading
- This assignment seeks to synthesize everything, so all material from Chapters 1 to 5 can potentially help with the work.
- Chapters 6 and 9 (up to Section 9.4) of the textbook provide additional and in-depth coverage of the new code included with this assignment. Section 9.4, specifically, provides additional information on the native drawing environment that you will now be using.
- Additional information on the `canvas` environment can be found in the Mozilla Developer Network site, particularly the [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) and the [`CanvasRenderingContext2D` reference](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).
- The starter code supplied here transitions you into the latest version of JavaScript, ES6. Key additions to ES6 are described in the starter code’s comments, as well as a link to http://es6-features.org, which summarizes all of the differences.

## Automated Feedback Setup
In order to connect your repository to our automated code review and feedback system, once you are up and running please send your repository’s URL to Ed Seim. You can either find him in person in the lab, tweet him at [https://twitter.com/SirSeim](https://twitter.com/SirSeim), or mention him in a GitHub comment (`SirSeim`). Once he has you hooked up, the system will provide feedback on code formatting and quality whenever you commit a new version to GitHub. _Points will be deducted if issues here linger in the final submission._

For this assignment, the feedback system also includes a rudimentary _unit test suite_ that checks the _correctness_ of the functions in your exercises. Not all results are checked; they are chosen just to ensure that your code is not insanely off-course. Grading will include additional test cases that are not checked by the automated system.

## For Submission
With a partner _other_ than the one from the startup/freestyle programming assignment, enhance the starter code in the repository into either a “catcher” or “shooter” game. The starter code is provided as a standalone web page which you can open directly in your web browser. It provides a _Start_ button that then triggers randomly-generated falling objects and a mouse-controlled “player” object at the bottom of the gaming area. A _Stop_ button halts the action. Modify/add to this code into a game of your own design.

### “Catcher” Game Option
A “catcher” game has the player intercepting the falling objects in some way. The more successful catches, the better. Implement different types of objects to catch, providing different score values and effects, such as power-ups. Provide at least one _combo catch_—something that requires catching at least two or more objects in order to register a score. Define some rule that affects the player negatively: e.g., letting a certain number of objects reach the ground, or perhaps missing a critical object to catch.

### “Shooter” Game Option
A “shooter” game has the player firing a projectile upward, with the goal of hitting a falling object. The more hits, the better. Implement different types of objects to hit, providing different score values and effects, such as power-ups. Define some rule that affects the player negatively: e.g., getting hit by an object, or perhaps letting a certain number of objects reach the ground.

### General Implementation Notes
This program calls forth every technique that you have learned this semester: different kinds of expressions and data types, conditionals, loops, functions, objects. Specifically, in both games, you will need to code for some type of “collision”—when does the player object touch another? When does a falling object hit the ground? What happens to the game data when certain occurrences take place?

The program also combines aspects of Khan Academy animations and JSFiddle-style web applications. Use HTML elements for display components such as scores, game state, player statistics, etc., and style them accordingly with CSS. Use the graphics features provided by the [`canvas` environment](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) for visuals.

You may modify most aspects of the starter code to fit your game design: object speed, number of objects, different types of objects, etc. There _are_ sections that are not meant to be changed, and those are duly marked. Leave them alone unless you really know what you’re doing. Once you have the basics down, feel free to enhance or embellish what you have.
