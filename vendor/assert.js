function assert(value, desc) {
    switch(arguments.length) {
        case 0:
            var br = document.createElement("br");
            document.body.appendChild(br);
            break;
        default :
            var li = document.createElement("li");
            li.style.color = value ? "green" : "red";
            li.appendChild(document.createTextNode(desc));

            var list = document.getElementById("results");
            if (!list) {
                list = document.createElement("ul");
                document.body.appendChild(list);
            }
            list.appendChild(li);
            break;
    }
}

//assert(true, "This passes.");
//assert(false, "This fails.");