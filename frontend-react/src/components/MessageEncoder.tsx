import { useState } from "react";

export default function MessageEncoder() {
  const [shift, setShift] = useState(3);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");

  const caesar = (text: string, offset: number) =>
    text
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") return String.fromCharCode((((char.charCodeAt(0) - 65 + offset) % 26 + 26) % 26) + 65);
        if (char >= "a" && char <= "z") return String.fromCharCode((((char.charCodeAt(0) - 97 + offset) % 26 + 26) % 26) + 97);
        return char;
      })
      .join("");

  return (
    <div className="encoder-container">
      <h2>Message Encoder/Decoder</h2>
      <p className="encoder-description">Encrypt or decrypt messages using a Caesar cipher.</p>
      <input
        id="shift-input"
        type="number"
        className="encoder-shift-input"
        min={1}
        max={25}
        value={shift}
        onChange={(e) => setShift(Number(e.target.value || 0))}
      />
      <textarea id="message-input" className="encoder-textarea" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className="encoder-button-group">
        <button className="encoder-button primary" type="button" onClick={() => setOutput(caesar(message, shift))}>
          Encode
        </button>
        <button className="encoder-button secondary" type="button" onClick={() => setOutput(caesar(message, -shift))}>
          Decode
        </button>
      </div>
      <div className="encoder-output-display">{output || "Encoded or decoded message will appear here..."}</div>
    </div>
  );
}
