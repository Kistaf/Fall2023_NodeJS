fetch("/welcomeMessage?clientName=test")
  .then((response) => response.json())
  .then((result) => {
    const welcomeMessageHeader = document.getElementById("welcomeMessage");
    welcomeMessageHeader.innerText = result.data;
  });
