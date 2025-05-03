
let containerIndex = document.querySelector(".container-index");
let containerX = document.querySelector(".container-x");
let video = document.querySelector(".bg-video-1");
let menuItem = document.querySelectorAll(".menu-item");
let headerMenuTitle = document.querySelector(".header-menu-title");


// welcome
let welcomeWrapper = document.querySelector(".welcome-wrapper");


containerIndex.classList.add("hide");

setTimeout(function() {
	welcomeWrapper.classList.remove("hide");
}, 1000);


let gotItBtn = document.querySelector(".got-it-btn");
let bgm = document.querySelector(".background-music");
gotItBtn.addEventListener("click", function() {
	bgm.play();
	welcomeWrapper.classList.add("hide");
	containerIndex.classList.remove("hide");
});

// sound click
let sfxEnabled = true;
let soundClick = document.querySelector(".sound-click");
document.addEventListener('click', (e) => {
	
	// Sound
	if (sfxEnabled) {
		let soundClone = soundClick.cloneNode();
		soundClone.currentTime = 0;
		soundClone.volume = 0.5;
		soundClone.play();
	}
	// Visual circle
	let circle = document.createElement('div');
	circle.className = 'tap-circle';
	circle.style.left = `${e.clientX}px`;
	circle.style.top = `${e.clientY}px`;
	document.body.appendChild(circle);
	
	// Hapus circle setelah animasi selesai
	setTimeout(() => {
		circle.remove();
	}, 600);
	
});



// navbar
let menuToggle = document.querySelector(".menu-toggle");
let navbar = document.querySelector(".navbar");
let headerNavbarTitle = document.querySelector(".header-navbar-title");
menuToggle.addEventListener("click", function() {
	navbar.classList.remove("hide");
	containerIndex.classList.add("hide");
	
	// fungsi fungsi untuk checkbox
	function playAudio() {
		bgm.play();
	}
	
	function stopAudio() {
		bgm.pause();
	}
	
	function playVideo() {
		video.play();
	}
	
	function stopVideo() {
		video.pause();
	}
	
	function enableSFX() {
		sfxEnabled = true;
	}
	
	function disableSFX() {
		sfxEnabled = false;
	}
	
	
	// event listener untuk checkbox
	document.getElementById('nav-bgm').addEventListener('change', (e) => {
		e.target.checked ? playAudio() : stopAudio();
	});
	
	document.getElementById('nav-bgv').addEventListener('change', (e) => {
		e.target.checked ? playVideo() : stopVideo();
	});
	
	document.getElementById('nav-bgfx').addEventListener('change', (e) => {
		e.target.checked ? enableSFX() : disableSFX();
	});
	
	// sembunyikan navbar
	headerNavbarTitle.addEventListener("click", function() {
		navbar.classList.add("hide");
		containerIndex.classList.remove("hide");
	});
	
});

for (let i = 0; i < menuItem.length; i++) {
	menuItem[i].addEventListener("click", function() {
		
		setTimeout(function() {
			video.classList.add("scale");
			containerIndex.classList.add("hide");
			containerX.classList.remove("hide");
		}, 300); // selesaikan transisi button
	
		let pageId = menuItem[i].innerText;
		
		// pelajaran
		if (pageId == "Pelajaran") {
			
			// mencetak konten utama
			containerX.innerHTML = `
				<section class="${pageId}">
					<div class="container-btn">
						<header class="header-content">
							<h1 class="header-content-title">${pageId}</h1>
						</header>
						<div class="main-content-wrapper">
							<main class="main-content"></main>
						</div>
					</div>
					<div class="container-card hide">
						<header class="header-card">
							<h1 class="header-card-title"></h1>
						</header>
						<main class="card-content"></main>
					</div>
				</section>
			`;
			
			// mencetak tombol
			let mainContent = document.querySelector(".main-content");
			let cardContent = document.querySelector(".card-content");
			pelajaran.forEach(function(e) {
				mainContent.innerHTML += `<div class="card-btn btn-decore-1">${e.id}</div>`;
			});
			
			// events tombol diklik
			let containerBtn = document.querySelector(".container-btn");
			let cardBtn = document.querySelectorAll(".card-btn");
			let containerCard = document.querySelector(".container-card");
			let headerCardTitle = document.querySelector(".header-card-title");
			for (let j = 0; j < cardBtn.length; j++) {
				cardBtn[j].addEventListener("click", function() {
					headerCardTitle.innerText = pelajaran[j].id;
					cardContent.innerHTML = pelajaran[j].content;
					cardContent.scrollTo(0, 0);
					
					// Setup semua accordion
					setupAccordion(".title-wrapper-1", ".body-wrapper-1", ".group-wrapper-1");
					setupAccordion(".title-wrapper-2", ".body-wrapper-2", ".group-wrapper-2");
					setupAccordion(".title-wrapper-3", ".body-wrapper-3", ".group-wrapper-3");
					setupAccordion(".title-wrapper-4", ".body-wrapper-4", ".group-wrapper-4");
					setupAccordion(".title-wrapper-5", ".body-wrapper-5", ".group-wrapper-5");
					
					// Setup media card
					setupMediaCard();
					
					setTimeout(function() {
						containerBtn.classList.add("hide");
						containerCard.classList.remove("hide");
					}, 300); // selesaikan transisi button
					
				});
			}
			
			// kembali ke halaman container-x
			headerCardTitle.addEventListener("click", function() {
				containerBtn.classList.remove("hide");
				containerCard.classList.add("hide");
			});
		
		// soal
		} else if (pageId == "Soal") {
			
			let sectId, headerDesc, objCheck, textCard;
			objCheck = obj_soal;
			
			containerX.innerHTML = `
					<section class="${pageId}">
						<div class="container-btn">
							<header class="header-content">
								<h1 class="header-content-title">${pageId}</h1>
							</header>
							<div class="main-content-wrapper">
								<main class="main-content"></main>
							</div>
						</div>
						<div class="container-card hide">
							<header class="header-card">
								<h1 class="header-card-title"></h1>
							</header>
							<main class="card-content">
								<div class="timer-wrapper">
									<div id="timer">Waktu: 0 detik</div>
								</div>
								<div id="quiz"></div>
								<div class="btn-group">
									<button class="submit-btn" disabled>Cek jawaban</button>
									<button class="back-btn none">Kembali</button>
								</div>
								<div class="result"></div>
								<div class="failed"></div>
							</main>
						</div>
					</section>
			`;
			
			let containerBtn = document.querySelector(".container-btn");
			let containerCard = document.querySelector(".container-card");
			let headerCardTitle = document.querySelector(".header-card-title");
			let cardContent = document.querySelector(".card-content");
			let submitBtn = document.querySelector(".submit-btn");
			let backBtn = document.querySelector(".back-btn");
			let result = document.querySelector(".result");
			let failed = document.querySelector(".failed");
			
			let currentBabIndex, timerInterval, timeLeft;
			submitBtn.disabled = true;
			
			// Fungsi utama untuk load menu
			function loadMainMenu() {
				const mainContent = document.querySelector(".main-content");
				mainContent.innerHTML = objCheck.map((bab, index) =>
					`<div class="card-btn start-quiz-btn btn-decore-1" data-bab-index="${index}">${bab.id}</div>`
				).join('');
				
				// Menambahkan event listener pada setiap tombol
				const buttons = document.querySelectorAll('.start-quiz-btn');
				buttons.forEach(button => {
					button.addEventListener('click', (event) => {
						const babIndex = event.target.getAttribute('data-bab-index');
						startQuiz(babIndex);  // Memulai kuis saat tombol diklik
						cardContent.scrollTo(0, 0);
					});
				});
			}
			loadMainMenu();
			
			submitBtn.addEventListener('click', checkAnswer);
			backBtn.addEventListener('click', backToMain);
			
			// Fungsi untuk mulai kuis
			function startQuiz(babIndex) {
				currentBabIndex = babIndex;
				const bab = objCheck[babIndex];
				headerCardTitle.innerHTML = bab.id;
				timeLeft = bab.content.length * 30;
				containerBtn.classList.add("hide")
				containerCard.classList.remove("hide")
				result.textContent = '';
				loadQuestions(bab);
				labelClick();
				resetTimer();
				submitBtn.disabled = true;
				submitBtn.classList.remove("none");
				backBtn.classList.add("none");
				
				let images = document.querySelectorAll('.quest img');
				let spans = document.querySelectorAll('.quest span');
				images.forEach((image, i) => {
					let imageUrl = image.getAttribute('src');
					if (imageUrl && imageUrl !== '') {
						let img = new Image();
						img.onload = function() {
							spans[i].style.display = "none";
						};
						img.onerror = function() {
							image.style.display = "none";
						};
						img.src = imageUrl;
					} else {
						image.style.display = "none";
					}
				});
			}
			
			// fungsi untuk load soal dan pilihan jawaban
			function loadQuestions(bab) {
				const quizDiv = document.getElementById('quiz');
				quizDiv.innerHTML = '';
				const shuffledQuestions = shuffleArray(bab.content);
				
				shuffledQuestions.forEach((question, index) => {
					const options = getShuffledOptions(bab.content, question.q);
					quizDiv.innerHTML += 
					'<div class="question">' +
						'<div class="quest">' + 
							'<div><p>' + (index + 1) + '. </p></div>' + 
							'<div class="quest-wrapper">' +
								'<img src="' + question.p + '">' + 
								'<span>' + question.p + '</span>' +
							'</div>' + 
						'</div>' +
						'<div class="label-wrapper">' +
							options.map(function(option) {
							return '<label>' +
										'<input type="radio" class="answer" name="answer' + index + '" value="' + option + '">' +
										option +
									'</label>';
							}).join('') +
						'</div>' + 
						'<div id="feedback' + index + '" class="feedback"></div>' +
					'</div>';
				});
				
				const radioButtons = document.querySelectorAll('.answer');
				radioButtons.forEach(radio => {
					radio.addEventListener('change', enableSubmitButton);
				});
				
			}
			
			// fungsi untuk menambahkan event listener pada label
			function labelClick() {
				let labels = document.querySelectorAll("label");
				labels.forEach((label) => {
					let input = label.querySelector('input[type="radio"]');
					if (input) {
						let radioName = input.getAttribute('name');
						label.addEventListener("click", () => {
							document.querySelectorAll(`label input[name="${radioName}"]`).forEach(function(eLabel) {
								eLabel.parentElement.classList.remove("hover");
							});
							label.classList.add("hover");
						});
					}
				});
			}
			
			// fungsi untuk mengacak pilihan jawaban
			function getShuffledOptions(questions, correctAnswer) {
				const wrongAnswers = questions.filter(q => q.q !== correctAnswer).map(q => q.q);
				const randomWrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);
				const options = [correctAnswer, ...randomWrongAnswers];
				return shuffleArray(options);
			}
			
			// fungsi untuk mengacak array
			function shuffleArray(arr) {
				return arr.sort(() => Math.random() - 0.5);
			}
			
			// fungsi untuk enable tombol Cek Jawaban
			function enableSubmitButton() {
				const allAnswered = [...document.querySelectorAll('.question')]
				.every((q, i) => document.querySelector(`input[name="answer${i}"]:checked`));
				submitBtn.disabled = !allAnswered;
			}
			
			// fungsi untuk memulai timer
			function resetTimer() {
				const timerDiv = document.getElementById('timer');
				timerDiv.textContent = `Waktu: ${timeLeft} detik`;
				clearInterval(timerInterval);
				timerInterval = setInterval(() => {
					if (timeLeft < 0) {
						clearInterval(timerInterval);
						submitBtn.disabled = false;
						submitBtn.click();
					} else {
						timerDiv.textContent = `Waktu: ${timeLeft--} detik`;
					}
				}, 1000);
			}
			
			// fungsi untuk mengecek jawaban
			function checkAnswer() {
				submitBtn.disabled = true;
				submitBtn.classList.add("none");
				backBtn.classList.remove("none");
				clearInterval(timerInterval);
				timeLeft = 0;
				const bab = objCheck[currentBabIndex];
				const questions = document.querySelectorAll('.question');
				let quest = document.querySelectorAll(".quest");
				const labelWrapper = document.querySelectorAll('.question .label-wrapper');
				let correctCount = 0;
				let x = "";
				questions.forEach((q, i) => {
					const selected = document.querySelector(`input[name="answer${i}"]:checked`);
					const correctAnswer = bab.content[i].q;
					const feedbackDiv = document.getElementById(`feedback${i}`);
					quest[i].classList.add("active");
					labelWrapper[i].style.pointerEvents = "none";
					if (selected) {
						if (selected.value === correctAnswer) {
							correctCount++;
							feedbackDiv.textContent = "Benar";
							feedbackDiv.style.color = 'rgb(0,200,0)';
							x += `<div class="item" style="display:none;"></div>`;
							quest[i].style.pointerEvents = "none";
						} else {
							feedbackDiv.textContent = `Salah! Jawaban yang benar adalah ${correctAnswer}`;
							feedbackDiv.style.color = 'rgb(200,0,0)';
							x += `<div class="item"><p><b>${i + 1}. ${bab.content[i].q}</b></p></div>`;
						}
					} else {
						feedbackDiv.textContent = "Jawaban kosong"
						feedbackDiv.style.color = 'orange';
						x += `<div class="item"><p><b>${i + 1}. ${bab.content[i].q}</b></p></div>`;
					}
				});
				if (x !== undefined) {
					failed.innerHTML = x;
				}
				result.innerHTML = `
					<div class="result-wrapper">
						<h3>${bab.id}</h3>
						<p>Anda menjawab ${correctCount} dari ${questions.length} pertanyaan dengan benar.</p>
					</div>
				`;
				
				let item = document.querySelectorAll(".item");
				for (let s = 0; s < questions.length; s++) {
					item[s].addEventListener("click", function() {
						cardContent.scrollTo({
							top: questions[s].offsetTop - 62,
							behavior: "smooth"
						});
					});
					quest[s].addEventListener("click", function() {
						cardContent.scrollTo({
							top: item[s].offsetTop - 62,
							behavior: "smooth"
						});
					});
				}
				
			}
			
			// fungsi untuk kembali ke menu utama
			function backToMain() {
				// let c = confirm("Apakah yakin ingin keluar dari halaman ini?");
				// if (c) {
					failed.innerHTML = "";
					clearInterval(timerInterval);
					containerBtn.classList.remove("hide");
					containerCard.classList.add("hide");
					result.textContent = '';
				// }
			}
			
		}
		
		// kembali ke halaman index
		let headerContentTitle = document.querySelector(".header-content-title");
		headerContentTitle.addEventListener("click", function() {
			video.classList.remove("scale");
			containerIndex.classList.remove("hide");
			containerX.classList.add("hide");
			setTimeout(function() {
				containerX.innerHTML = ``;
			}, 800);
		});
		
	});
}



function setupAccordion(titleWrapperClass, bodyWrapperClass, groupWrapperClass) {
  let headerCard = document.querySelector(".header-card");
  let cardContent = document.querySelector(".card-content");
  let titleWrapper = document.querySelectorAll(titleWrapperClass);
  let bodyWrapper = document.querySelectorAll(bodyWrapperClass);
  let isTransitioning = false; // Flag global untuk mencegah klik ganda saat transisi
  
  bodyWrapper.forEach((body) => {  
    body.style.height = "0px";  
    body.style.overflow = "hidden"; // Mencegah isi body keluar saat animasi  
  });

  titleWrapper.forEach((title) => {  
    title.addEventListener("click", () => {  
      if (isTransitioning) return;  
      isTransitioning = true;  

      const group = title.closest(groupWrapperClass);  
      const body = group.querySelector(bodyWrapperClass);  
      const fullHeight = body.scrollHeight;  
      const isOpen = body.style.height !== "0px";  

      // Hapus class 'active' dari semua title  
      titleWrapper.forEach((t) => t.classList.remove("active"));  

      // Tutup semua body-wrapper lain  
      bodyWrapper.forEach((otherBody) => {  
        if (otherBody !== body && otherBody.style.height !== "0px") {  
          const otherHeight = otherBody.scrollHeight;  
          const otherDuration = Math.min(600, otherHeight * 2);  
          otherBody.style.transition = "none";  
          otherBody.style.height = otherHeight + "px";  
          void otherBody.offsetHeight;  
          otherBody.style.transition = `height ${otherDuration}ms ease`;  
          otherBody.style.height = "0px";  
        }  
      });  

      if (isOpen) {  
        // Tutup elemen yang diklik  
        body.style.transition = "none";  
        body.style.height = fullHeight + "px";  
        void body.offsetHeight;  
        const duration = Math.min(600, fullHeight * 2);  
        body.style.transition = `height ${duration}ms ease`;  
        body.style.height = "0px";  

        setTimeout(() => {  
          isTransitioning = false;  
        }, duration);  
      } else {  
        // Buka elemen yang diklik  
        const duration = Math.min(600, fullHeight * 2);  
        body.style.transition = `height ${duration}ms ease`;  
        body.style.height = fullHeight + "px";  
        title.classList.add("active");  

        body.addEventListener("transitionend", function handler(e) {  
          if (e.propertyName === "height") {  
            body.style.height = "auto";  
            body.removeEventListener("transitionend", handler);  
            isTransitioning = false;
             
            // auto scroll 
            setTimeout(() => {
            cardContent.scrollTo({  
              top: title.offsetTop - headerCard.offsetHeight,  
              behavior: "smooth"  
            });
            }, duration);
          }  
        },  
        {  
          once: true  
        });  
      }  
    });  
  });
}

function setupMediaCard() {
  let mediaCard = document.querySelectorAll(".media-card");
  let img = document.querySelectorAll("img");
  let figcaption = document.querySelectorAll("figcaption");
  for (let i = 0; i < mediaCard.length; i++) {
    mediaCard[i].addEventListener("click", function() {
      alert(`  
        ${img[i].attributes.src.value}  
        ${figcaption[i].innerText}  
      `);
    });
  }
}