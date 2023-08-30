/*
 * description: This function updates the totals row of the score table.
 * parameters: none
 * returns: none
 */
function updateTotals() {
	const totalCells = totalsRow.getElementsByTagName("td");
	// From 1 as we don't want to include the top row in the totals
	for (let i = 1; i <= totalCells.length; i++) {
		let total = 0;
		for (let j = 1; j < scoreTable.rows.length - 1; j++) {
			const cellValue = parseFloat(scoreTable.rows[j].cells[i].querySelector("input").value) || 0;
			total += cellValue;
		}
		totalCells[i].textContent = total;
	}
}
/*
 * description: This function adds a new hole to the score table.
 * parameters: none
 * returns: none
 */
document.addEventListener("DOMContentLoaded", function() {
	const addHoleButton = document.getElementById("addHoleButton");
	const scoreTable = document.getElementById("scoreTable");
	addHoleButton.addEventListener("click", function() {
		const lastHoleNumber = scoreTable.rows.length;
		const newRow = document.createElement("tr");
		const holeCell = document.createElement("td");
		holeCell.textContent = lastHoleNumber - 1;
		newRow.appendChild(holeCell);
		for (let i = 0; i < scoreTable.rows[0].cells.length - 1; i++) {
			const playerCell = document.createElement("td");
			const input = document.createElement("input");
			input.type = "number";
			input.min = "1";
			input.max = "100";
			input.addEventListener("input", updateTotals);
			playerCell.appendChild(input);
			newRow.appendChild(playerCell);
		}
		scoreTable.querySelector("tbody").appendChild(newRow);
		updateTotals();
	});
});
/*
 * description: This function adds a new player to the score table.
 * parameters: none
 * returns: none
 */
document.addEventListener("DOMContentLoaded", function() {
	const addPlayerButton = document.getElementById("addPlayerButton");
	const scoreTable = document.getElementById("scoreTable");
	addPlayerButton.addEventListener("click", function() {
		const playerCount = scoreTable.rows[0].cells.length;
		if (playerCount <= 10) {
			const playerName = `Player ${playerCount}`;
			if (playerName) {
				for (let i = 0; i < scoreTable.rows.length; i++) {
					const playerCell = document.createElement("td");
					const input = document.createElement("input");
					input.type = "number";
					input.min = "1";
					input.max = "100";
					input.addEventListener("input", updateTotals);
					playerCell.appendChild(input);
					if (i === 0) {
						playerCell.textContent = playerName;
					}
					scoreTable.rows[i].appendChild(playerCell);
				}
				//set last td to no input
				const lastRow = scoreTable.rows[scoreTable.rows.length - 1];
				const lastCell = lastRow.cells[lastRow.cells.length - 1];
				lastCell.innerHTML = "";
			}
		} else {
			alert("Maximum player limit reached (10 players).");
		}
	});
});