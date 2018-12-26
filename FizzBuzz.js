function fizzBuzz(num){
	for(let i = 1; i <- num; i++){
		if(i % 3 === 0 && i % 5 === 0) console.log("Fizz Buzz");
		else if(i % 3 === 0 ) console.log("Fizz");
		else if(i % 5 === 0 ) console.log("Buzz");
		else console.log(i);
	}
}
fizzBuzz(20)

function fizzBuzz(){
	for(var i=1;i<=100;i++){
		if(i%5 === 0 && i%3 === 0){
			print('FizzBuzz');
		} else if(i%3 === 0){
			print('Fizz');
		} else if(i%5 === 0){
			print('Buzz');
		} else {
			print(i);
		}
	}
}

function fizzBuzz(){
	for(var i=1;i<=100;i++){
		if(i%3 === 0){
			print('Fizz');
		} 
		if(i%5 === 0){
			print('Buzz');
		} 
		if(i%3 !== 0 && i%5 !== 0) {
			print(i);
		}
	}
}

function fizzBuzz(){
	var output;
	for(var i=1;i<=100;i++){
		output = '';
		if(i%3 === 0){
			output+='Fizz';
		} 
		if(i%5 === 0){
			output+='Buzz';
		} 
		if(i%3 !== 0 && i%5 !== 0) {
			output+=i;
		}
		print(output);
	}
}

function fizzBuzz(){
	var output;
	for(var i=1;i<=100;i++){
		output = '';
		if(i%3 === 0){
			output+='Fizz';
		} 
		if(i%5 === 0){
			output+='Buzz';
		} 
		if(output === '') {
			output+=i;
		}
		print(output);
	}
}