// components/fun/encoder.js
class MessageEncoder extends HTMLElement {
  constructor() {
    super();
    // default caesar cipher shift amount
    this.shift = 3;
  }

  connectedCallback() {
    // render when component is added to page
    if (!this.hasChildNodes()) {
      this.render();
    }
  }

  render() {
    const container = document.createElement('div');
    container.className = 'encoder-container';

    const title = document.createElement('h2');
    title.textContent = 'Message Encoder/Decoder';

    const description = document.createElement('p');
    description.className = 'encoder-description';
    description.textContent = 'Encrypt or decrypt messages using a Caesar cipher. Each letter is shifted by a number of positions in the alphabet.';

    // shift amount control
    const shiftControl = document.createElement('div');
    shiftControl.className = 'encoder-shift-control';

    const shiftLabel = document.createElement('label');
    shiftLabel.setAttribute('for', 'shift-input');
    shiftLabel.textContent = 'Shift Amount:';

    const shiftInput = document.createElement('input');
    shiftInput.type = 'number';
    shiftInput.id = 'shift-input';
    shiftInput.className = 'encoder-shift-input';
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
    shiftNote.className = 'encoder-shift-note';
    shiftNote.textContent = '💡 Tip: Use the same shift amount to encode and decode your message.';

    // message input area
    const inputGroup = document.createElement('div');
    inputGroup.className = 'encoder-input-group';

    // input label
    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', 'message-input');
    inputLabel.textContent = 'Your Message:';

    // textarea for message input
    const textarea = document.createElement('textarea');
    textarea.id = 'message-input';
    textarea.className = 'encoder-textarea';
    textarea.placeholder = 'Enter your message here...';
    textarea.setAttribute('rows', '5');

    // append input label and textarea to input group
    inputGroup.append(inputLabel, textarea);

    // result output area
    const outputGroup = document.createElement('div');
    outputGroup.className = 'encoder-output-group';

    // output label
    const outputLabel = document.createElement('label');
    outputLabel.textContent = 'Result:';

    // output display area
    const outputDisplay = document.createElement('div');
    outputDisplay.className = 'encoder-output-display encoder-output-placeholder';
    outputDisplay.textContent = 'Encoded or decoded message will appear here...';

    // append output label and display area to output group
    outputGroup.append(outputLabel, outputDisplay);

    // action buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'encoder-button-group';

    // encode button
    const encodeBtn = document.createElement('button');
    encodeBtn.className = 'encoder-button primary';
    encodeBtn.textContent = '🔐 Encode';
    encodeBtn.addEventListener('click', () => {
      const message = textarea.value;
      if (message) {
        outputDisplay.classList.remove('encoder-output-placeholder');
        outputDisplay.textContent = this.encode(message);
      }
    });

    // decode button
    const decodeBtn = document.createElement('button');
    decodeBtn.className = 'encoder-button secondary';
    decodeBtn.textContent = '🔓 Decode';
    decodeBtn.addEventListener('click', () => {
      const message = textarea.value;
      if (message) {
        outputDisplay.classList.remove('encoder-output-placeholder');
        outputDisplay.textContent = this.decode(message);
      }
    });

    // clear button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'encoder-button';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      outputDisplay.classList.add('encoder-output-placeholder');
      outputDisplay.textContent = 'Encoded or decoded message will appear here...';
    });

    // append action buttons to button group
    buttonGroup.append(encodeBtn, decodeBtn, clearBtn);

    // info box
    const infoBox = document.createElement('div');
    infoBox.className = 'encoder-info-box';
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

    // append container to component
    this.appendChild(container);
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
