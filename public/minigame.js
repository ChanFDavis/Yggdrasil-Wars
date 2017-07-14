var rand;
var success;
var passed;
var randomletter;

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setRandomLetter(){



	rand = getRandomIntInclusive(1,26);


	switch(rand){
		case 1:
		return 'b';
		case 2:
		return 'b';
		case 3:
		return 'c';
		case 4:
		return 'c';
		case 5:
		return 'f';
		case 6:
		return 'f';
		case 7:
		return 'g';
		case 8:
		return 'h';
		case 9:
		return 'i';
		case 10:
		return 'j';
		case 11:
		return 'k';
		case 12:
		return 'l';
		case 13:
		return 'm';
		case 14:
		return 'n';
		case 15:
		return 'o';
		case 16:
		return 'o';
		case 17:
		return 'q';
		case 18:
		return 'r';
		case 19:
		return 'r';
		case 20:
		return 't';
		case 21:
		return 'u';
		case 22:
		return 'v';
		case 23:
		return 'v';
		case 24:	
		return 'x';
		case 25:
		return 'z';
		case 26:
		return 'z';


	}

}

