import { useState } from "react";
import "./css/App.css";
import chip from "./images/chip.png";

export default function App() {
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCode, setCardCode] = useState("");

  function handleSubmit() {
    const data = {
      bankName: bankName,
      cardNumber: cardNumber,
      cardName: cardName,
      cardDate: cardDate,
      cardCode: cardCode,
    };

    if (
      bankName !== "" &&
      cardNumber !== "" &&
      cardName !== "" &&
      cardDate !== "" &&
      cardCode !== ""
    ) {
      console.log(data);
    }
  }

  // Format the card number inserting space
  function formatCardNumber(input) {
    let output = "";
    input.replace(
      /^\D*(\d{0,4})\D*(\d{0,4})\D*(\d{0,4})\D*(\d{0,4})/,
      function (match, g1, g2, g3, g4) {
        if (g1.length) {
          output += g1;
          if (g1.length === 4) {
            output += " ";
            if (g2.length) {
              output += g2;
              if (g2.length === 4) {
                output += " ";
                if (g3.length) {
                  output += g3;
                  if (g3.length === 4) {
                    output += " ";
                    if (g4.length) {
                      output += g4;
                    }
                  }
                }
              }
            }
          }
        }
      }
    );
    return output;
  }

  // Format the date -- mm/yy
  function formatDate(input) {
    let output = "";
    input.replace(/^\D*(\d{0,2})\D*(\d{0,2})/, function (match, g1, g2) {
      if (g1.length) {
        output += g1;
        if (g1.length === 2) {
          output += "/";
          if (g2.length) {
            output += g2;
          }
        }
      }
    });
    return output;
  }

  function handleCardNumber(value) {
    setCardNumber(formatCardNumber(value));
  }

  function handleDate(value) {
    setCardDate(formatDate(value));
  }

  return (
    <div className="App">
      <div className="card-container">
        <div className="card-bg"></div>
        {/* Visible Card */}
        <div className="card">
          <img src={chip} className="chip" alt="chip icon" />
          <div className="logo"></div>
          {/* Editable Bank Name */}
          <input
            type="text"
            placeholder="Bank Name"
            className="bankName"
            required
            value={bankName}
            onChange={e => setBankName(e.target.value)}
          />
          {/* Card Number */}
          <form>
            <div className="inputBox">
              <span>Card No.</span>
              <input
                type="text"
                placeholder="0123 4567 8901 1234"
                maxLength="19"
                required
                value={cardNumber}
                onChange={e => handleCardNumber(e.target.value)}
              />
            </div>
            {/* Card holder name */}
            <div className="inputBox">
              <span>Card Holder</span>
              <input
                type="text"
                placeholder="John Smith"
                required
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
            </div>
            {/* Validity and CCV */}
            <div className="group">
              <div className="inputBox">
                <span>Valid Thru</span>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  value={cardDate}
                  onChange={e => handleDate(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <span>CCV</span>
                <input
                  type="password"
                  placeholder="***"
                  maxLength="4"
                  required
                  value={cardCode}
                  onChange={e => setCardCode(e.target.value)}
                />
              </div>
            </div>
            {/* End of validity camp */}
          </form>
        </div>

        <button className="btn" onClick={() => handleSubmit()}>
          Confirm and Pay
        </button>
      </div>
    </div>
  );
}
