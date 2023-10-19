/*jshint esversion: 11 */
/*jshint esversion: 6 */

let cardsMatched = [];
let starCounter = 0;

let increaseStar1 = true;

let timerActivate = true;

let moves = document.getElementsByClassName('moves');

let stars1Counter = document.querySelector('span.starCounter');

let stars = document.getElementsByClassName('star');

let match = 0;

// select back of cards
let backOfCardsImg = document.querySelectorAll('.card-back');

// As querySelectorAll returns an array I'd to loop through them
function turnBackOfCardsPurple(){
	for (i=0;i<backOfCardsImg.length;i++){
		backOfCardsImg[i].style.backgroundColor ='rgb(68 33 224)';
		backOfCardsImg[i].src = "./assets/images/readme-images2/compressed-images/mickey-mouse-background-Purple.jpg";

	}			
}

/* Store all memory card elements in a cards variable. 
This is where the function will reach to when looking for cards to flip. The 
querySelectorAll function returns all the elements from the memory-card document.
 Memory card is the class that contains all the
card elements here*/

const cards = document.querySelectorAll('.memory-card');

/*Storing cards: when a card is flipped one needs to know if it's the back or 
front of the card, so the matching logic can then be activated  */

let hasFlippedCard = false;

/*If one tries to flip a second set of cards before the first set 
has finished unflipping, then the logic doesn't work. The board needs
 to be 'locked' or to 'wait' until the cards finish unflipping */

let lockBoard = false;

// variables below store whether card has been flipped or not
let firstCard, secondCard;

// front of cards after a match
let firstCardFrontAfterMatch, secondCardFrontAfterMatch;

/* The this keyword in the firstCardFlip function represents the memory-card class. Memory card 
is stored in this. Thats because this represents the element that activated it.
*/

moves = 0;
let counter = document.querySelector(".counter"); // MOVES COUNTER

let clickCard = document.getElementsByTagName('h3');

let startTimerCounter = false;

let movesCounter;

// Card Flip


let hardModeFirstCardFlip = function(){
	/**startMoves needs to be false for hardmode counter to decline */
	
	if(startMoves && !startTimerCounter && moves == 30){

		startMoves = false;
	}
};


 let cardToUnflip; 

 let timerCounterContainer = document.querySelector('.timer-counter-container');

//  timer counter stars only show when first card clicked
function addVisibility(){
	timerCounterContainer.style.visibility = 'visible';
}

function firstCardFlip() {
	// startTimer function adapted so it only runs once to stop time speeding up on every card click
	cardToUnflip = document.getElementsByClassName('flip');
	hardModeFirstCardFlip();
	cardToUnflip = this;
	addVisibility();

	// so the info stays centered when first card clicked
	// timerCounterContainer[0].style.bottom = '0';
	
	startTimerCounter = true;
	
	movesCounter = true;

	if(timerActivate){
		startClock();
	}
	
	clickCard[0].classList.remove('cardShake');
	clickCard[0].classList.add('after');

	// if the same card is clicked twice the moves counter doesn't increase
	if (this != firstCard && this !=secondCard) {
		moveC();
		//this hear is the class of the first card clicked
	}
	// Alternative option for hard mode
	if (this != firstCard && this !=secondCard && !startMoves) {
		startMovesCountdown();
	}

	// if lockBoard is true the rest of the function won't get executed
	if (lockBoard) return;	

	/*If the first card is clicked twice then the eventlistener is removed
	and the card will remain unflipped, as if it was correctly matched. If it's
	the first card click the this variable holds the first card but the condition
	is unset so it's going to move to false. If it is the second click then the second
	div holds the second card.*/

	if (this === firstCard) return;

	

	/* Access the class list of the memory card. Add here means if 
	the class is not there add it. */
	this.classList.add('flip');
	

	if (!hasFlippedCard) {
		/*if hasFlippedCard is false this means its the first time this card has been clicked
		so then one can proceed to put has flippedcard to true, as the card had to be
		false first before one can state it's now true*/
		hasFlippedCard = true;
		//   The element that has activated the event is the memory-card(this)
		firstCard = this;
		/*A test with  console.log({ hasFlippedCard, firstCard }); now gives 
		{hasFlippedCard: true, firstCard: div.memory-card.flip} this shows when card
		is clicked hasFlippedCard is now true & the element that the card has flipped is stored in firstCard.
		By accessing the variable firstCard now; one knows if the card has been flipped. When
		another card is now flipped, as hasFlippedCard is now true, the if statement with !hasFlippedCard
		is no longer activated */

		/* if the hasFlippedCard is true the return statement stops the function here. If
		it is true it will move on to the hasFlippedCard = false clause */
		return;

	}
	/* if hasFlipped Card is set to true it means that the player is clicking on the second card.
	    Using this the element here is now stored in the secondCard variable. When the second card
	    is now clicked the following is returned: {hasFlippedCard: false, secondCard: div.memory-card.flip
	 */
	{
		hasFlippedCard = false;
		secondCard = this;

		checkForMatch();

	}
}
let audio = document.getElementsByClassName('dingSound')[0];
let myPlayDing = function(){
			
	audio.play();
};

/**
 * A function for the matching logic. 
 * One now needs to check if the first and second cards match? 
        The data attribute will be used which allows one to add any information
        to an element. In order to access the data attribute defined in html (data-framework)
        one uses the dataset object. console.log(firstCard.dataset.framework); logs the name
        of the first card now selected. The same goes for the second card.
 */
function checkForMatch() {
	
	/*  If the first and second cards are the same then the eventListener will be removed
  from these cards to prevent them from being clicked again. If they're not the same
  then the cards will be unflipped back to their original state.  /*If the cards don't match then they need to be unflipped. To do this the 
        flip class is removed. As this occurs so quickly a setTimeout function is used
        so one can see the second card before it flips back */

	// ternary operator used here for simplicity
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	
	/* if there are 6 matches this means the player has won. 
	a variable for match was set to zero and when this reached
	6 then the won function is activated */

	let cardsRemainUnflipped = function(){
		firstCardFrontAfterMatch[1].classList.add('front1');
		secondCardFrontAfterMatch[1].classList.add('front1');
	};
	
	firstCardFrontAfterMatch = firstCard.getElementsByTagName('img');
	secondCardFrontAfterMatch = secondCard.getElementsByTagName('img');

	if (isMatch) {
		
		disableCards();
		
		//push 1st & 2nd matched card into an array so they can be manipulated
		cardsMatched.push(firstCardFrontAfterMatch, secondCardFrontAfterMatch);
		
			//    cards now remain flipped after animation
			cardsRemainUnflipped();
			
		match++;

		} else {
		
		// count no. of clicks that don't result in a mat
		incrementCounter();
		unFlipCards();
	}
	
	// script for sounds

	let myPlayMickey = function(){
		
		lockBoard = true;
			
		let audio = document.getElementsByClassName('mickeyMouseSound')[0];
			
			audio.play();
			setTimeout(() =>{
				lockBoard = false;
					},3000);
		};
	
		// Mickey Mouse Sound Clip Plays when two Mickey Mouse Cards Match
	if(isMatch && firstCard.dataset.framework === 'micky-mouse' && !lockBoard){
		// code for myplay function adapted from computeshorts
		
		myPlayMickey();
		cardsStartToShake();
		makeBackOfCardsInvisible();
	}

		// Donald Duck Sound Clip Plays when two Donald Duck Cards Match

		let myPlayDonald = function(){
			
			lockBoard = true;
				
			let audio = document.getElementsByClassName('donaldDuckSound')[0];

				audio.play();
				setTimeout(() =>{
					lockBoard = false;
						},2000);

		};

		if(isMatch && firstCard.dataset.framework === 'donald-duck' && !lockBoard){
			// code for myplay function adapted from computeshort
				myPlayDonald();
				cardsStartToShake();
				makeBackOfCardsInvisible();
		}

			// Daisy Duck Sound Clip Plays when two Daisy Duck Cards Match

			let myPlayDaisy = function(){
				lockBoard = true;
					
				let audio = document.getElementsByClassName('daisyDuckSound')[0];
				audio.play();
				setTimeout(() =>{
					lockBoard = false;
						},1000);
			};

			if(isMatch && firstCard.dataset.framework === 'daisy-duck' && !lockBoard){
				// code for myplay function adapted from computeshorts
				myPlayDaisy();
				cardsStartToShake();
				makeBackOfCardsInvisible();
			}

				let myPlayPete = function(){
					let audio = document.getElementsByClassName('peteSound')[0];
					audio.play();	
					setTimeout(() =>{
						lockBoard = false;
							},1000);	
				};

				// Pete Sound Clip Plays when two Pete Cards Match
				if(isMatch && firstCard.dataset.framework === 'pete' && !lockBoard){
					// code for myplay function adapted from computeshorts
					myPlayPete();
					cardsStartToShake();
					makeBackOfCardsInvisible();
				}

				// Goofy Sound Clip Plays when two Goofy Cards Match
				let myPlayGoofy = function(){
					let audio = document.getElementsByClassName('goofySound')[0];
					audio.play();
					setTimeout(() =>{
						lockBoard = false;
							},1000);
				};

				if(isMatch && firstCard.dataset.framework === 'pluto' && !lockBoard){
					// code for myplay function adapted from computeshorts
					myPlayGoofy();
					cardsStartToShake();
					makeBackOfCardsInvisible();
				}
	
				let myPlayMinnie = function(){
					lockBoard = true;
						
					let audio = document.getElementsByClassName('minnieSound')[0];
					
					audio.play();
						setTimeout(() =>{
						lockBoard = false;
							},3000);
				};
				// Minnie Sound Clip Plays when two Minnie Cards Match
				if(isMatch && firstCard.dataset.framework === 'minnie-mouse' && !lockBoard){
					// code for myplay function adapted from computeshorts
					myPlayMinnie();
					cardsStartToShake();
					makeBackOfCardsInvisible();
				}

	// The settimeout function is used here so the final card can show before the you won message appears
	setTimeout(() => {
		
		if (match === 6) {
		
				document.querySelector('div.congratsCounter').textContent = "Took you " + counter.innerHTML + ' moves';
				document.querySelector('div.congratsTimer').textContent = " " + timer.textContent + ' seconds';
				openCongratsModalPopup();
			}
		}, 2500);

	// if you guess 2 matches in less than 10 moves you get a star

	if (match === 2 && moves <= 20 && timer.textContent <= 30) {
			
		// removing the 'dimmed' star introduces the 'lit-up' star
		stars[0].classList.remove('dimmed');
		if(increaseStar1){
			increaseStars();
			oneStarGo();

				myPlayDing();
			// increase star is set to false so a star is only added once to the counter until 4 matches are made
			increaseStar1 = false;
		}
	}

	//for hard mode
	if (btn.style.left == 'var(--fs-xxl)' && match === 2 && moves <= 20 && timer.textContent > 30) {
		// removing the 'dimmed' star introduces the 'lit-up' star
		stars[0].classList.remove('dimmed');
		if(increaseStar1){
			increaseStars();
			oneStarGo();

				myPlayDing();
			// increase star is set to false so a star is only added once to the counter until 4 matches are made
			increaseStar1 = false;
		}
	}

	// if you guess 4 matches in less than 25 moves you get another star

	if (match === 4 && moves <= 30 && timer.textContent <= 45 && starCounter === 1) {
		stars[1].classList.remove('dimmed');
		secondStarGo();
		if(!(starCounter = 2)){
			increaseStar1 = true;
		}
		if(increaseStar1){
			increaseStars();
		
			increaseStar1 = false;
		}
		
		
			myPlayDing();
	}

	//for hard mode
	if (btn.style.left == 'var(--fs-xxl)' && match === 4 && moves <= 20 && timer.textContent > 15) {
	
		// removing the 'dimmed' star introduces the 'lit-up' star
		stars[0].classList.remove('dimmed');
		if(increaseStar1){
			increaseStars();
			oneStarGo();

				myPlayDing();
			// increase star is set to false so a star is only added once to the counter until 4 matches are made
			increaseStar1 = false;
		}
	}

	// if you guess 6 matches in less than 30 moves you get 3 stars: max score

	if (match === 6 && moves <= 30 && timer.textContent <= 60 && starCounter === 2) {
		stars[2].classList.remove('dimmed');
		thirdStarGo();
		
			myPlayDing();
		increaseStar1 = true;
		if(increaseStar1){
			increaseStars();
			
			increaseStar1 = false;
		}
	}

	//for hard mode
	if (btn.style.left == 'var(--fs-xxl)' && match === 6 && moves <= 20 && timer.textContent > 0) {
		// removing the 'dimmed' star introduces the 'lit-up' star
		stars[0].classList.remove('dimmed');
		if(increaseStar1){
			increaseStars();
			oneStarGo();

				myPlayDing();
			// increase star is set to false so a star is only added once to the counter until 4 matches are made
			increaseStar1 = false;
		}
	}
}

let cardsStopReactingToClicks = function(){
	
	firstCard.removeEventListener('click', firstCardFlip);
	secondCard.removeEventListener('click', firstCardFlip);
};

let removeCardsFlip = function(){
	
	firstCard.classList.remove('flip');
	secondCard.classList.remove('flip');
};

let removeCardsFlipAndBackFace = function(){
	removeBackFace();
	// cards remain unflipped
	
	removeCardsFlip();
};

let makeBackOfCardsInvisible = function(){
	firstCard.children[0].classList.add('visibilityHidden');
	secondCard.children[0].classList.add('visibilityHidden');
};



let makeBackOfCardsVisible = function(){
	firstCard.children[0].classList.remove('visibilityHidden');
	secondCard.children[0].classList.remove('visibilityHidden');
};

let cardsStartToShake = function(){
	firstCard.children[1].classList.add('horizontal-shake');
	secondCard.children[1].classList.add('horizontal-shake');	
};

let cardShakeRemove = function(){
	setTimeout(() =>{
		clearTimeout(cardsStartToShake);
	},1500);
};

let removeBackFace = function(){
	firstCard.children[1].classList.add('backFaceVisibility');
	secondCard.children[1].classList.add('backFaceVisibility');
};

// called if the cards match
function disableCards() {

	removeCardsFlipAndBackFace();
	
	// The backcard is hidden while the cards shake
	// if statement here allows back of card to return when hard mode re clicked
	if(btn.style.left == 'var(--fs-600)'){
		makeBackOfCardsInvisible();	
	}
	
}
	
// called if cards don't match
let unFlipCards = function(){
	/* If the cards don't match they will be locked  */
	lockBoard = true;
	
	// and will only be unlocked once they've been flipped 
	setTimeout(() => {

		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		// lockBoard turns false once the cards have been flipped

		lockBoard = false;

		resetBoard();
	}, 1500);
};

/**  In order for the function to work after each round the first card and second card 
need to be reset to null */

function resetBoard() {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

/** The flexbox property order will be used to shuffle the cards. 
This puts every flex item into the same group. Then they're grouped by
source order. A random number will be assigned to each card, so the order of the cards is random. 
To start the cards are iterated through. The Math.random function will be used.
 */
/* The cards need to be shuffled before the player starts the game.
By wrapping the function in parentheses means it will be immediately invoked after it's definition */
(function shuffle() {
	cards.forEach(card => {
		/* Multiply by 12 as result will be a number between 0 and 1 
		Math.floor is used to return an integer*/
		let randomPos = Math.floor(Math.random() * 12);
		// this random number is then applied to the order property
		card.style.order = randomPos;
	});
})();

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', firstCardFlip));
// js for timer 
/* Code adapted from [Iris Smok](https: //github.com/Iris-Smok/Kids-Memory-Game_PP2/blob/main/assets/js/script.js) */

var second = 0;
var timer = document.querySelector(".timer");

var interval;

/** startTimer function sets the timer html into minutes and seconds
 * if it reaches 60 seconds seconds go back to zero and minutes go up by one. If
 * the minutes reach 60 the minutes reset to zero. Getting the function to only 
 * run once was taken from Ankit Saxena
 */

function startTimer() {
	// the creation of a 'closure'
	let called = 0;
	return function() {
		/* called is true here so the code below is activated.
		however the called++ means on the next loop it's not zero 
		thus the function isn't called again */
		if (called === 0) {
			// the setInterval sets the timing interval to 1 second
			interval = 
			setInterval(function() {
				timer.innerHTML = second;
				second++;

			}, 1000);
			called++;
		}
	};
}

const startClock = startTimer();



function increaseStars() {
	starCounter++;
	stars1Counter.innerHTML = starCounter;
}

// reset game feature adapted from Iris Smoks Memory Game

// Store all reset elements in a reset variable. This is where the reset function will reach when looking to reset. 

/** When the reset button is clicked the reset function is activated
 * and the game is reset
 */
function resetGame() {


	window.location.reload();

}
// get reference to repeat icon
let reset = document.querySelector(".repeat");
// add event listener for the button, for action "click"
reset.addEventListener("click", resetGame);

// script code for modal adapted from WebDivSimplified
// anything with the data modal target will be inside the openModal variable

const closeModalButtons = document.querySelectorAll('[data-close-button]');


const overlay = document.getElementById('modal-overlay');

// Adding eventlistener to overlay object so it closes when overlay is preessed
overlay.addEventListener('click', () => {

	const modals = document.querySelectorAll('.modal.active');
	modals.forEach(modal => {
		closeModal(modal);
	
	});
});

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		// gets the closest parent element with the class modal
		let modal = button.closest('.modal');
		// once the modal is captured one wants to pass it into a function to open it
		closeModal(modal);
	});
});

function openModal(modal) {
	modal.classList.add('active');
	// everytime the modal is open one also wants the overlay open    
	overlay.classList.add('active');
}

function closeModal(modal) {
	if (modal === null) return;
	modal.classList.remove('active');
	overlay.classList.remove('active');
}
// code for button animation adapted from GreatStack
// As there are multiple spans it will be an array
let spans = document.getElementsByTagName("span");
let playHow = document.getElementById('howToPlay1');
let playHowChildren = document.getElementById('howToPlay1').children;

playHow.onclick = function() {
	// this will apply the css for each span
	for (let span of playHowChildren) {
		//    the class anim will be added to each span
		span.classList.add("anim");
	}
	setTimeout(function() {
		for (let span of playHowChildren) {
			//    the class anim will be removed from each span after .5s
			span.classList.remove("anim");
			// model pops up once bubbles have gone
			openModal(modal);

		}
	}, 500);
};

let anchor = document.getElementById('anchor');
let anchorChildren = anchor.children;

anchor.onclick = function() {
	function myPlaySparkle(){
						
		let audio = document.getElementsByClassName('sparkleSound')[0];
			
			audio.play();
		}
	myPlaySparkle();
	// this will apply the css for each span
	// anchorChildren used so both buttons don't fire ballons at same time
	for (let span of anchorChildren) {
		//    the class anim will be added to each span
		span.classList.add("anim");
	}
	setTimeout(function() {
		for (let span of spans) {
			//    the class anim will be removed from each span after .5s
			span.classList.remove("anim");
		}
	}, 2000);
};


// script for congratulations you won

let congratsPopup = document.getElementById("congratsModal-popup");

function openCongratsModalPopup() {
	congratsPopup.classList.add("opencongratsModal-popup");
	overlay.classList.add('active1');
	
	// Mickey Mouse Congratulations

		let myPlayMickeyCongrats = function(){
			let audio = document.getElementsByClassName('mickeyMouseCongrats')[0];
			audio.play();
		};
		setTimeout(function() {
			myPlayMickeyCongrats();
		}, 2000);

}

let congratsModalOverlay = document.querySelector('div.congratsModal-overlay');
congratsModalOverlay.addEventListener("click", closeCongratsModalPopup);

let ok = document.querySelector('.congratsButton');
ok.addEventListener("click", closeCongratsModalPopup);

function closeCongratsModalPopup() {
	
	this.classList.remove("opencongratsModal-popup");
	resetGame();
}

// Increase the click(move) count by 1 and update the HTML text to the current value
function incrementCounter() {
	counter.moveCounter++;
	moves.innerHTML = counter.moveCounter;
}

/**Creating an element containing the class fa-star each time a star is won. This allows 3 stars to be
 * presented in the congrats modal
 */
let congratsModal = document.querySelector('.congratsStars');
let oneStarGo = function() {
	stars[0].style.color ="orange";
	congratsModal.innerHTML +='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height = "2vh"; width = "2vw";><path fill="currentColor" d="M18.5 2a4.5 4.5 0 0 1 .883 8.913a8 8 0 1 1-14.765-.001A4.499 4.499 0 0 1 5.5 2a4.5 4.5 0 0 1 4.493 4.254A7.998 7.998 0 0 1 12 6a7.99 7.99 0 0 1 2.006.254A4.5 4.5 0 0 1 18.5 2Z"/></svg>';
};

let secondStarGo = function() {
		stars[1].style.color ="orange";
		congratsModal.innerHTML +='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height = "2vh"; width = "2vw";><path fill="currentColor" d="M18.5 2a4.5 4.5 0 0 1 .883 8.913a8 8 0 1 1-14.765-.001A4.499 4.499 0 0 1 5.5 2a4.5 4.5 0 0 1 4.493 4.254A7.998 7.998 0 0 1 12 6a7.99 7.99 0 0 1 2.006.254A4.5 4.5 0 0 1 18.5 2Z"/></svg>';
	};

let thirdStarGo = function() {
	stars[2].style.color ="orange";
	congratsModal.innerHTML +='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height = "2vh"; width = "2vw";><path fill="currentColor" d="M18.5 2a4.5 4.5 0 0 1 .883 8.913a8 8 0 1 1-14.765-.001A4.499 4.499 0 0 1 5.5 2a4.5 4.5 0 0 1 4.493 4.254A7.998 7.998 0 0 1 12 6a7.99 7.99 0 0 1 2.006.254A4.5 4.5 0 0 1 18.5 2Z"/></svg>';
	};

//Mute sound script
// sound here refers to all the audio elements. It is then passed
// into the function and muted & pause methods are added to all audios

// code adapted from Knowledge Base YouTube & isherwood stackoverflow
let volume = false;

	let muteMe = function(sound){
		sound.muted=true;	
	};
	let unMuteMe = document.getElementById('UnMuteIcon');
	let UnmuteMeFunction = function(sound){
		sound.muted=false;	
	};

	let muteSounds = function() {
	// 	// returns node list of all sounds
		let sounds = document.querySelectorAll('audio');
	// 	// for each sound add mute me to it
		[].forEach.call(sounds, function(sound){muteMe(sound);});
		volume = true;
	};	
	
	let UnmuteSounds = function() {
		// returns node list of all sounds
		let sounds = document.querySelectorAll('audio');
		// for each sound add mute me to it
		[].forEach.call(sounds, function(sound){UnmuteMeFunction(sound);});
		volume = false;
			};

// toggle between volume/no volume
// mute is always false and unmute is always true so when the function below
// asks if one is either true of false it will always be switching between the two
	function toggleVolume() {
		if(volume){
			UnmuteSounds();
		}else{
			muteSounds();
		}
	}

	const muteBtn = document.querySelector('.mute-button');

muteBtn.addEventListener('click', () => {
	toggleVolume();
  muteBtn.querySelectorAll('span').forEach(el => {
    el.classList.toggle('hidden');
  });
});


// Code for countdown timer adapted from Riddhijain stackoverflow

var timer = document.querySelector(".timer");
var interval;

let startCountdownTimer = function() {
	interval = setInterval(function() {
    
		if (second == 0) {
	
		  second = 60;
		}
		timer.innerHTML = second;
	
			// so the countdown begins only after the very first card click
		if(startTimerCounter){
			
				second--;
		}
		
		
		// game resets if countdown reaches 0s
		if(second == 0){
			resetGame();
			}
		
	  }, 1000);

};

// Code for Moves Countdown
let startMoves = true;
let movesPlus1 = true;

function startMovesCountdown(){

	if (moves == 0 &&  movesPlus1){
		moves = 30;
		movesPlus1 = false;	
	}	

	if(!startMoves){
		moves--;
	}
	// // the delay of a second in the moves counter is factored in by 
	// having the if statement for when to reset game set to -1 here
	if(moves == -1 && !movesPlus1){
		resetGame();
		}		
}

// moves counter
/** 1 added to counter variable each time a move is made */

function moveC() {

	if(startMoves){
		moves++;	
	}
		counter.innerHTML = moves;
}

// code adapted from Tuat Tran Anh
// script for easy/hard toggle button

let easyBtnHasBeenClickedElement = document.querySelectorAll('.toggle-btn')[0];
let HardModeElement = document.querySelectorAll('.toggle-btn')[1];

easyBtnHasBeenClickedElement.onclick = function(){
	easyBtnHasBeenClicked();

	startTimerCounter = false;
	clickCard[0].classList.remove('after');
	clickCard[0].classList.add('cardShake');
	
	increaseFontAfterClick.classList.add('infoContainerAfterClick');
};
let setIntervalTimerID;

let stopCardsUnflipping = function(){
	clearInterval(setIntervalTimerID);
};
let hardModeClickedWhenInHardMode = function(){
		
if(!timerActivate && btn.style.left == 'var(--fs-xxl)' && !startTimerCounter && moves <= '30'){
	clearInterval(setIntervalTimerID);
}

};

let unFlipCardsFunction = function(){
	const unFlipCardsHard = () => {
		let cardsLeftToUnflip = document.querySelector('.front1');
		cardsLeftToUnflip?.classList.remove('front1');
	  };
	  setIntervalTimerID = setInterval(() =>{
		unFlipCardsHard();
			},50);
};
//Addresses bug whereby matched cards would not display 
// the back of the card when moving from easy to hard mode
//solution adapted from code from Web Dev Simplified
// so whatever element is passed into this function
// it's visibilityHidden class is removed. Using functions 
// this way allow for repeatibility
			function removeVisibility(element){
					element.classList.remove('visibilityHidden');
					}

			

 HardModeElement.onclick = function(){
	hardMode();
	turnBackOfCardsPurple();


	// this.getElementsByClassName doesn't have a forEach method but turning it into an array allows one to use forEach
	let strayCardsToUnflipHardMode = Array.from(document.getElementsByClassName('visibilityHidden'));
	// for each card left unflipped when moving from easy to hard mode the back of the card will now still display
	strayCardsToUnflipHardMode.forEach(removeVisibility);
	
	//Addresses bug whereby if one card was open on easy mode
	// and player switched to hard mode the firstCard remained
	// unflipped
	cardToUnflip?.classList.remove('flip');
	

	hardModeClickedWhenInHardMode();

	/**moves counter is set to go down when startMoves is true */

	// Cards remain unflipped when going from easy to hardmode. So need
	// to have cards flip in this instance. 
	/** if the button styling is > 1vw easy has moved into hard */
	if(btn.style.left == 'var(--fs-xxl)'){
		setTimeout(() =>{
				unFlipCardsFunction();
				},30);
				setTimeout(() =>{
					clearInterval(setIntervalTimerID);
									},2000);									
	}
	
	// startmoves is true globally, when hardMode is clicked
	// it is set to false. 

	// This needs NOT to run when hard mode is clicked to start a game. 
	// It sets to true when hard mode is clicked. By having a clause whereby the cards only unflip
	// while the movesCounter is false this prevents the cards unflipping during the game.

	if(!movesCounter && startTimerCounter){
		unFlipCardsFunction();
	}

	/**If on hardmode and hardmode is clicked again movesCounter is still true
	 * so the cards won't unflip. MovesCounter needs to revert back to
	 * false when playing hardmode and hardmode is clicked. If the startTimerCounter is false
	 * it means hardmode has been clicked again. 
	 */
	if(!startTimerCounter && HardModeElement.onclick){
		movesCounter = false;
	}
 };
			
let btn = document.getElementById('btn');

let easyBtn = document.querySelector('#easyBtn');

let easyBtnHasBeenClicked = function(){
	btn.style.left = '0';
	resetGame();
	if(!startMoves){
		unFlipCardsFunction();
	}
};

/**tells the game what moves values to display
 * when hardMode is activated initially
 */
let hardModeMovesResetValues = function(){
	
	moves = 30;
	counter.innerHTML = "30";
	startMovesCountdown();
	// so counter timer not start until first click
	startTimerCounter = false;
};

/**tells the game what timer valuestartMoves = false;s to display
 * when hardMode is activated initially
 */
let hardModeTimerResetValues = function(){
	
	var timer = document.querySelector(".timer");
	timer.textContent = 60;
	second = 60;
	// clears the setinterval that's set to 1s
	clearInterval(interval);
};

// how the computer can tell it's in hardmode
let howKnowInHardMode = function(){
	btn.style.left = 'var(--fs-xxl)';
	timerActivate = false;
	startMoves = false;
};

// sets both hard modes timer and moves default values
let hardModeResetValues = function(){
	hardModeMovesResetValues();
	hardModeTimerResetValues(); 
};

let hardMode = function(){
	hardModeResetValues();
	howKnowInHardMode();
	startCountdownTimer();
};












