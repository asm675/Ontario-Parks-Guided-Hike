# Ontario Parks: My Guided Hike 
## Description 
* Our application aims to encourage visitors to come and explore Arrowhead park through an interactive map that reveals more information about points when you are physically close to them.
* In today's world many people would rather just sit in their home and look at something through a video or photos instead of visiting it themselves. Our app aims to curb that by showing users an ambiguous idea of the current points of interest at the park (wildlife, fauna, cultural sites, historical sites, etc.), encouraging them to come to the park and learn more (written description, audio guide from park naturalist).
* The experience is kept fresh with park naturalists being able to add, update and delete points depending on changes in the wildlife of the park, drawing attention to things that are available at certain times of the year.

## Key Features

 * An Interactive Map - The map is implemented through the Google maps API so it allows the user to move, zoom in and view other information about the park including where the visitors center and some of the campgrounds are. Satellite view and street view also allow users to envision what the park will look like.

 * Points of Interest -  We have added points to our map that allow the user to see different points of interest that are classified based on the category they belong to (Plant, Animal, Historical etc.).
 
 * Filtering POIs - The legend on the map is able to filter certain types of Point of Interests to only show points of that category, to tailor user experience.
 
 * Automatic Popup - If the user enters the range of a POI, the user is notified and the POI's corresponding details are automatically popped open.

 * Admin POI Additions - An admin, in this case a park naturalist, is able to add points to the database via the 'Admin' page. These points will then be updated on the 'Map' page on reload. These points can be available only in certain times of the year as well, after which the point will disappear.

 * Responsive Design - We anticipate that the majority of our users will be on mobile devices so we have designed all of our pages so that they are functional on mobile devices. This includes two finger scrolling on the map, resizing of elements and an updated navigation bar.

 * Ease of Use - This application is web based for ease of user access. No app download is required and all platforms can access it. Since we do not store user data this approach makes sense and decreases the amount of time for the user to set up the application. 


## Instructions to access web application

To access our project you can visit the link of our deployed project [here](https://myguidedhike.vercel.app). We have set up our web application in a way that requires no downloads or installs using Vercel to deploy the user facing page and Heroku to deploy the backend server. The landing page is the default 'About' page, the main user story of the map with points of interest displayed on it is located under the 'Map' page. An admin can add, update or delete other points of interests to the database through accessing the admin page in the footer via an admin login.  
 
## Development requirements
Requirements:
* Clone the git repository to the developer's local machine
* Make sure you have the latest Python version and the latest node.js version

### Terminal Instructions to run the app:
NOTE - This following command block assumes that the axios URLs (outlined by TODOs in the code) are set to the deployed URL of the backend application, as it is in its current state.

To install and then run the React app, type in one terminal at the root of the repository:
```
npm install
npm run build
npm start
```

### IMPORTANT - If you want to be able to run and test the backend locally concurrently with the frontend, then the axios URLs (outlined by TODOs in the code) should be set to the localhost and the below commands should all be run in one terminal before executing the above command block in a seperate terminal - the Python Django backend should be run before the React JS frontend. For the full web application to be working correctly, each terminal should be running concurrently.

In another terminal seperate to the previous step, create a virtual environment in the root of the repository:
```
python -m venv env
```
Now enter the virtual environment env depending on the operating system. Execute the line below (without writing the POSIX/Windows):
```
POSIX: source env/bin/activate
Windows: env\Scripts\activate.bat
```
Install all the requirements from the `requirements.txt` file, then migrate the Django project and run the server.
```
pip install requirements.txt
python back_end/manage.py makemigrations
python back_end/manage.py migrate
python back_end/manage.py runserver
```

## Project Structure and Relevant Files

### Frontend
Our relevant React frontend files are located in the `public` and `src` directories, with our packages and run scripts being located in the `package.json` file. Within our `public` directory, we have several icons and photos that are used throughout our application. 

In our `src` directory, we have `assets`, `components`, `Contexts` and `pages` directories. Our `assets` directory contains our header navbar and footer, as well as the CSS for the entire file. Our `components` directory contains our main user story component for the map to display on the map page, and the CSS for the Infowindow markers and legend. Our `Contexts` directory contains a reusable API context for our application. Our `pages` directory contains all the pages for the application, including the map, admin, login and about page. Also contains the relevant styling for each of these pages. In the `src` directory, we also have the `App.js` and `index.js` which contains the base for the whole React application, along with its relevant styling.

### Backend
Our Django backend files are all located in the `back_end` directory (which contains the entirety of the Django project), which is set up as two Django applications, `ontarioparks` and `PB`. We also have a `media` folder which stores all the uploaded media files. The `PB` directory contains the `settings.py` file for the settings and configuration variables for the whole Django application. The `ontarioparks` directory contains all the views, models, serializers and urls, all done with the Django REST API framework. 

In the root of our repo, we also have the `requirements.txt` file which details all the Python packages that need to be installed for the backend to run properly. 

### Miscellaneous
Both backend and frontend are stored in this single monorepo, where the backend is deployed on Heroku and the frontend is deployed on Vercel.

The files/directories labelled `assignment-2`, `deliverable-1`, `deliverable-2`, `D3 Presentation` and `Team-4-git-good.csv` are irrelevant to the project for future teams and were only done as per course requirements.

We also have a `Procfile` in the root directory, which is intended for setting the Heroku Dyno WSGI application for backend deployment. 

## Instructions for handoff and important items to note

### Transferring ownership
Our project and toolset is set up in a way such that it makes transferring the project very simple. 

To transfer ownership of the deployment, you would first need to create a Heroku and Vercel account. Then we can transfer the application on Heroku and Vercel respectively using the integrated tools for transferring. This will also make it easy to transfer the database and other addons, since they are all configured on Heroku and will transfer ownership of the addons as well as the application. Note that these platforms may require billing and payment if you do not have Github Student.

To transfer ownership of the codebase, you would need to first create a Github account. Then we can transfer the codebase using the "Transfer Ownership" functionality in Github, which will transfer the entire codebase. The integrations and permissions may need to be checked to see if they remain intact after the transfer.

### Items of importance
## Deployment and Github Workflow

### Sharing the Codebase

Our team members managed to share a codebase by creating a branch for the tasks that they want to do. This is done to minimize conflicts and to avoid pushing right to main as that is our final product. Whenever someone has implemented some functionality towards the completion of the project, they well push to their branch and create a pull request. After this pull request is created comes the review phase. IF there are merge conflicts, git will recognize them and another reviewer will flag the pull request ensuring that the changes are made before it goes live. It is up to the member who created the push to then review the merge conflicts and resolve them. If there are no merge conflicts, we have set up a two-reviewer system to review the code for both functionality and documentation. If both reviewers think the code is up to standard for our project the pull request is approved and it is pushed to the main branch. This two-reviewer system allows for a higher quality level of code and also a higher chance that the code performs it's stated functionality. We do our best to have two reviewers who understand the most about a particular pull request review them by using the request reviewer feature on GitHub, but sometimes that is not possible due to availability and the timeline for the project. Using our Vercel CI/CD frontend tool, each contributor's pull request is also deployed as a "preview" environment, to show what the frontend will look like in that branch that the project member updated. Each branch will not be able to be merged until the changes in the pull request are able to be successfully compiled and built on the Vercel deployed preview environment before being pushed to main.

### Deployment

Our deployment process starts out by writing code and getting the application to work locally on our own machines. In this case, we are using a front-facing React app with a Django backend. We decided to use Heroku to deploy our application since there are members of our team that are familiar with deploying with Heroku and it has great support for a PostgreSQL database addon, as well as node.js and python buildpacks. Initially, we meant to deploy the entire integrated application under one URL, however, we weren't able to get it working with just Heroku. Therefore, we decided to split up the deployment into frontend and backend, with each application being deployed on a different platform. The React application was deployed on Vercel since it is tailored towards frontend applications, which is what the user will be accessing. The backend was deployed on Heroku since we already had Djando and the PostgreSQL database instance set up and working already, which is what the React application will take API calls from.

## Licenses 
We will not being using a license as our partner does not want us to make the code repository public. 
