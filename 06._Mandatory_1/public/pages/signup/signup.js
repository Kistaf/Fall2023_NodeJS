(() => {
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.onclick = async () => await handleSignup();
})();

const handleSignup = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) return;

  const body = {
    username: username,
    password: password,
  };

  const response = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const result = await response.json();

  if (response.status !== 200) {
    document.getElementById("error").innerText = result.message;
  }
  if (result.status === 200) {
    window.location.href = result.redirect;
  }
};
