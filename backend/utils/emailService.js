const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// ...existing code...

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Accessibility Learning Tools',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Welcome to Accessibility Learning Tools!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1976d2; margin: 0;">Welcome to Accessibility Learning Tools!</h1>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${name}!</h2>
            <p style="color: #555; line-height: 1.6;">
              Congratulations! Your email has been successfully verified and your account is now active.
            </p>
            
            <p style="color: #555; line-height: 1.6;">
              You now have access to our comprehensive suite of accessibility tools including:
            </p>
            
            <ul style="color: #555; line-height: 1.8;">
              <li>🔊 Text-to-Speech Reader</li>
              <li>🎤 Speech-to-Text Converter</li>
              <li>🔤 Font Size Adjuster</li>
              <li>🎨 Color Contrast Tool</li>
              <li>👁️ Visual Aids</li>
              <li>🤟 Sign Language Support</li>
              <li>🌍 Multi-language Support</li>
              <li>📝 Interactive Quizzes</li>
              <li>📖 Note Taking System</li>
              <li>📷 OCR Text Recognition</li>
              <li>📺 Closed Captions</li>
              <li>📊 Progress Tracking</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
                 style="background-color: #1976d2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Start Learning Now
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px;">
              © 2025 Accessibility Learning Tools. Making education accessible for everyone.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Welcome email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail
};
