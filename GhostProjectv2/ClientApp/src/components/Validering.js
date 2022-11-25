import $ from 'jquery';

export function validerFornavn(fornavn) {
   
    //Validerer fornavn
    console.log(fornavn);
    if (!fornavn.match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
        document.getElementById("feilfornavn").textContent = "Bare bokstaver, mellom 2-20 tegn!";
        return false;
    }
    if (!fornavn) {
        document.getElementById("feilfornavn").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feilfornavn").textContent = "";
    return true;
}

export function validerEtternavn(etternavn) {
    //Validerer etternavn
    if (!etternavn.match(/^[a-zA-ZæøåÆØÅ. \-]{1,35}$/g)) {
        document.getElementById("feiletternavn").textContent = "Bare bokstaver, mellom 1-35 tegn!";
        return false;
    }
    if (!etternavn) {
        document.getElementById("feiletternavn").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feiletternavn").textContent = "";
    return true;
}

export function validerAdresse(adresse) {
    //Validerer adresse
    if (!adresse.match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,50}$/g)) {
        document.getElementById("feiladresse").textContent = "Bare bokstaver og tall, mellom 2-50 tegn!";
        return false;
    }
    if (!adresse) {
        document.getElementById("feiladresse").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feiladresse").textContent = "";
    return true;
}

export function validerPostnr(postnr) {
    //Validerer postnr
    if (!postnr.match(/^[0-9]{4}$/g)) {
        document.getElementById("feilpostnr").textContent = "Bare tall, må være 4 tegn!";
        return false;
    }
    if (!postnr) {
        document.getElementById("feilpostnr").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feilpostnr").textContent = "";
    return true;
}

export function validerPoststed(poststed) {
    //Validerer poststed
    if (!poststed.match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
        document.getElementById("feilpoststed").textContent = "Bare bokstaver, må være mellom 2-20 tegn!";
        return false;
    }
    if (!poststed) {
        document.getElementById("feilpoststed").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feilpoststed").textContent = "";
    return true;
}

export function validerBrukernavn(brukernavn) {
    //Validerer poststed
    if (!brukernavn.match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
        document.getElementById("feilbrukernavn").textContent = "Bare bokstaver og tall, mellom 6-20 tegn!";
        return false;
    }
    if (!brukernavn) {
        document.getElementById("feilbrukernavn").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feilbrukernavn").textContent = "";
    return true;
}

export function validerPassord(passord) {
    //Validerer poststed
    if (!passord.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)) {
        document.getElementById("feilpassord").textContent = "Passord må inneholde tall og bokstaver. Det skal være 6 eller fler tegn!";
        return false;
    }
    if (!passord) {
        document.getElementById("feilpassord").textContent = "Denne kan ikke være tom!";
        return false;
    }
    document.getElementById("feilpassord").textContent = "";
    return true;
}

