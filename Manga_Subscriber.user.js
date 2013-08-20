// ==UserScript==
// @name        Manga Reader Plus
// @namespace   Manga Reader Plus
// @description Allows manga subscription and shows subscribed updates in home page
// @include     http://www.mangareader.net/*
// @grant 	none
// @version     1
// ==/UserScript==


/* Initialize home page of a manga */
function initMangaPage() 
{
	/* Set background colour */
	document.body.style.background = "#400080";

	/* Get the division of manga properties */
	var properties = document.getElementById("mangaproperties");
	
	/* If the element "mangaproperties" cannot be found. The user is not on a manga page */
	if (null == properties) {
		return;
	}

	/* Title of the manga */
	var title = properties.getElementsByTagName("h1")[0];

	/* Create subscribe/unsubscribe button */
	var button = document.createElement("button");
	button.type = "button";
	

	if (isSubscribedManga(title.innerHTML.replace(" Manga", ""))) {
		/* Unsubscribe to manga */
		button.innerHTML = "UNSUBSCRIBE";
		button.addEventListener("click", function() 
			{ 
				unsubscribeManga(title.innerHTML.replace(" Manga", ""));
			}	
			, false);
	}
	else {
		/* Subscribe to manga */
		button.innerHTML = "SUBSCRIBE";	
		button.addEventListener("click", function() 
			{
				subscribeManga(title.innerHTML.replace(" Manga", ""));
			}
			, false);
	}

	button.style.fontSize = "xx-large";
	properties.insertBefore(button, title);
}

/* Check if manga is subscribed */
function isSubscribedManga(manga)
{
	/* Fetch array of subscribed mangas */
	var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

	/* No subscriptions */
	if (null == subscribedMangas) {
		return false
	}

	/* Determine whether current manga is in the array object */
	if (subscribedMangas.indexOf(manga) == -1) {
		return false; 
	}
	else {
		return true;
	}
}

/* Unsubscribe to the manga */
function unsubscribeManga(manga)
{
	/* Fetch array of subscribed mangas */
	var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

	/* Remove current manga from array */
	subscribedMangas.splice(subscribedMangas.indexOf(manga), 1);

	/* Put the new array of subscribed mangas into local storage */
	localStorage.setItem("subscribedMangas", JSON.stringify(subscribedMangas));
	location.reload();
}

/* Subscribe to the manga */
function subscribeManga(manga)
{
	/* Fetch array of subscribed mangas */
	var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

	/* If no subscriptions exist, create new array */
	if (null == subscribedMangas) {
		subscribedMangas = new Array();
	}	

	/* Add new manga to the list of subscriptions */
	subscribedMangas.push(manga);
	
	/* Set the new array of subscribed mangas into local storage */
	localStorage.setItem("subscribedMangas", JSON.stringify(subscribedMangas));
	location.reload();
}

/* Initialize the home page of manga reader */
function initHomePage()
{
	/* Get the division which holds all the lastest updates */
	var updates = document.getElementById("latestchapters");

	/* Check that the division exists. If not, most likely current page is not the 
	 * home page so return.
	 */
	if (null == updates) {
		return;
	}

	/* First child node of all updates (used as a position reference for other headers) */
	var firstHeader = updates.getElementsByTagName("h3")[0];
	
	/* Create new header that will contain recent updates of manga subscriptions */
	var subscribedUpdates = document.createElement("h3");
	subscribedUpdates.innerHTML = "Subscribed Updates";

	/* */
	updates.insertBefore(subscribedUpdates, firstHeader);
}

initMangaPage();
initHomePage();	
