import React, { useState } from "react";

const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only numbers allowed

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && idx < length - 1) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`).focus();
    }
  };

  return (
    <div className="otpBox" style={{ display: "flex", gap: 7, justifyContent: "center" }}>
      {otp.map((val, idx) => (
        <input
          key={idx}
          id={`otp-input-${idx}`}
          type="text"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          style={{
            width: 45,
            height: 45,
            textAlign: "center",
            fontSize: 17,
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;