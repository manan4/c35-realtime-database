var ball;

//step1
var database;
var position;

function setup(){
    createCanvas(500,500);

    //step2 - namespacing or nickname
    database = firebase.database();

    //step 3 - how to read 
    //.on("value",function if data is found, function if data not found)
    //database.ref("ball/position").on("value",readPosition, showError)

    var ballRef = database.ref("ball/position");
    ballRef.on("value",readPosition,showError)
    

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    position = data.val(); //data is stored in JSON format
//    console.log(position.y)
    ball.x = position.x;
    ball.y = position.y;
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y
    })
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;
}

function showError(){
    console.log('no data found')
}