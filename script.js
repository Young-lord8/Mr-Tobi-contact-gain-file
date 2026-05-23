document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const formData = new FormData(form);
    
    // Get form data as object
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    statusMessage.className = 'status-message';
    statusMessage.style.display = 'none';
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            statusMessage.textContent = result.message || 'Thank you! We\'ll be in touch soon.';
            statusMessage.className = 'status-message success';
            form.reset();
        } else {
            throw new Error(result.error || 'Something went wrong');
        }
    } catch (error) {
        statusMessage.textContent = error.message || 'Failed to send message. Please try again.';
        statusMessage.className = 'status-message error';
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});
