/* =====================================================
   PDF MAPPING & CONFIGURATION
===================================================== */

// Map chapter names to PDF file paths
const pdfMap = {
    "Structure of Chromosome.pdf": "Structure of Chromosome.pdf",
    "Genetics.pdf": "Genetics.pdf",
    "Absorption by Roots.pdf": "Absorption by Roots.pdf",
    "Transpiration.pdf": "Transpiration.pdf",
    "Photosynthesis.pdf": "Photosynthesis.pdf",
    "Chemical Coordination in.pdf": "Chemical Coordination in.pdf",
    "The Circulatory System.pdf": "The Circulatory System.pdf",
    "The Excretory System.pdf": "The Excretory System.pdf",
    "The Nervous System.pdf": "The Nervous System.pdf",
    "Sense Organs.pdf": "Sense Organs.pdf",
    "The Endocrine System.pdf": "The Endocrine System.pdf",
    "The Reproductive System.pdf": "The Reproductive System.pdf",
    "Human Evolution.pdf": "Human Evolution.pdf",
    "Population.pdf": "Population.pdf",
    "Pollution.pdf": "Pollution.pdf"
};

// Store current PDF for reference
let currentPdfFile = null;
let currentChapterName = null;


/* =====================================================
   PDF VIEWER FUNCTIONS
===================================================== */

function openPdfViewer(pdfFile, chapterName) {

    // Store current PDF
    currentPdfFile = pdfFile;
    currentChapterName = chapterName;

    // Update modal content
    document.getElementById("pdfTitle").innerText = chapterName;
    document.getElementById("pdfSubtitle").innerText = "Class 10 Biology - " + chapterName;

    // Set PDF source (replace with your PDF server URL)
    // For now, using a placeholder - you'll need to host PDFs on a server
    const pdfUrl = `/pdfs/${pdfFile}`;
    // or if using a different server:
    // const pdfUrl = `https://your-domain.com/pdfs/${pdfFile}`;

    document.getElementById("pdfFrame").src = pdfUrl;

    // Open modal
    openModal("pdfViewerModal");

    // Log for debugging (remove in production)
    console.log("Opening PDF:", pdfFile);

}


function closePdfViewer() {

    closeModal("pdfViewerModal");

    // Clear PDF source
    document.getElementById("pdfFrame").src = "";

    currentPdfFile = null;
    currentChapterName = null;

}


function downloadPdf() {

    if (!currentPdfFile) {
        alert("No PDF selected");
        return;
    }

    // Create download link
    const pdfUrl = `/pdfs/${currentPdfFile}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = currentPdfFile;
    link.click();

    // Show success message
    alert(`📥 Downloading: ${currentPdfFile}`);

}


function openPdfExternally() {

    if (!currentPdfFile) {
        alert("No PDF selected");
        return;
    }

    const pdfUrl = `/pdfs/${currentPdfFile}`;
    window.open(pdfUrl, "_blank");

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showSection(sectionId, clickedButton = null) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const selected =
        document.getElementById(sectionId);

    if (selected) {

        selected.classList.add("active");

    }


    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        button.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    updateHeader(sectionId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   HEADER
===================================================== */

function updateHeader(sectionId) {

    const titles = {

        dashboard: [
            "Dashboard",
            "Your daily biology preparation starts here."
        ],

        learn: [
            "Learn",
            "Master all 15 Biology chapters."
        ],

        quiz: [
            "Practice Quiz",
            "Test your knowledge and improve your score."
        ],

        myQuestions: [
            "My Questions",
            "Check your questions against previous-year patterns."
        ],

        progress: [
            "Progress",
            "Track your Biology preparation."
        ],

        upload: [
            "Upload Material",
            "Add your own study material."
        ]

    };


    if (titles[sectionId]) {

        document.getElementById("pageTitle").innerText =
            titles[sectionId][0];

        document.getElementById("pageSubtitle").innerText =
            titles[sectionId][1];

    }

}


/* =====================================================
   PROFILE DROPDOWN
===================================================== */

function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    menu.classList.toggle("show");

}


/* Close profile dropdown when clicking elsewhere */

document.addEventListener("click", function(event) {

    const wrapper =
        document.querySelector(".profile-wrapper");

    const menu =
        document.getElementById("profileMenu");


    if (
        wrapper &&
        !wrapper.contains(event.target)
    ) {

        menu.classList.remove("show");

    }

});


/* =====================================================
   MODALS
===================================================== */

function openModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("show");


    /* Close profile dropdown */

    const profileMenu =
        document.getElementById("profileMenu");

    if (profileMenu) {

        profileMenu.classList.remove("show");

    }


    /* Load current name */

    if (modalId === "editProfileModal") {

        const savedName =
            localStorage.getItem("biogrindName");

        document.getElementById("editName").value =
            savedName || "Student";

    }

}


function closeModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {

        modal.classList.remove("show");

    }

}


function closeModalOutside(event, modalId) {

    if (
        event.target.id === modalId
    ) {

        closeModal(modalId);

    }

}


/* =====================================================
   PROFILE NAME
===================================================== */

function saveProfile() {

    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    if (!name) {

        alert("Please enter your name.");

        return;

    }


    localStorage.setItem(
        "biogrindName",
        name
    );


    updateProfileName();


    closeModal("editProfileModal");


    alert(
        "Profile updated successfully! 🎉"
    );

}


function updateProfileName() {

    const savedName =
        localStorage.getItem(
            "biogrindName"
        ) || "Student";


    document.getElementById(
        "profileName"
    ).innerText =
        savedName;


    document.getElementById(
        "dropdownUserName"
    ).innerText =
        savedName;

}


/* =====================================================
   SETTINGS
===================================================== */

function openSetting(setting) {

    const content =
        document.getElementById(
            "settingDetailContent"
        );


    let html = "";


    /* ACCOUNT */

    if (setting === "account") {

        html = `

            <div class="modal-icon">
                👤
            </div>

            <h2>
                Account
            </h2>

            <p class="modal-subtitle">
                Manage your BioGrind account.
            </p>

            <label>
                Username
            </label>

            <input
                type="text"
                value="${localStorage.getItem("biogrindName") || "Student"}"
                disabled>

            <label>
                Class
            </label>

            <select>

                <option>
                    Class 10
                </option>

            </select>

            <button
                class="primary-btn modal-btn"
                onclick="openModal('editProfileModal'); closeModal('settingDetailModal')">

                Edit Profile

            </button>

        `;

    }


    /* NOTIFICATIONS */

    else if (setting === "notifications") {

        html = `

            <div class="modal-icon">
                🔔
            </div>

            <h2>
                Notifications
            </h2>

            <p class="modal-subtitle">
                Choose what BioGrind should remind you about.
            </p>


            <div class="toggle-row">

                <div>

                    <strong>
                        Daily Study Reminder
                    </strong>

                    <small>
                        Get reminded to study every day.
                    </small>

                </div>

                <label class="switch">

                    <input
                        type="checkbox"
                        checked>

                    <span class="slider"></span>

                </label>

            </div>


            <div class="toggle-row">

                <div>

                    <strong>
                        Quiz Reminders
                    </strong>

                    <small>
                        Get reminders to complete practice quizzes.
                    </small>

                </div>

                <label class="switch">

                    <input
                        type="checkbox"
                        checked>

                    <span class="slider"></span>

                </label>

            </div>


            <div class="toggle-row">

                <div>

                    <strong>
                        Streak Reminder
                    </strong>

                    <small>
                        Don't let your study streak break.
                    </small>

                </div>

                <label class="switch">

                    <input
                        type="checkbox">

                    <span class="slider"></span>

                </label>

            </div>

        `;

    }


    /* MODE */

    else if (setting === "mode") {

        html = `

            <div class="modal-icon">
                🌙
            </div>

            <h2>
                Appearance
            </h2>

            <p class="modal-subtitle">
                Choose your preferred appearance.
            </p>

            <button class="mode-option"
                onclick="toggleTheme(); closeModal('settingDetailModal')">

                <span>
                    ☀️
                </span>

                <div>

                    <strong>
                        Light
                    </strong>

                    <small>
                        Easy on the eyes during the day.
                    </small>

                </div>

            </button>

            <button class="mode-option"
                onclick="toggleTheme(); closeModal('settingDetailModal')">

                <span>
                    🌙
                </span>

                <div>

                    <strong>
                        Dark
                    </strong>

                    <small>
                        Better for your eyes at night.
                    </small>

                </div>

            </button>

        `;

    }


    /* HELP */

    else if (setting === "help") {

        html = `

            <div class="modal-icon">
                ❓
            </div>

            <h2>
                Help & Support
            </h2>

            <p class="modal-subtitle">
                Frequently asked questions.
            </p>

            <div class="help-item">

                <strong>
                    How do I reset my password?
                </strong>

                <p>
                    Click "Edit Profile" to update your account details.
                </p>

            </div>

            <div class="help-item">

                <strong>
                    How do I download study materials?
                </strong>

                <p>
                    Click on any chapter to open the PDF viewer, then click the Download button.
                </p>

            </div>

            <div class="help-item">

                <strong>
                    How is my progress calculated?
                </strong>

                <p>
                    Your progress is based on questions answered, accuracy, and chapters completed.
                </p>

            </div>

            <p class="support-text">
                Need more help? Contact us at support@biogrind.com
            </p>

        `;

    }


    document.getElementById(
        "settingDetailContent"
    ).innerHTML = html;

    openModal("settingDetailModal");

}


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "biogrindTheme",
        isDark ? "dark" : "light"
    );

}


function loadTheme() {

    const theme =
        localStorage.getItem("biogrindTheme");

    if (theme === "dark") {

        document.body.classList.add("dark");

    }

}


/* =====================================================
   TASKS
===================================================== */

function completeTask(checkbox) {

    const tasks =
        document.querySelectorAll(
            ".task input[type='checkbox']"
        );

    let completed = 0;

    tasks.forEach(task => {

        if (task.checked) {

            completed++;

        }

    });


    document.getElementById("taskCount").innerText =
        `${completed} / ${tasks.length}`;

}


/* =====================================================
   QUIZ
===================================================== */

const quizQuestions = [
    {
        question: "What is the basic unit of life?",
        options: [
            "Atom",
            "Cell",
            "Molecule",
            "Organ"
        ],
        correct: 1
    },
    {
        question: "Which process involves the loss of water vapor from leaves?",
        options: [
            "Photosynthesis",
            "Respiration",
            "Transpiration",
            "Fermentation"
        ],
        correct: 2
    },
    {
        question: "What is the role of mitochondria?",
        options: [
            "Protein synthesis",
            "Energy production",
            "Photosynthesis",
            "Storage"
        ],
        correct: 1
    },
    {
        question: "Which blood cells help fight infections?",
        options: [
            "Red blood cells",
            "White blood cells",
            "Platelets",
            "Plasma"
        ],
        correct: 1
    },
    {
        question: "What does DNA stand for?",
        options: [
            "Deoxyribonucleic Acid",
            "Deoxy RNA Acid",
            "Deoxyribose Nucleus Acid",
            "None of the above"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;


function startQuiz() {

    currentQuestion = 0;

    score = 0;

    loadQuestion();

}


function loadQuestion() {

    const question = quizQuestions[currentQuestion];

    document.getElementById("questionText").innerText =
        question.question;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className = "option-btn";

        button.innerText = option;

        button.onclick = () =>
            checkAnswer(index);

        optionsContainer.appendChild(button);

    });


    document.getElementById("questionNumber").innerText =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;


    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    document.getElementById("quizProgress").style.width =
        `${progress}%`;

}


function checkAnswer(selected) {

    const correct =
        quizQuestions[currentQuestion].correct;

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach((btn, index) => {

        if (index === correct) {

            btn.classList.add("correct");

        } else if (index === selected && selected !== correct) {

            btn.classList.add("wrong");

        }

        btn.disabled = true;

    });


    if (selected === correct) {

        score++;

    }


    setTimeout(() => {

        if (currentQuestion < quizQuestions.length - 1) {

            currentQuestion++;

            loadQuestion();

        } else {

            endQuiz();

        }

    }, 1500);

}


function endQuiz() {

    document.querySelector(".question-card").style.display = "none";

    document.getElementById("quizEnd").style.display = "block";

    const percentage =
        Math.round((score / quizQuestions.length) * 100);

    document.getElementById("finalScore").innerText =
        `Score: ${percentage}%`;

}


function restartQuiz() {

    document.querySelector(".question-card").style.display = "block";

    document.getElementById("quizEnd").style.display = "none";

    startQuiz();

}


/* =====================================================
   QUESTION ANALYSIS
===================================================== */

let savedQuestions = [];


function analyzeQuestion() {

    const question =
        document.getElementById(
            "questionInput"
        ).value.trim();

    const chapter =
        document.getElementById(
            "chapterSelect"
        ).value;


    if (!question) {

        alert(
            "Please enter a question."
        );

        return;

    }

    if (chapter === "Select a chapter...") {

        alert(
            "Please select a chapter."
        );

        return;

    }


    const relevance =
        calculateDemoRelevance(question, chapter);

    let importance = "";
    let pattern = "";
    let badge = "";
    let message = "";


    if (relevance >= 80) {

        importance = "Very High";

        pattern = "Strong";

        badge = "MOST IMPORTANT";

        message =
            "This is a critical question that frequently appears in previous-year boards. Practice this thoroughly!";

    }

    else if (relevance >= 60) {

        importance = "High";

        pattern = "Moderate";

        badge = "IMPORTANT";

        message =
            "This question covers an important chapter concept and should be included in your revision.";

    }

    else if (relevance >= 40) {

        importance = "Medium";

        pattern = "Partial";

        badge = "MODERATE";

        message =
            "This question is relevant to the chapter but appears less aligned with common PYQ patterns.";

    }

    else {

        importance = "Low";

        pattern = "Weak";

        badge = "LOW PRIORITY";

        message =
            "This question is related to the chapter but appears less aligned with common PYQ patterns.";

    }


    document.getElementById(
        "analysisEmpty"
    ).style.display = "none";


    document.getElementById(
        "analysisResult"
    ).style.display = "block";


    document.getElementById(
        "relevanceScore"
    ).innerText =
        `${relevance}%`;


    document.getElementById(
        "analysisMeter"
    ).style.width =
        `${relevance}%`;


    document.getElementById(
        "relevanceBadge"
    ).innerText =
        badge;


    document.getElementById(
        "resultChapter"
    ).innerText =
        chapter;


    document.getElementById(
        "importance"
    ).innerText =
        importance;


    document.getElementById(
        "pyqPattern"
    ).innerText =
        pattern;


    document.getElementById(
        "analysisMessage"
    ).innerText =
        message;


    saveQuestion(
        question,
        chapter,
        relevance,
        importance
    );

}


function calculateDemoRelevance(
    question,
    chapter
) {

    const text =
        question.toLowerCase();


    const keywords = {

        "Genetics": [
            "gene",
            "heredity",
            "trait",
            "allele",
            "mendel",
            "inheritance"
        ],

        "Photosynthesis": [
            "photosynthesis",
            "chlorophyll",
            "carbon dioxide",
            "glucose",
            "light"
        ],

        "The Circulatory System": [
            "heart",
            "blood",
            "artery",
            "vein",
            "circulation"
        ],

        "The Excretory System": [
            "kidney",
            "nephron",
            "urine",
            "excretion"
        ],

        "The Nervous System": [
            "brain",
            "neuron",
            "reflex",
            "nervous"
        ],

        "Sense Organs": [
            "eye",
            "ear",
            "vision",
            "hearing",
            "sense"
        ],

        "The Endocrine System": [
            "hormone",
            "gland",
            "thyroid",
            "pituitary",
            "insulin"
        ],

        "The Reproductive System": [
            "reproduction",
            "gamete",
            "fertilisation",
            "ovary",
            "sperm"
        ],

        "Pollution": [
            "pollution",
            "air",
            "water",
            "soil",
            "environment"
        ],

        "Human Evolution": [
            "evolution",
            "human",
            "ancestor",
            "adaptation"
        ],

        "Population": [
            "population",
            "growth",
            "birth",
            "death",
            "resources"
        ],

        "Transpiration": [
            "transpiration",
            "stomata",
            "water loss",
            "leaf"
        ],

        "Absorption by Roots": [
            "root",
            "osmosis",
            "absorption",
            "water"
        ]

    };


    const chapterKeywords =
        keywords[chapter] || [];


    let matches = 0;


    chapterKeywords.forEach(
        keyword => {

            if (
                text.includes(keyword)
            ) {

                matches++;

            }

        }
    );


    let result =
        30 + matches * 12;


    if (
        text.includes("explain")
    ) {

        result += 5;

    }


    if (
        text.includes("difference")
    ) {

        result += 5;

    }


    if (
        text.includes("why")
    ) {

        result += 5;

    }


    return Math.min(result, 95);

}


function saveQuestion(
    question,
    chapter,
    score,
    importance
) {

    savedQuestions.unshift({

        question,
        chapter,
        score,
        importance

    });


    updateSavedQuestions();

}


function updateSavedQuestions() {

    const container =
        document.getElementById(
            "savedQuestionsList"
        );


    document.getElementById(
        "savedQuestionCount"
    ).innerText =
        `${savedQuestions.length} Question${savedQuestions.length === 1 ? "" : "s"}`;


    if (
        savedQuestions.length === 0
    ) {

        container.innerHTML = `
            <p class="empty-text">
                No questions analysed yet.
            </p>
        `;

        return;

    }


    container.innerHTML =
        savedQuestions.map(
            item => `

                <div class="saved-question">

                    <div class="saved-question-header">

                        <strong>
                            ${escapeHTML(item.chapter)}
                        </strong>

                        <span class="saved-score">
                            ${item.score}%
                        </span>

                    </div>

                    <p>
                        ${escapeHTML(item.question)}
                    </p>

                    <small>
                        Importance:
                        ${item.importance}
                    </small>

                </div>

            `
        ).join("");

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.innerText = text;

    return div.innerHTML;

}


/* =====================================================
   UPLOAD
===================================================== */

function showFileName() {

    const file =
        document.getElementById(
            "pdfFile"
        ).files[0];


    if (file) {

        document.getElementById(
            "fileName"
        ).innerText =
            `Selected: ${file.name}`;

    }

}


function uploadFile() {

    const file =
        document.getElementById(
            "pdfFile"
        ).files[0];


    if (!file) {

        alert(
            "Please select a PDF first."
        );

        return;

    }


    if (
        file.type !==
        "application/pdf"
    ) {

        alert(
            "Please upload a PDF file."
        );

        return;

    }


    alert(
        `${file.name} selected successfully!\n\nBackend PDF analysis will be connected here.`
    );

}


function handleDrop(event) {

    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length > 0) {

        const file = files[0];

        if (file.type === "application/pdf") {

            document.getElementById("pdfFile").files = files;

            showFileName();

        } else {

            alert("Please drop a PDF file.");

        }

    }

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTheme();

        initChapterImages();

        updateProfileName();

        loadQuestion();

    }
);



/* =========================================================
   CHAPTER IMAGE INITIALIZER
   ========================================================= */

function initChapterImages() {
    document.querySelectorAll(".chapter-card[data-image]").forEach(card => {
        const image = card.dataset.image;
        if (image) {
            card.style.setProperty("--chapter-image", `url("${image}")`);
        }
    });
}
