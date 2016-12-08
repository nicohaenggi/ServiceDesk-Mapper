# JIRA ServiceDesk Mapper

This project is maintained by the [Helvetia Insurance Switzerland](https://www.helvetia.com/ch/content/en/home.html).

# ServiceDesk-Mapper

The project is currently setup in two branches.
- `master` also known as `stable` - The mapper 'should' be stable on this branch, and is generally well tested
- `dev` also known as `unstable` - The mapper is being developed on this branch, and is not always well tested and stable

## Support
If you discover a bug in the mapper, please search the issue tracker first. If it hasn't been reported, please create a new issue.

### Feature Requests
If you have a great idea to improve the mapper, please search the feature tracker first to ensure someone else hasn't already come up with the same idea.  If it hasn't been requested, please create a new request. While you're there vote on other feature requests to let us know what is most important to you.

### [Pull Requests](https://github.com/nicohaenggi/ServiceDesk-Mapper/pulls)
If you'd like to make your own changes ensure your PR is made against the  `dev` branch.

# Getting Started

In order to use the SAP BUS to LeanIX Mapper, you have to prepare an CSV-File containing the required custom field mappings, which is described in the next section.

#### CSV Formatting

You have to make sure that the CSV file is placed in the same folder as the other two files (`bundle.js` and `index.html`). The CSV-file must be named `customfields.csv`, otherwise the tool will not work as expected. Below, you can see the format of the CSV file which must be matched exactly.

| Field Name           | DEV               | INTG         | PROD         |
| ---------------------| -------------     | ------------ | ------------ |
| CUID Document        | customfield_13202 | customfield_13508 | customfield_13214 |
| BI Solution          | customfield_13607 | customfield_13523 | customfield_13230 |
| Transport Name       | customfield_13704 | customfield_13532 | customfield_13240 |

If you don't want to build up the CSV-file on your own, you are free to edit and rename the example file `customfields-example.csv`, which has already been prepared for you.

Currently, there is no UTF-8/Unicode support, so you'll not be able to make use of special characters such as `ä, ö or ü`.

# Installation Guide

## How To Install Deveveloper Tools

If you just want to run the web application, you don't have to install anything. However, if you want to release new builds, you've got to set up all the required developer tools.

First of all, install Node.js. We recommend the latest **Node v4.6.x** release. For more information about how to install it on your environment, see [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/). To verify your installation, run:

```bash
node -v
```

If a version is returned, you did successfully install Node.js. Next up, make sure npm is properly installed. To verify, run:

```bash
npm -v
```

If the command returns a version number, you're all set. Next, we'll clone the repository.

```bash
git clone https://github.com/nicohaenggi/ServiceDesk-Mapper.git
cd servicedesk-mapper
```

Install all the dependencies with npm.

```bash
npm install
```
Congratulations! You've successfully installed the required developer tools.

## How To Build

After having a new version ready for production, you have to make sure to create a new build. You can do this by running `npm run build`, which will trigger webpack to create a new build.

## How To Update
1. Run `git pull`  
    This will update the mapper to the latest master branch
2. Reinstall dependencies with `npm install`

## How To Run Tests

All the components in the `master` branch are well tested. There are two options for validating and testing the functionality of the mapper.

Currently, there aren't any automated tests written for the ServiceDesk-Mapper. This could be added to the roadmap for future releases.

## How To Run

The bundled web application only consists of three files, namely `customfields.csv`, `index.html` and `bundle.js`, which can be found in the `public` folder.

If you want to use the mapper, please copy the folder to your machine and simply open `index.html` with your favourite web browser (there is no support for Safari, as it prevents reading files from the file system; if you want to add support for all browsers, you have to set up a web server).

# Features
- [x] mapping from name to customfield id's and the other way around
- [x] convenient "Copy to Clipboard" button in order to maximize performance.
- [ ] unicode/utf-8 support
- [ ] automated testing with karma
- [ ] automated pulling of the custom field id's with the REST API

# Credits
- [Nico Haenggi](http://www.nicohaenggi.com): conception & development

# Copyright & License

Copyright (c) 2016 Helvetia Insurance - Released under the [MIT License](https://github.com/nicohaenggi/ServiceDesk-Mapper/blob/master/LICENSE)
