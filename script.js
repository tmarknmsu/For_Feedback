document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    const message = document.querySelector('.message');

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 300;

    // Draw initial cover
    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    // Setup scratch effect
    let isScratching = false;
    const scratchRadius = 20;
    const threshold = 5000; // Adjust this number based on the amount of area scratched

    function scratch(e) {
        if (!isScratching) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.arc(x, y, scratchRadius, 0, Math.PI * 2, false);
        ctx.fill();

        // Check if enough area is scratched
        if (getScratchedArea() > threshold) {
            message.style.display = 'block';
        }
    }

    function getScratchedArea() {
        // Approximate scratched area
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let scratchedPixels = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) scratchedPixels++;
        }
        return scratchedPixels;
    }

    function startScratch(e) {
        isScratching = true;
        scratch(e);
    }

    function stopScratch() {
        isScratching = false;
    }

    // Add event listeners for mouse and touch events
    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchend', stopScratch);
    canvas.addEventListener('touchmove', (e) => {
        // Prevent default scrolling behavior
        e.preventDefault();
        scratch(e.touches[0]);
});
});
