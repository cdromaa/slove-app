const wordContainer = document.getElementById("wordContainer");

fetch('./words.json')
    .then(res => res.json())
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const post = data[randomIndex];

        // 1. Перше значення (показуємо завжди)
        const firstMeaning = post.meanings[0];
        let firstMeaningHTML = `
            <span class='above-word definition'>1. ${firstMeaning.definition}</span><br>
            <span class='above-word example'><em>${firstMeaning.example}</em></span><br>
        `;

        // 2. Усі НАСТУПНІ значення (якщо вони є) збираємо в додатковий блок
        let extraMeaningsHTML = '';
        if (post.meanings.length > 1) {
            post.meanings.slice(1).forEach((meaning, index) => {
                extraMeaningsHTML += `
                    <span class='above-word definition'>${index + 2}. ${meaning.definition}</span><br>
                    <span class='above-word example'><em>${meaning.example}</em></span><br><br>
                `;
            });
        }

        // 3. Синоніми
        let synonymsHTML = '';
        if (post.synonyms && post.synonyms.length > 0) {
            synonymsHTML = `<span class='above-word synonyms'><strong>Синоніми:</strong> ${post.synonyms.join(', ')}</span><br><br>`;
        }

        // 4. Посилання на Горох
        let cleanWord = post.word.replace(/[\u0301]/g, "");
        let linkToGorohHTML = `<a href='https://goroh.pp.ua/%D0%A2%D0%BB%D1%83%D0%BC%D0%B0%D1%87%D0%B5%D0%BD%D0%BD%D1%8F/${cleanWord}' class='link_goroh' target='_blank' rel="noopener noreferrer">Дослідити це слово (goroh.pp.ua)</a>`;

        // Перевіряємо, чи є взагалі що ховати під кнопку
        const hasExtraContent = post.meanings.length > 1 || (post.synonyms && post.synonyms.length > 0);

        // Вставляємо все в DOM один раз
        // Замість старого display: none, робимо таку структуру в innerHTML:
        wordContainer.innerHTML = `
                    <div class='word-card'>
                        <span class='word'>${post.word}<span class="star-favourite"><img src="../icons/star.svg"></span></span><br></span>
                        <span class='above-word part_of_speech'>[${post.part_of_speech}]</span>
                        <hr>
                        
                        ${firstMeaningHTML}

                        <!-- Обгортка для анімації (grid) -->
                        <div class="extra-wrapper" id="extraWrapper">
                            <div class="extra-content">
                                ${extraMeaningsHTML}
                                ${synonymsHTML}
                                ${linkToGorohHTML}
                            </div>
                        </div>

                        ${hasExtraContent ? `
                            <button class="display-more-btn" id="displayBtn">
                                <span id="btnText">Показати більше</span>
                                <img src="../icons/arrow_downward.svg" id="btnIcon" class="btn-icon">
                            </button>
                        ` : ''}
                    </div>
                `;

        // 5. Додаємо клік на кнопку (якщо кнопка є на сторінці)
        if (hasExtraContent) {
            const displayBtn = document.getElementById('displayBtn');
            const extraWrapper = document.getElementById('extraWrapper');
            const btnText = document.getElementById('btnText');
            const btnIcon = document.getElementById('btnIcon');

            let isExpanded = false;

            displayBtn.addEventListener("click", () => {
                isExpanded = !isExpanded;
                extraWrapper.classList.toggle("is-open", isExpanded); // Перемикаємо клас для плавної анімації висоти
                btnIcon.classList.toggle("rotate", isExpanded); // Обертаємо стрілочку за допомогою CSS-класу
                btnText.textContent = isExpanded ? "Показати менше" : "Показати більше"; // Змінюємо текст кнопки
            });
        }
    });