// load defualt sound settings
const soundToggle = document.getElementById('soundToggle');
const soundToggleSavedValue = JSON.parse(localStorage.getItem('SOUND_TOGGLE')) || false;
soundToggle.checked = soundToggleSavedValue



function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}



// Load the theme when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    applyTheme(savedTheme);
    const themeSelect = document.getElementById('themeDropdown');
    if (themeSelect) themeSelect.value = savedTheme;
});


 
document.getElementById("themeDropdown").addEventListener("change", function() {
    const selectedValue = this.value;
    localStorage.setItem('theme', selectedValue);
        applyTheme(selectedValue);
});

soundToggle.addEventListener('change', function () {
    localStorage.setItem('SOUND_TOGGLE',soundToggle.checked)
});


//add player

$(document).ready(function () {

 

    // Function to render the player table
    function renderPlayerTable() {
        const playerNameList = JSON.parse(localStorage.getItem('PLAYER_NAME_LIST')) || {};
        const tableBody = $('#player-table tbody');
        tableBody.empty(); // Clear existing rows

        // Iterate over players and add them to the table
        $.each(playerNameList, function (name, player) {
            const row = `
                <tr>
                    <td>${player.playerName}</td>
                    <td>${new Date(player.addedDate).toLocaleDateString()}</td>
                    <td>${player.points}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Render the table initially
    renderPlayerTable();

    // Click event to add a player
    $('#add-player-btn').click(function () {
        const playerName = $('#playerName').val().trim();
        if (playerName) {
            const playerNameList = JSON.parse(localStorage.getItem('PLAYER_NAME_LIST')) || {};

            // Add player if not already in the list
            if (!playerNameList[playerName]) {
                playerNameList[playerName] = {
                    playerName: playerName,
                    addedDate: new Date().toISOString(),
                    points: 0
                };
                localStorage.setItem('PLAYER_NAME_LIST', JSON.stringify(playerNameList));
                renderPlayerTable(); // Refresh the table to include the new player
                $('#playerName').val(''); // Clear input field
            } else {
                alert('Player already exists!');
            }
        } else {
            alert('Please enter a player name.');
        }
    });


    


});


