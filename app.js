const getDogsBtn = document.querySelector(".get-dogs");
const factsContainer = document.querySelector(".facts");

getDogsBtn.addEventListener("click", () => {
  fetch("https://dogapi.dog/api/facts?number=3")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let fact of data.facts) {
        const p = document.createElement("p");
        p.innerText = fact;
        factsContainer.append(p);
      }
    });
});
