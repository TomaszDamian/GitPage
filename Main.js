"use strict"

//just for simplicity and if it happens to add more images
//it will just filter those out because of the command I did on line 123
let AllTags = [];
//gets all the pictures into one array where it can be made from an object into a html image object
let pictures = [];

/*
	I added this later on because I forgot you were also supposed to have a searchbar on the webapp and I'm kinda too lazy to comment it all over again
	Basically what I did was I added 2 kinds of checks for each if statement where both have to be true for the image to appear
	one of them is a tag check, which is taken from the buttons on top and the second kind of check is the search bar check where if the name of the image doesn't match
	then it will not appear.
*/ 
function SearchNames(){
	let AllImages = document.querySelectorAll("img");
	let SelectedTag = document.querySelector(".is-danger");
	for(let image of AllImages){
		if(this.value === "" && SelectedTag.textContent === "Show All"){
			image.hidden = false;
		}
		else if(this.value === "" && image.dataset.tags.includes(SelectedTag.textContent)){
			image.hidden = false;
		}
		else{
			if(image.alt.includes(this.value) && image.dataset.tags.includes(SelectedTag.textContent)){
				image.hidden = false;
			}
			else{
				image.hidden = true;
			}
		}
	}
}

function MakeActiveButton(ActiveButton){
	//selected all buttons and gone through them all
	let AllButtons = document.querySelectorAll("button");
	for(let button of AllButtons){
		//if the button content is the same as the button then you make it red to indicate that it's selected
		if(button.textContent === ActiveButton){
			button.classList.remove("is-info");
			button.classList.add("is-danger");
		}
		else{
			//if not then the is-danger class is remove and is-info added which is the neutral state
			button.classList.remove("is-danger");
			button.classList.add("is-info")
		}
	}
}

function ButtonFilter(){
	//basically a toggle function explained above
	MakeActiveButton(this.textContent);
	let PictureContainer = document.querySelectorAll("img");
	let SearchBar = document.querySelector("input");
	//selects one pic and then goes through every single one of them
    for(let onePic of PictureContainer){
		//if the button textContent is Show All then it shows all
		//added in later is filter by both name and tag which is inputted through the searchbar
		if(this.textContent === "Show All" && SearchBar.value === ""){
			onePic.hidden = false;
		}
		else if(this.textContent === "Show All" && onePic.alt.includes(SearchBar.value)){
			onePic.hidden = false;
		}
		else{
			//else if the data-tags include the textContent of the button then you don't hide it
			if(onePic.dataset.tags.includes(this.textContent) === true && onePic.alt.includes(SearchBar.value) === true){
				onePic.hidden = false;
			}
			else{
				onePic.hidden = true;
			}
		}
	}
}

class Picture{
    constructor(name = "unknown", link, ...tags){
        this.name = name;
        this.link = link;
        this.tags = tags;
        pictures.push(this);
    }
}

//made into a class for readability and my own sanity
new Picture("bunny", "http://javascriptbook.com/code/c12/img/p1.jpg", "Animators", "Illustrators");
new Picture("sea road", "http://javascriptbook.com/code/c12/img/p2.jpg", "Photographer", "Filmmakers");
new Picture("deer", "http://javascriptbook.com/code/c12/img/p3.jpg", "Photographer", "Filmmakers");
new Picture("now york map", "http://javascriptbook.com/code/c12/img/p4.jpg", "Designer");
new Picture("trumpet", "http://javascriptbook.com/code/c12/img/p5.jpg", "Photographer", "Filmmakers");
new Picture("logo", "http://javascriptbook.com/code/c12/img/p6.jpg", "Illustrators", "Designer");
new Picture("bike", "http://javascriptbook.com/code/c12/img/p7.jpg", "Photographer");
new Picture("Aqua", "http://javascriptbook.com/code/c12/img/p8.jpg", "Designer");
new Picture("kid's imagination", "http://javascriptbook.com/code/c12/img/p9.jpg", "Animators", "Illustrators");

//gets the values of the things inside the pictures array
for (let imageData of pictures){
	//need something to hold the tags together before I add them to the image
	let TagsForThisImage = "";
	//created the image and the src and name have been assigned
    let createdImage = new Image(300,150);
    createdImage.src = imageData.link;
	createdImage.alt = imageData.name;
	//since the tags variable is an array I for ... of it to get the value and add them to the TagsForThisImage string
    for (let tag of imageData.tags){
        tag = tag.toLowerCase();
        TagsForThisImage = TagsForThisImage + tag + " ";
		createdImage.dataset.tags = TagsForThisImage
        AllTags.push(tag);
	}
	//added padding so they aren't squished together
	createdImage.style.padding = "5px";
	//appended into a specific div
    document.getElementById("Picturediv").appendChild(createdImage);
}


//make a array of tags that does not have repeats
let uniqueTags = [...new Set(AllTags)];
//need one button to show all the pictures
uniqueTags.unshift("Show All");

for(let tag of uniqueTags){
	//creates the element adds the text to it, added a event listener and appended into specific div
    let button = document.createElement("button");
	button.textContent = tag;
	button.classList.add("button", "is-info","margin-5");
    button.addEventListener("click", ButtonFilter);
    document.getElementById("Tagdiv").appendChild(button);
}

//make sure that something is selected as a tag in the beginning
//would be a problem if the searchbar code didn't have a is-danger class to get the tag
//defaults to Show All
document.querySelector("button").classList.remove("is-info");
document.querySelector("button").classList.add("is-danger");

//making the searchbar and putting it into the responding div
let Searchbar = document.createElement("input");
Searchbar.addEventListener("input", SearchNames);
document.getElementById("Searchbar").appendChild(Searchbar);