/* ============================================================
   CONTACT.JS — Form Validation + EmailJS Integration
   ============================================================ */
PortfolioUtils.initPage("../", () => {
  /* ── EmailJS config ─────────────────────────────────────────
   *  Replace these values with your own from emailjs.com:
   *    1. Sign up at https://www.emailjs.com
   *    2. Add Email Service → get SERVICE_ID
   *    3. Create Email Template → get TEMPLATE_ID
   *    4. Copy Public Key from Account → PUBLIC_KEY
   * ─────────────────────────────────────────────────────────── */
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // ← replace
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // ← replace
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // ← replace

  if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    console.warn(
      "EmailJS: Keys are not configured. The form will fall back to mailto client.",
    );
  }

  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpin = submitBtn.querySelector(".btn-spinner");
  const textarea = document.getElementById("cf-message");
  const charCount = document.getElementById("char-count");

  /* ── Character counter ──────────────────────────────────── */
  if (textarea && charCount) {
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      charCount.textContent = `${len} / 500`;
      charCount.style.color = len > 450 ? "var(--warning)" : "var(--text3)";
      if (len > 500) textarea.value = textarea.value.slice(0, 500);
    });
  }

  /* ── Validation ─────────────────────────────────────────── */
  function validate(id, errId, condition, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!condition) {
      el.classList.add("error");
      if (err) err.textContent = msg;
      return false;
    }
    el.classList.remove("error");
    if (err) err.textContent = "";
    return true;
  }

  function validateForm() {
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const subject = document.getElementById("cf-subject").value.trim();
    const message = textarea.value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const v1 = validate(
      "cf-name",
      "err-name",
      name.length >= 2,
      "Name must be at least 2 characters.",
    );
    const v2 = validate(
      "cf-email",
      "err-email",
      emailRx.test(email),
      "Please enter a valid email address.",
    );
    const v3 = validate(
      "cf-subject",
      "err-subject",
      subject.length >= 3,
      "Subject must be at least 3 characters.",
    );
    const v4 = validate(
      "cf-message",
      "err-message",
      message.length >= 10,
      "Message must be at least 10 characters.",
    );

    return v1 && v2 && v3 && v4;
  }

  /* ── Submit handler ─────────────────────────────────────── */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show loading state
    btnText.style.display = "none";
    btnSpin.style.display = "inline";
    submitBtn.disabled = true;

    const templateParams = {
      from_name: document.getElementById("cf-name").value.trim(),
      from_email: document.getElementById("cf-email").value.trim(),
      subject: document.getElementById("cf-subject").value.trim(),
      inquiry_type: document.getElementById("cf-type").value || "Not specified",
      message: textarea.value.trim(),
      to_name: "Rajveer Singh",
    };

    try {
      if (
        typeof emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
      ) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
        );
        showToast(
          "✓ Message sent successfully! I'll respond within 24 hours.",
          "success",
        );
        form.reset();
        charCount.textContent = "0 / 500";
      } else {
        // Fallback: mailto link (no EmailJS configured)
        const subject = encodeURIComponent(templateParams.subject);
        const body = encodeURIComponent(
          `Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\nType: ${templateParams.inquiry_type}\n\n${templateParams.message}`,
        );
        window.open(
          `mailto:rajveersinghshekhawat3234@gmail.com?subject=${subject}&body=${body}`,
        );
        showToast(
          "Opening email client... (Set up EmailJS for direct delivery)",
          "info",
        );
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      showToast(
        "Failed to send. Please email directly: rajveersinghshekhawat3234@gmail.com",
        "error",
      );
    }

    btnText.style.display = "inline";
    btnSpin.style.display = "none";
    submitBtn.disabled = false;
  });

  /* ── Live validation on blur ─────────────────────────────── */
  ["cf-name", "cf-email", "cf-subject", "cf-message"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("blur", () => {
        el.classList.remove("error");
        const errEl = document.getElementById(`err-${id.replace("cf-", "")}`);
        if (errEl) errEl.textContent = "";
      });
  });
});
