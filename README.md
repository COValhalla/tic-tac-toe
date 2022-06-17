# tic-tac-toe

Lessons learned:
- Can add a "once" boolean value to remove event listener after first click


Game Logic:
- Initilization
    - Enter Players name
    - Select Computer Play, if applicable
    - Set up Player objects using factory function
    - Add event listener to page

- Play game
    - Player select block, block position stored in Player object
    - Player block positions evaluted for "win", if success announce winner and removme all event listeners