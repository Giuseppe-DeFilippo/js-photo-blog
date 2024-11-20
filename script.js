/**CONSEGNA*
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto! */


console.clear();


function card() {
    const url = `https://jsonplaceholder.typicode.com/photos?_limit=6`;
    let foto = document.getElementById("foto");
    foto.innerHTML = "";
    axios.get(url).then(risp => {
        const photos = risp.data;
        console.log(photos);

        photos.forEach(photo => {
            const carta = `                                    
                <div class="photo-card debug elemento" data-url =${photo.url} data-title=${photo.title}>
                <span class="pin"><img src="img/pin.svg" alt="pin"></span>
                    <div class="image debug">
                        <img src= ${photo.url} alt="foto">
                    </div>
                    <p>${photo.title}</p>
                </div>
            `;
            foto.innerHTML += carta;
        });
        // Aggiungi gli eventi click dopo aver inserito le carte nel DOM
        figure();
    });
};

function figure() {
    const cards = document.querySelectorAll(".photo-card");
    const overlay = document.getElementById("overlay");

    cards.forEach((card) => {
        card.addEventListener("click", function () {
            const imageUrl = card.getAttribute("data-url");
            const title = card.getAttribute("data-title");

            // Crea il contenuto dell'overlay con l'immagine
            overlay.innerHTML = `
                <div class="overlay-background"></div>
                <div class="overlay-content">
                    <img src="${imageUrl}" alt="${title}" id="overlay-image">
                    <button id="close-overlay">Chiudi</button>
                </div>
                        `;
            // Mostra l'overlay
            overlay.classList.remove("d-none");
            // Aggiungi l'evento per chiudere l'overlay
            document.getElementById("close-overlay").addEventListener("click", () => {
                overlay.classList.add("d-none");
            });
            // Zoom dell'immagine al click
            const overlayImage = document.getElementById("overlay-image");
            overlayImage.addEventListener("click", () => {
                overlayImage.classList.toggle("zoomed");
            });
        });
    });
}
card()


