// components/fun/encoder.js
class MessageEncoder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // default caesar cipher shift amount
    this.shift = 3;
  }

  connectedCallback() {
    // render when component is added to page
    if (!this.shadowRoot.hasChildNodes()) {
      this.render();
    }
  }

  render() {
    // create component styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        color: #e5e7eb;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }
      
      * {
        box-sizing: border-box;
      }

      .encoder-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        visibility: visible;
        opacity: 1;
      }

      h2 {
        margin: 0 0 16px;
        color: #e5e7eb;
        font-size: clamp(20px, 3vw, 26px);
        display: block;
      }

      .description {
        color: #9aa4b2;
        margin: 0 0 20px;
        line-height: 1.6;
        font-size: 0.95rem;
        display: block;
      }

      .shift-control {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .shift-control label {
        color: #e5e7eb;
        font-size: 0.95rem;
        white-space: nowrap;
        display: inline-block;
      }

      .shift-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 8px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-size: 0.95rem;
        max-width: 100px;
      }

      .shift-input:focus {
        outline: none;
        border-color: var(--brand, #6ee7f5);
      }

      .shift-note {
        color: var(--muted, #9aa4b2);
        font-size: 0.85rem;
        margin: 0 0 20px;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .input-group label {
        color: #e5e7eb;
        font-size: 0.95rem;
        font-weight: 500;
        display: block;
      }

      textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-family: var(--font-sans, monospace);
        font-size: 0.95rem;
        line-height: 1.5;
        resize: vertical;
      }

      textarea:focus {
        outline: none;
        border-color: var(--brand, #6ee7f5);
      }

      textarea::placeholder {
        color: var(--muted, #9aa4b2);
      }

      .button-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .button {
        padding: 10px 18px;
        border-radius: 999px;
        border: 1px solid #1b2a4a;
        background: #0a1224;
        color: #d7dbe6;
        font-size: var(--size-sm);
        cursor: pointer;
        transition: border-color 0.18s ease, transform 0.18s ease;
        white-space: nowrap;
      }

      .button:hover {
        border-color: #2a4478;
      }

      .button:active {
        transform: translateY(1px);
      }

      .button.primary {
        background: linear-gradient(135deg, var(--brand, #6ee7f5) 0%, var(--brand-2, #7aa2ff) 100%);
        border-color: transparent;
        color: #0b1220;
        font-weight: 500;
        flex: 1;
        min-width: 120px;
      }

      .button.primary:hover {
        opacity: 0.9;
      }

      .button.secondary {
        background: transparent;
        border-color: var(--brand-2, #7aa2ff);
        color: var(--brand-2, #7aa2ff);
        flex: 1;
        min-width: 120px;
      }

      .button.secondary:hover {
        background: rgba(122, 162, 255, 0.1);
      }

      .output-group {
        margin-top: 8px;
      }

      .output-display {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-family: var(--font-sans, monospace);
        font-size: 0.95rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-y: auto;
      }

      .output-placeholder {
        color: var(--muted, #9aa4b2);
        font-style: italic;
      }

      .info-box {
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: rgba(122, 162, 255, 0.05);
        color: var(--muted, #9aa4b2);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-top: 16px;
      }

      .info-box strong {
        color: var(--brand, #6ee7f5);
      }
    `;

    const container = document.createElement('div');
    container.className = 'encoder-container';

    const title = document.createElement('h2');
    title.textContent = 'Message Encoder/Decoder';

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Encrypt or decrypt messages using a Caesar cipher. Each letter is shifted by a number of positions in the alphabet.';

    // shift amount control
    const shiftControl = document.createElement('div');
    shiftControl.className = 'shift-control';

    const shiftLabel = document.createElement('label');
    shiftLabel.setAttribute('for', 'shift-input');
    shiftLabel.textContent = 'Shift Amount:';

    const shiftInput = document.createElement('input');
    shiftInput.type = 'number';
    shiftInput.id = 'shift-input';
    shiftInput.className = 'shift-input';
    shiftInput.min = '1';
    shiftInput.max = '25';
    shiftInput.value = this.shift;

    // update shift value when input changes
    shiftInput.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      if (value >= 1 && value <= 25) {
        this.shift = value;
      }
    });

    // append shift control elements
    shiftControl.append(shiftLabel, shiftInput);

    // shift amount note
    const shiftNote = document.createElement('p');
    shiftNote.className = 'shift-note';
    shiftNote.textContent = '💡 Tip: Use the same shift amount to encode and decode your message.';

    // message input area
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    // input label
    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', 'message-input');
    inputLabel.textContent = 'Your Message:';

    // textarea for message input
    const textarea = document.createElement('textarea');
    textarea.id = 'message-input';
    textarea.placeholder = 'Enter your message here...';
    textarea.setAttribute('rows', '5');

    // append input label and textarea to input group
    inputGroup.append(inputLabel, textarea);

    // result output area
    const outputGroup = document.createElement('div');
    outputGroup.className = 'output-group';

    // output label
    const outputLabel = document.createElement('label');
    outputLabel.textContent = 'Result:';

    // output display area
    const outputDisplay = document.createElement('div');
    outputDisplay.className = 'output-display output-placeholder';
    outputDisplay.textContent = 'Encoded or decoded message will appear here...';

    // append output label and display area to output group
    outputGroup.append(outputLabel, outputDisplay);

    // action buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    // encode button
    const encodeBtn = document.createElement('button');
    encodeBtn.className = 'button primary';
    encodeBtn.textContent = '🔐 Encode';
    encodeBtn.addEventListener('click', () => {
      const message = textarea.value;
      if (message) {
        outputDisplay.classList.remove('output-placeholder');
        outputDisplay.textContent = this.encode(message);
      }
    });

    // decode button
    const decodeBtn = document.createElement('button');
    decodeBtn.className = 'button secondary';
    decodeBtn.textContent = '🔓 Decode';
    decodeBtn.addEventListener('click', () => {
      const message = textarea.value;
      if (message) {
        outputDisplay.classList.remove('output-placeholder');
        outputDisplay.textContent = this.decode(message);
      }
    });

    // clear button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'button';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      outputDisplay.classList.add('output-placeholder');
      outputDisplay.textContent = 'Encoded or decoded message will appear here...';
    });

    // append action buttons to button group
    buttonGroup.append(encodeBtn, decodeBtn, clearBtn);

    // info box
    const infoBox = document.createElement('div');
    infoBox.className = 'info-box';
    const infoStrong = document.createElement('strong');
    infoStrong.textContent = 'How it works: ';
    const infoText1 = document.createTextNode('The Caesar cipher shifts each letter by the shift amount. ');
    const infoText2 = document.createTextNode('For example, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on. ');
    const infoText3 = document.createTextNode('Numbers, spaces, and punctuation remain unchanged.');
    infoBox.append(infoStrong, infoText1, infoText2, infoText3);

    // append all elements to container
    container.append(
      title,
      description,
      shiftControl,
      shiftNote,
      inputGroup,
      buttonGroup,
      outputGroup,
      infoBox
    );

    // append styles and container to shadow root
    this.shadowRoot.append(style, container);
  }

  encode(message) {
    // encode message by shifting forward
    return this.caesarCipher(message, this.shift);
  }

  decode(message) {
    // decode message by shifting backward
    return this.caesarCipher(message, -this.shift);
  }

  // apply caesar cipher shift to each character
  caesarCipher(text, shift) {
    return text.split('').map(char => {
      // handle uppercase letters
      if (char >= 'A' && char <= 'Z') {
        const shifted = ((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26;
        return String.fromCharCode(shifted + 65);
      // handle lowercase letters
      } else if (char >= 'a' && char <= 'z') {
        const shifted = ((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26;
        return String.fromCharCode(shifted + 97);
      }
      // keep numbers spaces and punctuation unchanged
      return char;
    }).join('');
  }
}

customElements.define('message-encoder', MessageEncoder);
