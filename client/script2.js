(loadPage = () => {
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((data) => {
      displayUser(data);
    });
})();

const userDisplay = document.querySelector(".table");

displayUser = (data) => {
  userDisplay.innerHTML = `
    <thead>
    <tr>
      <th>Id</th>
      <th>Nimi</th>
      <th>Puhelin</th>
      <th>Muokkaa</th>
      <th>Poista</th>
    </tr>
    </thead>
     
    `;
  displayRow(data);
};

displayRow = (data) => {
  data.forEach((user) => {
    userDisplay.innerHTML += `
      <tbody>
      <tr id="row-${user.id}">
          <td>${user.id}</td>
          <td>${user.nimi}</td>
          <td id="phone-${user.id}">${user.puhelin}</td>
          <td>
            <button onClick="showEditForm(${user.id}, '${user.nimi}', '${user.puhelin}')">Muokkaa</button>
          </td>
          <td>
            <button onClick="removeRow(${user.id})">x</button>
          </td>
      </tr>
      </tbody>
   
  `;
  });
};

// Tapahtumankuuntelija puhelinnumeron muokkaamiselle. Funktiossa on lisäksi tallennus- ja peruutusnapit
function showEditForm(id, currentName, currentPhone) {
  const row = document.getElementById(`row-${id}`);
  row.innerHTML = `
    <td>${id}</td>
    <td>${currentName}</td>
    <td><input type="text" id="new-phone-${id}" value="${currentPhone}" /></td>
    <td>
      <button onClick="savePhoneNumber(${id}, '${currentName}')">Tallenna</button>
      <button onClick="loadPage()">Peruuta</button>
    </td>
  `;
}

// Tapahtumankuuntelija PUT-metodille, jolla tallennetaan muokattu puhelinnumero tietokantaan
async function savePhoneNumber(id, name) {
  const newPhone = document.getElementById(`new-phone-${id}`).value;
  const url = `http://localhost:3000/items/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, nimi: name, puhelin: newPhone }),
  });

  if (response.ok) {
    console.log("Muokkaus onnistui");
    loadPage(); // Päivittää taulukon
  } else {
    console.error("Muokkaus epäonnistui");
  }
}

// Tapahtumankuuntelija DELETE-metodille, jolla poistetaan tietoja tietokannasta
async function removeRow(id) {
  const url = `http://localhost:3000/items/${id}`;
  await fetch(url, { method: "DELETE" });
  loadPage(); // Päivittää näkymän
}

loadPage();

/* removeRow = async (id) => {
  console.log(id);
  // Simple DELETE request with fetch
  let polku = "http://localhost:3000/items/" + id;
  await fetch(polku, { method: "DELETE" }).then(() =>
    console.log("Poisto onnistui")
  );
  window.location.reload(); //ladataan ikkuna uudelleen
}; */

/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);

    const responseData = await postFormDataAsJson({ url, formData });
    await loadPage(); //päivitetään taulukkoon

    console.log({ responseData });
  } catch (error) {
    console.error(error);
  }
}

const exampleForm = document.getElementById("puhelintieto_lomake");
exampleForm.addEventListener("submit", handleFormSubmit);
