class LottoNumberDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getColorForNumber(parseInt(number, 10));

    this.shadowRoot.innerHTML = `
      <style>
        .lotto-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8em;
          font-weight: bold;
          background: radial-gradient(circle at 30% 30%, ${color}, #000);
          box-shadow: 
            0 8px 15px rgba(0, 0, 0, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.2), /* Inner glow */
            0 0 30px ${color}; /* Outer glow */
          transition: transform 0.3s ease;
        }
        .lotto-number:hover {
            transform: scale(1.1);
        }
      </style>
      <div class="lotto-number">${number}</div>
    `;
  }

  getColorForNumber(number) {
    if (number <= 10) return '#f4b400'; // Yellow
    if (number <= 20) return '#4285f4'; // Blue
    if (number <= 30) return '#db4437'; // Red
    if (number <= 40) return '#0f9d58'; // Green
    return '#6a1b9a'; // Purple
  }
}

customElements.define('lotto-number-display', LottoNumberDisplay);

const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generatorBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 5) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    for (const number of numbers) {
        const numberEl = document.createElement('lotto-number-display');
        numberEl.setAttribute('number', number);
        lottoNumbersContainer.appendChild(numberEl);
    }
});
