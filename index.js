
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20

if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
(rockLeftEdge <= dodgerRightEdge && rockRightEdge <= dodgerRightEdge) ||
(rockLeftEdge >= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge))
{
  return true;
}
  }
}

    function createRock(x) {
      const rock = document.createElement('div')

      rock.className = 'rock'
      rock.style.left = `${x}px`

      var top = 0

      rock.style.top = top

      GAME.appendChild(rock)
    /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`

    if (checkCollision(rock)) {
  return endGame()
}
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
if (top < GAME_HEIGHT) {
  window.requestAnimationFrame(moveRock) }
    else {
       rock.remove()
  }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
}
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)

  ROCKS.forEach(function (rock) {rock.remove() })

  windowRemoveEventListener('keydown', moveDodger)

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'

  return alert ('YOU LOSE!')
}


function moveDodger(e) {
   const code = e.which

   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
     e.preventDefault()
     e.stopPropagation()
   }

   if (code === LEFT_ARROW) {
     moveDodgerLeft()
   } else if (code === RIGHT_ARROW) {
     moveDodgerRight()
   }
 }

  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  function moveDodgerLeft() {
     window.requestAnimationFrame(function() {
       const left = positionToInteger(DODGER.style.left)

       if (left > 0) {
         DODGER.style.left = `${left - 4}px`
       }
     })
   }
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
function moveDodgerRight() {
  window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)

     if (left < 360) {
       DODGER.style.left = `${left + 4}px`
    }
   })
 }
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
