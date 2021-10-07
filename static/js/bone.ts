/**
 * This File handel the Bone Frontend work
 */
document.addEventListener("DOMContentLoaded", () => init())

function init() {
    document.querySelectorAll(".boneContainer").forEach((element) => {

        if (element.getAttribute("data-multiple")) {
            var btn_copyelement = document.createElement("button");
            btn_copyelement.textContent = "+";
            btn_copyelement.id = "btn_copyelement";
            btn_copyelement.addEventListener("click", (event) => {
                event.preventDefault();
                clickEvent(event)
            });



            element.appendChild(btn_copyelement);

        }
    });

}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function clickEvent(event) {
    console.log(event)
    event.preventDefault();
    var element = event.path[1];
    var newelement = element.cloneNode(true);
    insertAfter(newelement, element);
    event.path[0].remove();
    newelement.querySelectorAll("input").forEach((inputElement) => {
        inputElement.name = inputElement.name.split(":")[0] + ":" + (parseInt(inputElement.name.split(":")[1]) + 1) //VErstehe ich natürlich bald noch
    });
    newelement.querySelectorAll("#btn_copyelement").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            clickEvent(event)
        });
    });

}