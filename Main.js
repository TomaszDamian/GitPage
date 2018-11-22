//documentation: https://github.com/TomaszDamian/JavascriptBasic/blob/master/assignment%206/wiki.md
let pictures = [];
let AllTags = [];

class Picture{
    constructor(name = "unknown", link, ...tags){
        this.name = name;
        this.link = link;
        this.tags = tags;
        pictures.push(this);
    }
}

new Picture("bunny", "http://javascriptbook.com/code/c12/img/p1.jpg", "Animators", "Illustrators");
new Picture("sea road", "http://javascriptbook.com/code/c12/img/p2.jpg", "Photographer", "Filmmakers");
new Picture("deer", "http://javascriptbook.com/code/c12/img/p3.jpg", "Photographer", "Filmmakers");
new Picture("now york map", "http://javascriptbook.com/code/c12/img/p4.jpg", "Designer");
new Picture("trumpet", "http://javascriptbook.com/code/c12/img/p5.jpg", "Photographer", "Filmmakers");
new Picture("logo", "http://javascriptbook.com/code/c12/img/p6.jpg", "Illustrators", "Designer");
new Picture("bike", "http://javascriptbook.com/code/c12/img/p7.jpg", "Photographer");
new Picture("Aqua", "http://javascriptbook.com/code/c12/img/p8.jpg", "Designer");
new Picture("kid's imagination", "http://javascriptbook.com/code/c12/img/p9.jpg", "Animators", "Illustrators");

for (let imageData of pictures){
    let ImageDiv = document.createElement("div");
    let ImageName = document.createElement("p");
    ImageName.textContent = imageData.name;

	let AllTagsForImage = "";
    let createdImage = new Image(300,150);
    createdImage.src = imageData.link;
    createdImage.alt = imageData.name;
    
    for (let tag of imageData.tags){
        tag = tag.toLowerCase();
        AllTagsForImage = AllTagsForImage + tag + " ";
		createdImage.dataset.tags = AllTagsForImage
        AllTags.push(tag);
    }
    

    ImageDiv.style.padding = "5px";
    ImageDiv.classList.add("ImgContainer")
    ImageDiv.appendChild(createdImage);
    ImageDiv.appendChild(ImageName);
    document.getElementById("Picturediv").appendChild(ImageDiv);
}

//I want to find one of each tag here
let uniqueTags = [...new Set(AllTags)];
uniqueTags.unshift("show all");

//searchbar created and appended
let searchBar = document.createElement("input");
searchBar.classList.add("input", "is-rounded");
searchBar.type = "text";
searchBar.style.width = "900px";
searchBar.addEventListener("input", Filter);
document.getElementById("Searchbar").appendChild(searchBar);

//buttons for each tag made
for(let ButtonData of uniqueTags){
    let Button = document.createElement("button");
    Button.textContent = ButtonData;
    Button.classList.add("button", "is-info");
    Button.style.margin = "5px";
    Button.addEventListener("click", ToggleAndFilter);
    document.getElementById("Tagdiv").appendChild(Button);
}

//I want one button to be "active"
let FirstButton = document.querySelector("button");
FirstButton.classList.remove("is-info");
FirstButton.classList.add("is-danger");

function ToggleAndFilter(){
    let ActiveButton = document.querySelector(".is-danger")
    ActiveButton.classList.remove("is-danger");
    ActiveButton.classList.add("is-info");

    this.classList.add("is-danger");
    Filter();
}

function Filter(){
    //getting searchbar value and puts it to lower case
    let SearchBarValue = document.querySelector("input").value;
    SearchBarValue = SearchBarValue.toLowerCase();
    
    //active tag value
    let TagValue = document.querySelector(".is-danger").textContent;

    //all img tags
    let ImgContainer = document.querySelectorAll(".ImgContainer");

    for(index = 0; index < ImgContainer.length; index++){
        //returns a array since it's getElement*s*ByTagName, can be more than one hence why the [0] is there
        let ImageName = ImgContainer[index].getElementsByTagName("img")[0].alt;
        ImageName = ImageName.toLowerCase();

        let ImageTags = ImgContainer[index].getElementsByTagName("img")[0].dataset.tags;

        if(TagValue === "show all" && SearchBarValue === ""){
            ImgContainer[index].hidden = false;
        }
        //check SearchBarValue if the TagValue is default
        else if(TagValue === "show all" && ImageName.includes(SearchBarValue)){
            ImgContainer[index].hidden = false;
        }
        //checks tag value if the SearchBarValue is default
        else if(ImageTags.includes(TagValue) && SearchBarValue === ""){
            ImgContainer[index].hidden = false;
        }
        //checks for TagValue and ImageName
        else if(ImageTags.includes(TagValue) && ImageName.includes(SearchBarValue)){
            ImgContainer[index].hidden = false;
        }
        //if all checks fail then you hide the image
        else{
            ImgContainer[index].hidden = true;
        }
    }
}
