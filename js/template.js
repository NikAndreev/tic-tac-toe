document.addEventListener("DOMContentLoaded", function(){

	let currentPlayer = "cross";
	let stepsCounter = 0;
	let scoreCross = 0;
	let scoreZero = 0;
	let isLocked = false;

	let wrapper = document.createElement("div");
	wrapper.className = "wrapper";
	document.body.prepend(wrapper);

	let scoreArea = document.createElement("div");
	scoreArea.className = "score";
	wrapper.append(scoreArea);

	let scoreCrossPanel = document.createElement("span");
	scoreCrossPanel.className = "score__cross";
	scoreCrossPanel.innerHTML = "X <span class='score__number'>" + scoreCross + "</span>";
	scoreArea.append(scoreCrossPanel);

	let scoreZeroPanel = document.createElement("span");
	scoreZeroPanel.className = "score__zero";
	scoreZeroPanel.innerHTML = "O <span class='score__number'>" + scoreZero + "</span>";
	scoreArea.append(scoreZeroPanel);

	let field = document.createElement("div");
	field.className = "field";
	field.dataset.currentPlayer = currentPlayer;
	wrapper.append(field);

	let cellArray = [];

	for (let i = 0; i < 9; i++) {
		let cell = document.createElement("span");
		cell.className="cell";
		cellArray.push(cell);
	}	

	field.append(...cellArray);

	let horizontal = document.createElement("div");
	horizontal.className = "hr";

	let buttons = document.createElement("div");
	buttons.className = "buttons";
	field.after(buttons);

	let resetFieldButton = document.createElement("button");
	resetFieldButton.className = "btn";
	resetFieldButton.innerHTML = "Очистить поле";
	buttons.append(resetFieldButton);

	let resetScoreButton = document.createElement("button");
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
		scoreCross = 0;
		scoreZero = 0;
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
				setTimeout(resetField, 1000);
				setTimeout(updateScore, 1000);
			}

			stepsCounter++;
			if (stepsCounter === 9) {
				resetField();
			}
		}
	}

	function checkVictory() {
		let winner = false;

		for (let i = 0; i < 9; i+=3) {
			if ( (cellArray[i].dataset.mark === cellArray[i + 1].dataset.mark) && (cellArray[i + 1].dataset.mark === cellArray[i + 2].dataset.mark) && (cellArray[i].dataset.mark) ) {	
				winner = cellArray[i].dataset.mark;
				let top = (i === 0) ? 16.666666 :
				(i === 3) ? 50 :
				83.333333;
				horizontal.style = "width: 100%; height: 6px; top: " + top + "%; transform: translate(0, -50%);";
				break;
			}
		}

		for (let i = 0; i < 3; i++) {
			if ( (cellArray[i].dataset.mark === cellArray[i + 3].dataset.mark) && (cellArray[i + 3].dataset.mark === cellArray[i + 6].dataset.mark) && (cellArray[i].dataset.mark) ) {
				winner = cellArray[i].dataset.mark;
				let left = (i === 0) ? 16.666666 :
				(i === 1) ? 50 :
				83.333333;
				horizontal.style = "width: 6px; height: 100%; left: " + left + "%; transform: translate(-50%, 0);";
				break;
			}
		}

		if ( (cellArray[0].dataset.mark === cellArray[4].dataset.mark) && (cellArray[4].dataset.mark === cellArray[8].dataset.mark) && (cellArray[0].dataset.mark) ) {
			winner = cellArray[0].dataset.mark;
			horizontal.style = "width: 120%; height: 6px; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(45deg);";
		}

		if ( (cellArray[2].dataset.mark === cellArray[4].dataset.mark) && (cellArray[4].dataset.mark === cellArray[6].dataset.mark) && (cellArray[2].dataset.mark) ) {
			winner = cellArray[2].dataset.mark;
			horizontal.style = "width: 120%; height: 6px; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(-45deg);";
		}

		if (winner) {

			field.append(horizontal);

			if (winner === "cross") {
				scoreCross++;
			} else {
				scoreZero++;
			}

			return true;

		} else {
			return false;
		}

	}

	function resetField() {
		cellArray.forEach( function(cell){
			cell.removeAttribute("data-mark");
		});
		horizontal.remove();
		stepsCounter = 0;
		currentPlayer = "cross";
		field.dataset.currentPlayer = currentPlayer;
		isLocked = false;
	}

	function updateScore() {
		scoreCrossPanel.innerHTML = "X <span class='score__number'>" + scoreCross + "</span>";
		scoreZeroPanel.innerHTML = "O <span class='score__number'>" + scoreZero + "</span>";
	}

});