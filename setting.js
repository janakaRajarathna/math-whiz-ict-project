// theme change


 // Function to toggle between themes
 function toggleTheme() {
    // Check if a theme is already set
    const currentTheme = localStorage.getItem('theme') || 'default';

    // Toggle between themes
    if (currentTheme === 'default') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else if (currentTheme === 'dark') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'default');
    }
}



