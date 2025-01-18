     // Prevent context menu and certain keyboard shortcuts
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('keydown', function(event) {
            if (event.keyCode == 123 || (event.ctrlKey && event.shiftKey && event.keyCode == 73)) {
                event.preventDefault();
            }
        });

        const words = [
            'FUTURO', 'TECNOLOGIA', 'INOVACAO', 'ALGORITMO', 'PROGRAMACAO',
            'INTELIGENCIA', 'ARTIFICIAL', 'ROBOTICA', 'AUTOMACAO', 'VIRTUAL',
            'CIBERNETICA', 'DADOS', 'BLOQUEIO', 'NUVEM', 'INTELIGENTE',
            'CONEXAO', 'MACHINE', 'APRENDIZADO', 'NEURAL', 'DESAFIO',
            'STARTUP', 'DIGITAL', 'GAMIFICACAO', 'SUSTENTABILIDADE', 'INTERNET',
            'SISTEMA', 'EXPERIENCIA', 'FUTURISMO', 'INOVA', 'REDES',
            'INTUITIVO', 'BIOMETRIA', 'SENSOR', 'CLOUD', 'BIGDATA',
            'AUTONOMIA', 'CIBERSEGURANCA', '5G', 'REALIDADE', 'AUMENTADA',
            'VIRTUALIZACAO', 'DESIGN', 'INTERFACE', 'PALEONTOLOGIA', 'INTELIGENTE',
            'SMART', 'TECNOLOGICO', 'METAVERSO', 'DROIDE', 'HUMANOIDE',
            'GENETICA', 'BLOCKCHAIN', 'CONECTIVIDADE', 'HACKER', 'DESENVOLVIMENTO',
            'TENDENCIA', 'SUSTENTAVEL', 'SIMULACAO', 'VR', 'AR'
        ];

        let selectedWord = '';
        let guessedLetters = [];
        let mistakes = 0;
        const maxMistakes = 6;

        const wordDisplay = document.getElementById('word-display');
        const keyboard = document.getElementById('keyboard');
        const message = document.getElementById('message');
        const restartButton = document.getElementById('restart-button');

        function startGame() {
            selectedWord = words[Math.floor(Math.random() * words.length)];
            guessedLetters = [];
            mistakes = 0;
            message.textContent = '';
            message.classList.remove('win-message', 'lose-message');
            updateWordDisplay();
            createKeyboard();
        }

        function updateWordDisplay() {
            wordDisplay.textContent = selectedWord
                .split('')
                .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
                .join(' ');
        }

        function createKeyboard() {
            keyboard.innerHTML = '';
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
            letters.forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.classList.add('key');
                button.addEventListener('click', () => handleGuess(letter, button));
                keyboard.appendChild(button);
            });
        }

        function handleGuess(letter, button) {
            if (guessedLetters.includes(letter)) return;
            guessedLetters.push(letter);
            button.disabled = true;

            if (selectedWord.includes(letter)) {
                updateWordDisplay();
                checkWin();
            } else {
                mistakes++;
                checkLose();
            }
        }

        function checkWin() {
            if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
                message.textContent = 'Parabéns! Você venceu!';
                message.classList.add('win-message');
                endGame();
            }
        }

        function checkLose() {
            if (mistakes >= maxMistakes) {
                message.textContent = `Você perdeu! A palavra era ${selectedWord}.`;
                message.classList.add('lose-message');
                endGame();
            }
        }

        function endGame() {
            document.querySelectorAll('.key').forEach(button => button.disabled = true);
        }

        restartButton.addEventListener('click', startGame);

        startGame();
