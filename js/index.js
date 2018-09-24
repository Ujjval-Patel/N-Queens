// Maked by Nguyen Pham
/**
* @param arrChess : chứa những quân hậu đạt điều kiện
* @param arrCross : chứa giá trị đưòng chéo chính của các quân hậu
* @param arrCross1 : chứa giá trị đưòng chéo phụ của các quân hậu
* @param total_solutions : chứa tối đa tất cả các solutions có thể tìm đuợc  
*/
// N-Queens Problem

var queenposition = [];
 var N;
var columnsum = [];
var upperdiagonalsum= [];
var lowerdiagonalsum=[];
var store=[];

function Initialization() {
 var i=0;
	var j=0;
	for(i=0; i<2*N-1; i++) {
    	if(i<N) {
        	columnsum[i]=0;
    	}
    	upperdiagonalsum[i]=lowerdiagonalsum[i]=0;
	}
	var minimumconflictcolumns= [];
	var minconflicts=Infinity;
	var temp;
	queenposition[0] =Math.round((Math.random()*N)) % N;
	columnsum[queenposition[0]] += 1;
	upperdiagonalsum[queenposition[0]+0] += 1;
	lowerdiagonalsum[(N-queenposition[0])+0-1] += 1;
 
	// i=row index
	for(i=1; i<N; i++) {
 	 
    	minimumconflictcolumns = [];
    	minconflicts = Infinity;
    	// j=col index
    	for( j=0; j<N; j++) {
        	temp = ((columnsum[j]+1)*columnsum[j])/2;
        	temp += ((upperdiagonalsum[j+i]+1)*upperdiagonalsum[j+i])/2;
        	temp += ((lowerdiagonalsum[(N-j)+i-1]+1)*lowerdiagonalsum[(N-j)+i-1])/2;
 
        	if(temp < minconflicts) {
            	minconflicts=temp;
        	 
            	minimumconflictcolumns = [];
           	 
            	minimumconflictcolumns.push(j);
        	} else if(temp == minconflicts) {
            	minimumconflictcolumns.push(j);
        	}
    	}
    	queenposition[i] = minimumconflictcolumns[Math.round((Math.random()*N))%minimumconflictcolumns.length];
 
    	columnsum[queenposition[i]] += 1;
    	upperdiagonalsum[queenposition[i]+i] += 1;
    	lowerdiagonalsum[(N-queenposition[i])+i-1] += 1;
	}
 
 
}

function getconflicts(excludeRow) {
	var conflicts=0;
 
	for(var i=0; i<2*N-1; i++) {
    	if(i<N) {
        	columnsum[i]=0;
    	}
    	upperdiagonalsum[i]=lowerdiagonalsum[i]=0;
	}
 
	for( i=0; i<N; i++) {
    	if(i != excludeRow) {
        	columnsum[queenposition[i]] += 1;
        	upperdiagonalsum[queenposition[i]+i] += 1;
        	lowerdiagonalsum[(N-queenposition[i])+i-1] += 1;
    	}
	}
 
	for( i=0; i<2*N-1; i++) {
    	if(i<N) {
        	conflicts += ((columnsum[i]-1)*columnsum[i])/2;
    	}
    	conflicts += ((upperdiagonalsum[i]-1)*upperdiagonalsum[i])/2;
    	conflicts += ((lowerdiagonalsum[i]-1)*lowerdiagonalsum[i])/2;
	}
	return conflicts;
}


function Print() {
var i=0;    
for(i=0;i<N;i++)
store[i]=[];
    

var i=0,j=0,k=0;


   for(i=0; i<N; i++) {
  	 
   	for(j=0; j<queenposition[i]; j++) {
   	 
       	store[i][j]=0;
    	 
   	}
   	store[i][j]=1;
 	 
 	j++;
   	for(k=j; k<N; k++) {
     	 
       	store[i][k]=0;
     	 
   	}
 	 
   }
   
}

function MaximumConflicts() {
	var rowconflicts=0;
	var temp=0;
   
	var maxrowsconflict = [];
	var i=0;
	for(i=0; i<N; i++) {
    	temp = ((columnsum[queenposition[i]]-1)*columnsum[queenposition[i]])/2;
    	temp += ((upperdiagonalsum[queenposition[i]+i]-1)*upperdiagonalsum[queenposition[i]+i])/2;
   	temp += ((lowerdiagonalsum[(N-queenposition[i])+i-1]-1)*lowerdiagonalsum[(N-queenposition[i])+i-1])/2;
 
    	if(temp > rowconflicts) {
        	rowconflicts=temp;
        	maxrowsconflict = [];
      	 
        	maxrowsconflict.push(i);
    	} else if(temp == rowconflicts) {
        	maxrowsconflict.push(i);
    	}
	}
	return maxrowsconflict[Math.round((Math.random()*N))%maxrowsconflict.length];
}

function minimumconflicts() {
	var highestrowconflict = MaximumConflicts();
 
	var minconflicts=Infinity;
	var temp=0;
	// min conflicts cols for queen
   
	var minimumconflictcolumns = [];
	//Print();
	getconflicts(highestrowconflict);
 var i=0;
	// i=column index
	for( i=0; i<N; i++) {
   	temp = ((columnsum[i]+1)*columnsum[i])/2;
	temp += ((upperdiagonalsum[i+highestrowconflict]+1)*upperdiagonalsum[i+highestrowconflict])/2;
    	temp += ((lowerdiagonalsum[(N-i)+highestrowconflict-1]+1)*lowerdiagonalsum[(N-i)+highestrowconflict-1])/2;
 
    	if(temp < minconflicts) {
        	minconflicts=temp;
      	 
         	minimumconflictcolumns = [];
        	minimumconflictcolumns.push(i);
    	} else if(temp == minconflicts) {
        	minimumconflictcolumns.push(i);
    	}
	}
  queenposition[highestrowconflict]=minimumconflictcolumns[Math.round((Math.random()*N))%minimumconflictcolumns.length];
}



/***
* @param pieces : Object queen chess
* @param s : Snap Object
* @param rwidth : chiều dài hình vuông
* @param total_solutions : chiều cao hình vuông
*/
// Draw Chess Table
var pieces = {
    	TEAM_QUEEN :{name: "Black Queen",code: "\u265B"},
	},
	s = Snap("#mysvg"),
	rwidth = 60,
	rheight = 60;


//default chess table
function drawChess(){
  var y = 0;
for(var row = 0 ; row < N;row++){
  var x = 0;
  for(var col = 0; col < N;col++){
	var r = s.rect(x,y,rwidth,rheight);
	// nếu có solutions thì vẽ quân hậu, không thì để bàn cờ trống
	//if(num_solutions){
  	if(store[row][col]==1){
    	var chess = s.text(x + rwidth/2,y + (rheight/2 + rwidth/4),pieces.TEAM_QUEEN.code);
    	chess.attr({
      	'font-size' : rwidth/2 +rwidth/3,
      	'text-anchor' : 'middle',
      	'fill' : 'orange'
    	});
  	}  
    
	//fill color chess table
	if((row % 2 == 0 && col % 2 == 0) || (row % 2 != 0 && col % 2 != 0)){
    	r.attr({
      	fill: "white"
    	});
  	}
  	x += rwidth;
	}
	y += rheight;
  }  
}


function clear(){
	s.clear();
	queenposition = [];
 //var N;
 columnsum = [];
 upperdiagonalsum= [];
 lowerdiagonalsum=[];
 store=[];
}

//start app
function runner(num){
  N = num;
  clear();

 
  Initialization();
	var i=0;
 
	var preconflicts = getconflicts();
   
	var currentconflicts;
 
 
	var count = 0;
	var steps = 0;
 
   
 
    
    	while(preconflicts != 0)	{
			console.log('Testing console');
		minimumconflicts();
		steps++;
    	currentconflicts = getconflicts();
    	if(preconflicts == currentconflicts) {
        	count++;
        	if(count>1) {
            	queenposition[Math.round((Math.random()*N))%N] = Math.round((Math.random()*N))%N;
            	count = 0;
			}
			
    	}
    	preconflicts = currentconflicts;
	}
  $("#mysolve").text("Number of Steps to solve : " + steps);
  Print();
  drawChess();
}

$("#btnChess").click(function(){
	let num = $("#inputNum").val();
	$("#mysolve").text("");
	$("#status").text("");
	if(!num){
    	$("#status").text("Enter number of cell");
    	return;
	}
	else if(num==2 || num==3)
	{
		$("#status").text("No solutions possible!");
    		return;
	}
	else if(num > 1000){
    	$("#status").text("Input < 10");
    	return;
	}
	runner(num);
});


