const supabase = supabase.createClient(
  "https://liuoxrdgsnvahtcfxtbi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdW94cmRnc252YWh0Y2Z4dGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNjc2MjAsImV4cCI6MjA1MTY0MzYyMH0.19oZ3mrVpBWwGqzDKvHRh854g5YS9pfkkFelEMmVxnw"
);

// Signup functionality
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Signup successful! Please check your email for confirmation.");
    }
  });
}

// Login functionality
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!");
      window.location.href = "index.html";
    }
  });
}
