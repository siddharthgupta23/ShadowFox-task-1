document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded successfully!');

    const changeColorButton = document.getElementById('change-color-button');
    const body = document.body;

    changeColorButton.addEventListener('click', function () {
        const randomColor = getRandomColor();
        animateBackgroundColorChange(body, randomColor);
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function animateBackgroundColorChange(element, color) {
        let currentColor = element.style.backgroundColor || 'white';
        let steps = 50; 
        let duration = 500;
        let stepDuration = duration / steps;

        let stepR = (parseInt(color.slice(1, 3), 16) - parseInt(currentColor.slice(1, 3), 16)) / steps;
        let stepG = (parseInt(color.slice(3, 5), 16) - parseInt(currentColor.slice(3, 5), 16)) / steps;
        let stepB = (parseInt(color.slice(5, 7), 16) - parseInt(currentColor.slice(5, 7), 16)) / steps;

        let stepCount = 0;
        let intervalId = setInterval(function () {
            if (stepCount++ >= steps) {
                clearInterval(intervalId);
                element.style.backgroundColor = color;
            } else {
                let newColor = '#';
                let r = parseInt(currentColor.slice(1, 3), 16) + stepR * stepCount;
                let g = parseInt(currentColor.slice(3, 5), 16) + stepG * stepCount;
                let b = parseInt(currentColor.slice(5, 7), 16) + stepB * stepCount;

                newColor += (Math.round(r)).toString(16).padStart(2, '0');
                newColor += (Math.round(g)).toString(16).padStart(2, '0');
                newColor += (Math.round(b)).toString(16).padStart(2, '0');

                element.style.backgroundColor = newColor;
            }
        }, stepDuration);
    }

    
});
document.addEventListener("DOMContentLoaded", function() {
    function loadContent(url, elementId, removeHeader = false) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(elementId);
                if (removeHeader) {
                    // Create a temporary div to hold the loaded content
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;

                    // Remove the header and nav from the loaded content
                    const header = tempDiv.querySelector('header');
                    if (header) {
                        header.remove();
                    }

                    // Set the remaining content
                    element.innerHTML = tempDiv.innerHTML;
                } else {
                    element.innerHTML = data;
                }
            })
            .catch(error => console.log('Error loading content:', error));
    }

    loadContent('about.html', 'about-content', true);
    loadContent('project.html', 'projects-content', true);
    loadContent('contact.html', 'contact-content', true);
    loadContent('skills.html', 'skills-content', true);
});

