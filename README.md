# M7011E - Design of Dynamic Web Systems
###### 
Project written in Node.js and javascript wrapped with Express framework for dynamic front end views, in connection to Design of Dynamic Web Systems course at Luleå University of Technology.

## Requirements
* NodeJS 10.16+
* MongoDB 4.2+
* (Optional) npm 6.9+

### Setup
Run npm install once the repository has been cloned and downloaded to install necessary dependencies
```
npm install
```
Update port nr. and address, if needed, in the following files, and Fetch APIs
```
/src/bin/www
/src/public/javascripts/house.js
/src/public/javascripts/marketprice.js
/src/public/javascripts/powerplant.js
/src/public/javascripts/region.js
```
Navigate to the folder named 'public'
```
/m7011e/src/public
```
and create a new directory named 'uploads' for user images to be uploaded
```
mkdir uploads
```
Download and install MongoDB, if needed, the database will run automatically once installed.
### Usage
Boot up the web server or perform JUnit testing in /src/simulation
```
npm start
```
and
```
npm test
```
## Authors
Group: **Awesomers**
* Viktor From - vikfro-@student.ltu.se - [viktorfrom](https://github.com/viktorfrom)

## License
Licensed under the MIT license. See [LICENSE](LICENSE) for details.