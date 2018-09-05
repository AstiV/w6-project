function ShowHidePrice() {
    var Professional = document.getElementById("Professional");
    var showPrice = document.getElementById("showPrice");
    showPrice.style.display = Professional.checked ? "block" : "none";
}

$(document).ready(function() {
    $("#add-input-btn").click(function() {
        console.log("button was clicked");
        $("#language-input-wrapper").append(form);
    });
});

let form = `<div id="language-input-wrapper">
        <label for="language">Add Language</label>
        <select name="language" id="language">
            <option value=""></option>
            <option value="Oromo">Oromo</option>
            <option value="Dari">Dari</option>
            <option value="Fula">Fula</option>
            <option value="Maninka">Maninka</option>
            <option value="Tigrinya">Tigrinya</option>
            <option value="Wolof">Wolof</option>
        </select>
        <label for="level">Level</label>
        <select name="level" id="level">
            <option value=""></option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
        </select>
    </div>`;
