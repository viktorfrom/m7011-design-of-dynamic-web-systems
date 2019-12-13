# M7011E
Simulation for electrical grid, power consumption, and power generation

## Setup/Installation
Use the application generator tool, express-generator, to quickly create an application skeleton.

You can run the application generator with the npx command (available in Node.js 8.2.0).
For more information see, https://expressjs.com/en/starter/generator.html
<pre><code>npx express-generator</code></pre>
For earlier Node versions, install the application generator as a global npm package and then launch it.
<pre><code>npm install -g express-generator</code></pre>
<pre><code>express</code></pre>
For example, the following creates an Express app named [insert application name]. The app will be created in a folder named [insert application name] in the current working directory and the view engine will be set to ejs:
<pre><code>express --view=ejs [insert application name]</code></pre>

### MacOS 

<pre><code>brew install node</code></pre>
Check the Node and NPM version.
<pre><code>node -v && npm -v</code></pre>

If syntax errors don't show up correctly using JS extension in VScode,
<pre><code>npm install jshint</code></pre>

In package.json add 
<pre><code> "start": "node ./simulation/model/House.js"</code></pre>

Gaussian distribution library
<pre><code>npm i gaussian
</code></pre>

Unit testing
<pre><code>npm install mocha
</code></pre>
<pre><code>npm install chai
</code></pre>

## MongoDB setup

### Linux 
<pre><code>sudo apt-get install mongodb</code></pre>
<pre><code>mongo</code></pre>

### MacOS 
For more information see, https://github.com/mongodb/homebrew-brew.
<pre><code>brew tap mongodb/brew</code></pre>
<pre><code>brew install mongodb-community</code></pre>
<pre><code>brew services start mongodb-community</code></pre>
