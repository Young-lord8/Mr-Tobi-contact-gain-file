export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        // 🚨 IMPORTANT: Set up your notification method here:
        
        // Option 1: Console log (for testing)
        console.log('📧 New Contact Form Submission:');
        console.log({ name, email, subject, message, timestamp: new Date() });
        
        // Option 2: Send email with EmailJS (free tier available)
        // Uncomment and configure below:
        /*
        const emailjs = require('@emailjs/browser');
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            name,
            email,
            subject,
            message
        }, 'YOUR_PUBLIC_KEY');
        */
        
        // Option 3: Use SendGrid API
        // Add your SendGrid configuration in Vercel dashboard
        
        // Option 4: Store in database (Airtable, MongoDB, etc.)
        // Add your database logic here
        
        return res.status(200).json({
            message: 'Thank you! We\'ll be in touch soon.',
            success: true
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ error: 'Failed to process request' });
    }
}
