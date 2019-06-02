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

The internet is a place where you are able to search for anything. When it comes to news media, one problem that occurs is that you are unable to get a variety of news articles from different sources that focus on a certain location that may be of interest to you. Most news articles and their sources are often localized based on your location. However, when breaking news occurs on the other side of the world, many local news sources fail to cover these stories.  Even if you turn your location off, the news articles present are often from major news sources that do not represent how news sources from other countries perceive an issue. There is no effective means of retreiving news information worldwide.  

Our solution is simple.  By using an API or a set of tools for building softwre, the **Google Maps Javascript API** lets you customize maps with your own content and imagery for display on web pages and mobile devices. Then, our website will retrieve news information **from a specific country** using **newsapi.org**, which provides live news updates. The user can also apply specific filters such as sports, technology, politics and more on the news search to narrow down the information they are interested in.  Additional filters may be added in the future.  News articles, by default, will be sorted by newest first.  The user has the option to sort by popularity or by oldest first.

## Use Cases

### Filter Content

#### Brief description

This use case describes the process of a user opening the website and filtering content based on a particular subject.

#### Actors

User (anyone with access to the webstie)

#### Preconditions 

The user has the website open.

#### Basic Flow

The user clicks the dropdown menu to filter news articles.  The user then reads through a list of topics to chose from and clicks on his/her desired topic.  The news articles are then displayed according to the chosen topic.

#### Alternate and/or exception flows

The user can also select a location to filter. Then, the news articles will be displayed according to the location and filter selected.

#### Post-conditions

The desired filter is applied to the news articles.
