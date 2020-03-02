const inquirer = require('inquirer');
const fs = require("fs")

let username = ''

const questions = [
  "Github username >>",
  "Project title >>",
  "Project description >>",
  "Installation Steps ( Seperate with / ) >>",
  'Usage >>',
  'License >>',
  'Contributors ( Seperate with / ) >>'
];

function buildReadme(fileName, data, pp, email) {

  let installSteps = data.install.split("/")
  let stepsRaw = ``
  installSteps.forEach(step =>{
    stepsRaw += `${step}\n`
  })

  let conts = data.contributors.split("/")
  let contsRaw = ``
  conts.forEach(cont =>{
    contsRaw += `${cont}\n`
  })

  let buildCode = `
## ${data.title}

${data.description}

## Table of Contents

1. Installation
2. Usage
3. License
4. Contributors

### Installation

${stepsRaw}

### Usage

${data.usage}

### License

${data.license}

### Contributors

${contsRaw}
  `

  fs.writeFile(fileName, buildCode, (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
}

function init() {
  inquirer.prompt([
    {
      type: "input",
      name: 'username',
      message: questions[0]
    },
    {
      type: "input",
      name: 'title',
      message: questions[1]
    },
    {
      type: "input",
      name: 'description',
      message: questions[2]
    },
    {
      type: "input",
      name: 'installation',
      message: questions[3]
    },
    {
      type: "input",
      name: 'usage',
      message: questions[4]
    },
    {
      type: "input",
      name: 'license',
      message: questions[5]
    },
    {
      type: "input",
      name: 'contributors',
      message: questions[6]
    }
  ])
    .then(response => {
      let data = {
        username: response.username,
        title: response.title,
        description: response.description,
        install: response.installation,
        usage: response.usage,
        license: response.license,
        contributors: response.contributors
      };
      console.log(data)
      let fileName = `./builds/${data.title}.md`
      
      fetch(`https://api.github.com/users/${data.username}`)
        .then(r => r.json())
        .then(res => {
          console.log(res)
        })
        .catch(e => console.error(e))
      
      buildReadme(fileName, data)
    })
}

init();
