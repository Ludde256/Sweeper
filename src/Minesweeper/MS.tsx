export function board() {
	const horizontalLineLength = 30;
	const verticalLineLength = 20;

	let board: any[][] = [];

	for (var i = 0; i < horizontalLineLength; i++) {
		board[i] = [];
		for (var j = 0; j < verticalLineLength; j++) {
			board[i][j] = [];
		}
	}
}
