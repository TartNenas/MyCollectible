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

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("❌ Signup Error:", error.message);
        alert("Signup failed: " + error.message);
      } else {
        console.log("✅ Signup Data:", data);
        alert("Signup successful! Please check your email for confirmation.");
      }
    } catch (err) {
      console.error("❗Unexpected Error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  });
}

// Login functionality
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Login Error:", error.message);
        alert("Login failed: " + error.message);
      } else {
        console.log("✅ Login Successful!", data);

        // Fetch user data from 'users' table
        const { data: userData, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (fetchError) {
          console.error("❌ Fetch Error:", fetchError.message);
          alert("Failed to fetch user data: " + fetchError.message);
        } else {
          console.log("✅ User Data:", userData);
          alert(`Welcome back, ${userData.email}!`);
          window.location.href = "index.html";
        }
      }
    } catch (err) {
      console.error("❗Unexpected Error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  });
} else {
  console.error("❌ Login form not found in the DOM!");
}
