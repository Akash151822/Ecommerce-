module.exports = {
    ACCOUNT_VERIFICATION_MAIL(userName, otp) {
        return `<!DOCTYPE html>
          <html>
          <head>
          <title>Page Title</title>
          </head>
          <body>
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">lifeStyle</a>
              </div>
              <p style="font-size:1.1em">Hi,${userName}</p>
              <p>Thank you for choosing userMania. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />userMania</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>userMania Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>
          
          </body>
          </html>
          `;
    },

    FORGOT_PASSWORD_OTP(userName, otp) {
        return `<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">lifeStyle</a>
          </div>
          <p style="font-size:1.1em">Hi,${userName}</p>
          <p>Please use the verification code below to reset your password . If you did'nt request this , you can ignore this mail. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />userMania</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>userMania Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
      </body>
      </html>`
    },

    UPDATE_PASSWORD(userName) {
        return `<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">userMania</a>
          </div>
          <p style="font-size:1.1em">Hi,${userName}</p>
          <p>Password updated successfully</p>
          <p style="font-size:0.9em;">Regards,<br />userMania</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>userMania Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
      
      </body>
      </html>`
    },

    LOGIN_EMAIL(userName) {
        return `<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">lifeStyle</a>
          </div>
          <p style="font-size:1.1em">Login Successful</p>
          <p>Hi ${userName}, Welcome to userMania </p>
          <p style="font-size:0.9em;">Regards,<br />userMania</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>userMania Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
      
      </body>
      </html>`
    },

    RESEND_OTP(userName,otp){
      return `<!DOCTYPE html>
          <html>
          <head>
          <title>Page Title</title>
          </head>
          <body>
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">lifeStyle</a>
              </div>
              <p style="font-size:1.1em">Hi,${userName}</p>
              <p>You request for new OTP is completed . Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />userMania</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>userMania Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>
          
          </body>
          </html>
          `;
    }
    
};