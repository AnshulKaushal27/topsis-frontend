const form = document.getElementById("topsis-form");
const statusMessage = document.getElementById("status-message");

const fileInput = document.getElementById("csvFile");
const weightsInput = document.getElementById("weights");
const impactsInput = document.getElementById("impacts");
const emailInput = document.getElementById("email");
const submitButton = form.querySelector("button");

function setFormDisabled(disabled) {
    fileInput.disabled = disabled;
    weightsInput.disabled = disabled;
    impactsInput.disabled = disabled;
    emailInput.disabled = disabled;
    submitButton.disabled = disabled;

    submitButton.style.opacity = disabled ? "0.6" : "1";
    submitButton.style.cursor = disabled ? "not-allowed" : "pointer";

    // ✅ SAFE text update
    if (submitButton) {
        submitButton.textContent = disabled ? "Running..." : "Run TOPSIS";
    }
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!fileInput.files.length) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Please upload a CSV file.";
        return;
    }

    // 🔒 Disable form
    setFormDisabled(true);

    statusMessage.style.color = "#2563eb";
    statusMessage.textContent = "Processing… Please wait.";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("weights", weightsInput.value.trim());
    formData.append("impacts", impactsInput.value.trim());
    formData.append("email", emailInput.value.trim());

    try {
        const response = await fetch("https://topsis-backend-1038.onrender.com/api/topsis/run", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
        }

        statusMessage.style.color = "green";
        statusMessage.textContent = data.message;

        form.reset();

    } catch (error) {
        statusMessage.style.color = "red";
        statusMessage.textContent = error.message;

    } finally {
        // 🔓 Re-enable form
        setFormDisabled(false);
    }
});
