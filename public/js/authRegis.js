document.addEventListener("DOMContentLoaded", function () {
    const cities = [
        "Jakarta Pusat", "Jakarta Utara", "Jakarta Selatan", "Jakarta Timur", "Jakarta Barat",
        "Bogor", "Depok", "Tangerang", "Tangerang Selatan", "Bekasi"
    ];
    const select = document.getElementById("play-area");

    cities.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
});


function checkPasswordStrength() {
    const passwordInput = document.getElementById("password").value;
    const strengthText = document.getElementById("password-strength-text");
    const uppercaseWarning = document.getElementById("password-uppercase-warning");
    const symbolWarning = document.getElementById("password-symbol-warning");

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,]).{8,}$/;
    const hasUppercase = /[A-Z]/.test(passwordInput);
    const hasSymbol = /[@$!%*?&.,]/.test(passwordInput);

    // Reset pesan peringatan
    uppercaseWarning.textContent = "";
    symbolWarning.textContent = "";

    if (!hasUppercase) {
        uppercaseWarning.textContent = "Gunakan setidaknya satu huruf besar!";
    }

    if (!hasSymbol) {
        symbolWarning.textContent = "Gunakan setidaknya satu karakter simbol! (@, $, !, %, *, ?, &, ., ,)";
    }

    if (strongRegex.test(passwordInput)) {
        strengthText.textContent = "Password kuat!";
        strengthText.classList.remove("text-danger");
        strengthText.classList.add("text-success");
    } else {
        strengthText.textContent = "Password lemah!";
        strengthText.classList.remove("text-success");
        strengthText.classList.add("text-danger");
    }
}


document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "🙈"; // Ubah ikon menjadi mata tertutup
    } else {
        passwordInput.type = "password";
        this.textContent = "👁️"; // Ubah ikon menjadi mata terbuka
    }
});
