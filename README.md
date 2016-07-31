# GameFramework

A javascript framework to help experienced and unexperienced developers dive into game design. 

*Still under development*

## Installation

Clone the repo and that's it! Open up 'newGame.html' to view the demo.

## Making your own game.

+ The chief files are 'main.js', 'world.js', 'gameObject.js', and 'Entity.js/playerEntity.js'.

+ To start your own game, initialize game rules and objects inside the 'main.js' `init : function() {};`. This includes the world and all the entities that go along with it.

+ Begin by initializing the world and add any entites to that world. 
Create a `app.PlayerEntity(...);` that represents your 'player' and add a controller with death/remove conditions.   
Ex:   
`var entityPlayer = new app.PlayerEntity(x,y, 20, 'rgba(255,0,0,1)', 0, "moveable");`  
`entityPlayer.setController(new app.KeyboardController());`  
`entityPlayer.setRemoveCondition(function(){return false;});`  
`this.world.addEntity(entityPlayer);`  

+ Once the world is set up with desired entities and 'worldPhysics', create a new 'app.gameObject' to add the world.   
`this.gameObject = new app.GameObject();`  
`this.gameObject.setWorld(this.world);`   

+ The 'gameObject' holds game states and directs the flow of the game.  

+ Lastly, update and render the 'gameObject' to get the ball rolling *hehe*.  

# Good luck have fun!!!

