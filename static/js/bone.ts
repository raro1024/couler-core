/**
 * This File handel the Bone Frontend work
 */
document.addEventListener("DOMContentLoaded", () => init())

function init() {
    document.querySelectorAll(".boneContainer").forEach((element) => {
        if (element.getAttribute("data-multiple") === "true") {
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
    document.querySelectorAll(".recordContainer").forEach((element) => {
        console.log(element)
        if (element.getAttribute("data-multiple") === "true") {
            var btn_copyelement = document.createElement("button");
            btn_copyelement.textContent = "+";
            btn_copyelement.id = "btn_copyelement_record";

            btn_copyelement.addEventListener("click", (event) => {
                event.preventDefault();
                clickEventRecord(event)
            });



            element.appendChild(btn_copyelement);

        }
    });
    document.querySelectorAll('input[type="file"]').forEach((element) => {

        element.addEventListener("change", (e) => {
            /*
            console.log(e.target.files[0]);
            var data = new FormData()
            data.append('file', e.target.files[0])

            fetch('/file/upload', {
                method: 'POST',
                body: data
            }).then((data)=>data.json().then((data)=>{

                document.getElementById(element.id+"-filedata").value=JSON.stringify(data);
            }))*/
            if (e.target.files[0])
            {
                upload(e.target.files[0],element);
            }
        });
    });


}

function upload(file,inputElement) {
    const config = {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
        }
    }

    let data = new FormData()
    data.append('file', file)

    axios.put('/file/upload', data, config)
        .then(res=> {
            document.getElementById(inputElement.id+"-filedata").value=JSON.stringify(res["data"]);
        })
        .catch(err => console.log(err))
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
        console.log("new name")
        var name = inputElement.name.split(".").slice(0, -1).join(".") + "." + (parseInt(inputElement.name.split(".").slice(-1)) + 1)
        console.log(name)

        inputElement.name = name
    });
    newelement.querySelectorAll("#btn_copyelement").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            clickEvent(event)
        });
    });

}

function clickEventRecord(event) {

    event.preventDefault();
    var element = event.path[1];
    var newelement = element.cloneNode(true);
    insertAfter(newelement, element);
    event.path[0].remove();
    newelement.querySelectorAll("input").forEach((inputElement) => {
        var recNameOld = element.getAttribute("data-name");
        var recName = element.getAttribute("data-name");


        recName = recName.split(".").slice(0, -1).join(".") + "." + (parseInt(recName.split(".").slice(-1)) + 1)

        inputElement.name = inputElement.name.replace(recNameOld, recName);
    });
    newelement.querySelectorAll("#btn_copyelement_record").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            clickEventRecord(event)
        });
    });
    var recName = newelement.getAttribute("data-name");
    console.log("rec nmae")
    console.log(recName)
    recName = recName.split(".").slice(0, -1).join(".") + "." + (parseInt(recName.split(".").slice(-1)) + 1)
    newelement.setAttribute("data-name", recName);

}