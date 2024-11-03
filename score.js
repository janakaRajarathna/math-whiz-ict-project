const gameList = JSON.parse(localStorage.getItem('GAME_LIST')) || []
$(document).ready(function () {

	initialLoad()

	$('#time-sub-option button').click(function (event) {
		[...document.querySelectorAll('#time-sub-option button')].map(btn=>{
			btn.classList.remove('active')
		})

		const timeVal = parseInt(event.target.innerText.split(' ')[0])
		const data = gameList.filter(g => g.gameMode == 'timeout' && g.gameSubMode == timeVal).sort((a, b) => {
			return b.score - a.score
		})
		renderTable(data ,'timeOut-highest-score-table')
		event.target.classList.add('active')
	})

	$('#question-sub-option button').click(function (event) {

		[...document.querySelectorAll('#question-sub-option button')].map(btn=>{
			btn.classList.remove('active')
		})
		const questionVal = parseInt(event.target.innerText.split(' ')[0])
		const data = gameList.filter(g => g.gameMode == 'question' && g.gameSubMode == questionVal).sort((a, b) => {
			return b.score - a.score
		})
		renderTable(data ,'quizMode-highest-score-table')
		event.target.classList.add('active')
	})


})


function initialLoad() {
	const data = gameList.filter(g => g.gameMode == 'timeout' && g.gameSubMode == 20).sort((a, b) => {
		return b.score - a.score
	})
	renderTable(data, 'timeOut-highest-score-table')

	const data2 = gameList.filter(g => g.gameMode == 'question' && g.gameSubMode == 10).sort((a, b) => {
		return b.score - a.score
	})
	renderTable(data2, 'quizMode-highest-score-table')
}
function renderTable(data, tableId) {
	/**
	 * const game = {
	 * 		playerName: selectedPlayer,
	 * 		gameMode: gameMode,
	 * 		gameSubMode:gameSubMode,
	 * 		date: new Date(),
	 * 		score: correctAnswerCount
	 * 	}
	 */

	const tbodyHtml = data.map(d => {
		return ` <tr>
                <td class="border px-4 py-2">${d.playerName}</td>
                <td class="border px-4 py-2">${convertDate(d.date)}</td>
                <td class="border px-4 py-2">${d.score}</td>
            </tr>`
	}).join('')

	$(`#${tableId} tbody`).html(tbodyHtml)
}

function convertDate(dString) {
	const newDate= new Date(dString)

	const dParts = newDate.toLocaleString().split(',')
	return dParts[0] + ' ' + dParts[1]
}