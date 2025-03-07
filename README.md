# Puhelinluettelo

Puhelinluettelo, joka koostuu serveristä ja sitä hyödyntävästä client-sovelluksesta. Clientissä on mahdollista lisätä uusi nimi ja puhelinnumero JSON-tietokantaan POST-metodilla
ja muokkausmahdollisuus PUT-metodilla JSON-tietokantaan tallennetuille puhelinnumeroille.

## Tehtävän 5 ratkaisu

Tässä tehtävässä toteutettiin puhelinnumeron muokkaustoiminto HTML-sivulle ja sen taustalla toimivaan JavaScript-skriptiin. Ratkaisu sisälsi seuraavat päävaiheet:

1. **Dynaaminen taulukko**  
   - Käyttäjätiedot (id, nimi, puhelinnumero) haettiin palvelimelta ja näytettiin HTML-taulukossa.

2. **Muokkauslomake**  
   - "Muokkaa" -painiketta painettaessa kyseisen henkilön rivin tilalle ilmestyi syöttökenttä, jossa näkyi nykyinen puhelinnumero.
   - Nimi pysyi näkyvillä, jotta "undefined"-ongelma vältettiin.

3. **PUT-pyyntö palvelimelle**  
   - Kun käyttäjä painoi "Tallenna", päivitetty puhelinnumero lähetettiin `fetch`-pyynnöllä palvelimelle (`PUT`-metodi).
   - Samalla varmistettiin, että **nimi lähetettiin myös**, jotta se ei katoaisi JSON-tiedostosta.

4. **Koodin optimointi**  
   - `loadPage()` varmistettiin latautumaan aina, kun tiedot päivitettiin.
   - JavaScriptiin lisättiin varmistuksia ja oikeat event-käsittelijät.
