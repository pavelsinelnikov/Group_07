# Group_07

## Team members

### Pavel Sinelnikov

- Github: pavelsinelnikov
- Skype: live:pavel.sinelnikov
- Role: Developer

### Andrew Tassone

- Github: drew5494
- Skype: andrew54941
- Role: Developer

## Business Description

The internet is a place where you are able to search for anything. When it comes to news media, one problem that occurs is that you are unable to get a variety of news articles from different sources that focus on a certain location that may be of interest to you. Most news articles and their sources are often localized based on your location. However, when breaking news occurs on the other side of the world, many local news sources fail to cover these stories. Even if you turn your location off, the news articles present are often from major news sources that do not represent how news sources from other countries perceive an issue. There is no effective means of retrieving news information worldwide.

Our solution is simple. We will use an API to retrieve that information. An API is an Application Programming Interface. It is used for retrieving data or tools that are located on another website. For example, we will use the **Google Maps Javascript API** which lets you add a customizable map to display on web pages and mobile devices. Our website will retrieve news information **from a specific country** using **newsapi.org**, which provides live news updates. The user can also apply specific filters such as sports, technology, business, and more on the news search to narrow down the information they are interested in. Additional filters may be added in the future. News articles, by default, will be sorted by newest first. The user has the option to sort by popularity or by oldest first.

## Use Cases

### Filter Content

#### Brief description

This use case describes the process of a user opening the website and filtering content based on a particular subject.

#### Actors

User (anyone with access to the website)

#### Preconditions

The user has the website open.

#### Basic Flow

The user clicks the dropdown menu to filter the news articles. The user then reads through a list of topics to chose from and clicks on his/her desired topic. Once a click request is made, NewsAPI will return news articles according to the chosen topic.

#### Alternate and/or exception flows

The user selects a location folowing the User picks location use case and then chosees to filter the news articles. Then, the news articles will be displayed according to the location and filter selected.

#### Post-conditions

The desired filter is applied to the news articles.

### User picks location

#### Brief description

This use case describes the process of the user picking a location which then provides them with the relevant articles from that location.

#### Actors

Users (anyone with access to the website).

#### Preconditions

The user has the website open and is on the main world map page.

#### Basic Flow

The user clicks on a country on the world map. The click requests the name of the selected country from the Google Maps API and returns the name of the selected country. After the selected country name is received, the website then converts the country name to a country code. For example, the United States becomes US. This information is then sent to the NewsAPI. The NewsAPI will return the relevant news articles from the selected country. The news articles would then would be sorted by title and with the preexisting filters that the user has put in place (if any were provided).

#### Alternate and/or exception flows

In the case of the country having no news results, an error message will be displayed indicating that there is no news of that country and the user is prompted to choose another country on the map.

#### Post-conditions

A list of news articles are displayed.

## Technological Choices

### Front-End Technologies

Front-end technologies will include:

- Vue

  Vue would be used as a Javascript framework. This will allow insertion of HTML, Javascript, and CSS styling to individual components. This will allow for a simple and expandable application to take place from the individual components.

- Bootstrap

  Bootstrap is used to properly align elements in the page and to adjust how objects are displayed depending on the page size.

### Back-End Technologies

Back-end technologies will include:

- Node.js

  Node.js is a backend technology that allows for the Vue.js application to be hosted.

- Heroku (with upgradable hosting options in the future)

  Heroku allows for a basic site hosting to run the node server and accessible from anywhere. If database technologies are needed in the future (such as registering users). Heroku has options for multiple database hosting such as PostgresSQL, mySQL, and MongoDB. Although the plan has restrictions on the RAM available and the database storage capacity. More cloud storage options would be an option if the amount of users to the website increase in the future.

### Application Programming Interfaces (APIs)

API's will include:

- Google Maps API

  The Google Maps API will provide user accessibility to a global map. This will allow the user to interact with the map and retrieve country information that is sent to NewsAPI.

- Newsapi.org API

  The NewsAPI will retrieve news article information depending on the search criteria. Some common filters for search criteria are:

  - Categories
  - Countries
  - Article names

  The "Countries" search criteria is derived from the Maps interaction by the user. Each time the user clicks on a country on the map a request gets sent to the NewsAPI and news articles are retrieved depending on the search criteria.
