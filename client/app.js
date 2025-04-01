const submitBtn = document.querySelector(".submit");
console.log(submitBtn);

submitBtn.addEventListener("click", () => {
  processPayment();
});

const processPayment = async () => {
  fetch("http://localhost:5000/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: "603a2ac7-98e6-44c2-9d0b-c19645d33d26", quantity: 3 },
        { id: "98b84015-52c0-4751-8878-eaef46e21541", quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json(); // Call res.json()

      // If the response is not OK, parse the JSON and reject
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url; // Uncomment this if you want to redirect
    })
    .catch((e) => {
      console.error(e.error);
    });
};
