(() => {
  const loginBtn = document.getElementById("login-btn");
  loginBtn.onclick = async () => await handleLogin();
})();

const handleLogin = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) return;

  const body = {
    username: username,
    password: password,
  };

  const response = await fetch("/login", {
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
