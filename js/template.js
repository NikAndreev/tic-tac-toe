document.addEventListener("DOMContentLoaded", function(){

	let currentPlayer = "cross";
	let stepsCounter = 0;
	let score = {
		cross: 0,
		zero: 0
	};
	let isLocked = false;
	let currentWinner = false;

	const wrapper = document.createElement("div");
	wrapper.className = "wrapper";
	document.body.prepend(wrapper);

	const scoreArea = document.createElement("div");
	scoreArea.className = "score";
	wrapper.append(scoreArea);

	const scoreCrossPanel = document.createElement("div");
	scoreCrossPanel.className = "score__cross";
	scoreCrossPanel.innerText = "X";
	scoreArea.append(scoreCrossPanel);

	const scoreCrossOutput = document.createElement("span");
	scoreCrossOutput.className = "score__number";
	scoreCrossOutput.innerText = score.cross;
	scoreCrossPanel.append(scoreCrossOutput);

	const scoreZeroPanel = document.createElement("div");
	scoreZeroPanel.className = "score__zero";
	scoreZeroPanel.innerText = "O";
	scoreArea.append(scoreZeroPanel);

	const scoreZeroOutput = document.createElement("span");
	scoreZeroOutput.className = "score__number";
	scoreZeroOutput.innerText = score.zero;
	scoreZeroPanel.append(scoreZeroOutput);

	const field = document.createElement("div");
	field.className = "field";
	field.dataset.currentPlayer = currentPlayer;
	wrapper.append(field);

	const cellArray = [];

	for (let i = 0; i < 9; i++) {
		let cell = document.createElement("span");
		cell.className="cell";
		cellArray.push(cell);
	}	

	field.append(...cellArray);

	const line = document.createElement("div");
	line.className = "line";
	field.append(line);

	const buttons = document.createElement("div");
	buttons.className = "buttons";
	field.after(buttons);

	const resetFieldButton = document.createElement("button");
	resetFieldButton.className = "btn";
	resetFieldButton.innerHTML = "Очистить поле";
	buttons.append(resetFieldButton);

	const resetScoreButton = document.createElement("button");
	resetScoreButton.className = "btn";
	resetScoreButton.innerHTML = "Сбросит счёт";
	buttons.append(resetScoreButton);

	cellArray.forEach( cell => {
		cell.addEventListener("mouseenter", highlightOn);
		cell.addEventListener("mouseleave", highlightOff);
		cell.addEventListener("click", makeStep);
	});

	resetFieldButton.addEventListener("click", resetField);

	resetScoreButton.addEventListener("click", function() {
		score.cross = 0;
		score.zero = 0;
		updateScore();
	});

	function highlightOn(event) {
		if (!event.target.dataset.mark) {
			event.target.classList.add("highlight");
		}
	}

	function highlightOff(event) {
		event.target.classList.remove("highlight");
	}

	function makeStep(event) {

		if ((!event.target.dataset.mark) && (!isLocked)) {

			event.target.classList.remove("highlight");

			if (currentPlayer === "cross") {
				event.target.dataset.mark = "cross";
				currentPlayer = "zero";
			} else {
				event.target.dataset.mark = "zero";
				currentPlayer = "cross";
			}

			field.dataset.currentPlayer = currentPlayer;

			if (checkVictory()) {
				isLocked = true;
				setTimeout(updateScore, 1000);
				setTimeout(resetField, 1000);
			}

			stepsCounter++;
			if (stepsCounter === 9) {
				resetField();
			}
		}
	}

	function checkVictory() {

		for (let i = 0; i < 9; i+=3) {
			if ( (cellArray[i].dataset.mark === cellArray[i + 1].dataset.mark) && (cellArray[i + 1].dataset.mark === cellArray[i + 2].dataset.mark) && (cellArray[i].dataset.mark) ) {	
				currentWinner = cellArray[i].dataset.mark;
				let top = (i === 0) ? 16.666666 :
				(i === 3) ? 50 :
				83.333333;
				line.style = `top: ${top}%; left: 0; width: 100%; height: 6px; transform: translate(0, -50%); transition: width 0.5s;`;
				break;
			}
		}

		for (let i = 0; i < 3; i++) {
			if ( (cellArray[i].dataset.mark === cellArray[i + 3].dataset.mark) && (cellArray[i + 3].dataset.mark === cellArray[i + 6].dataset.mark) && (cellArray[i].dataset.mark) ) {
				currentWinner = cellArray[i].dataset.mark;
				let left = (i === 0) ? 16.666666 :
				(i === 1) ? 50 :
				83.333333;
				line.style = `left: ${left}%; top: 0; height: 100%; width: 6px; transform: translate(-50%, 0); transition: height 0.5s;`;
				break;
			}
		}

		if ( (cellArray[0].dataset.mark === cellArray[4].dataset.mark) && (cellArray[4].dataset.mark === cellArray[8].dataset.mark) && (cellArray[0].dataset.mark) ) {
			currentWinner = cellArray[0].dataset.mark;
			line.style = "left: 50%; top: 50%; width: 130%; height: 6px; transform: translate(-50%, -50%) rotate(45deg); transition: width 0.5s;";
		}

		if ( (cellArray[2].dataset.mark === cellArray[4].dataset.mark) && (cellArray[4].dataset.mark === cellArray[6].dataset.mark) && (cellArray[2].dataset.mark) ) {
			currentWinner = cellArray[2].dataset.mark;
			line.style = "left: 50%; top: 50%; width: 130%; height: 6px; transform: translate(-50%, -50%) rotate(-45deg); transition: width 0.5s;";
		}



		if (currentWinner) {
			
			score[currentWinner]++;

			return true;

		} else {
			return false;
		}

	}

	function resetField() {
		cellArray.forEach( function(cell){
			cell.removeAttribute("data-mark");
		});
		currentWinner = false;
		currentPlayer = "cross";
		line.style = "";
		stepsCounter = 0;
		field.dataset.currentPlayer = currentPlayer;
		isLocked = false;
	}

	function updateScore() {
		scoreCrossOutput.innerText = score.cross;
		scoreZeroOutput.innerText = score.zero;
	}

});