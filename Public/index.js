let div = document.querySelector(".test");
div.textContent = "Rien à voir pour l'instant";
let input = document.getElementById("message");

let socket = io();

socket.on("connect", () => {
  console.log("Connected to server.");
});

socket.on("hello-test", (message) => {
  input.addEventListener("input", (e) => {
    div.textContent = e.target.value;
    console.log(div.textContent);
  });
});

socket.on("disconnect", () => {
  console.log("Disconnecred from  server.");
});
