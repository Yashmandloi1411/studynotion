import React, { useState } from "react";

import OtpInput from "react-otp-input";

function verifyEmail() {
  const [otp, setOtp] = useState("");
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <h1>Loding...</h1>
      ) : (
        <div>
          <h1>Vefiy email</h1>
          <p>A verification code has beed sent to you.Enter the code below</p>
          <form action="">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInput={6}
              // renderSeparator = {<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </form>

          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default verifyEmail;
