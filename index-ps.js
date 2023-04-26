var gplay = require("google-play-scraper");
const parseDomain = require("parse-domain");
var HunterSDK = require("hunterio");
require("dotenv").config();

// Hunter.io setup

var KEY = process.env.HUNTER_API_KEY;

var hunter = new HunterSDK(KEY);

// Writer CSV
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "doc/playstore/[FR][TRENDING][SPORTS]play-store-scrapper.csv",
  header: [
    { id: "appName", title: "App Name" },
    { id: "publisherName", title: "Publisher Name" },
    { id: "publisherDomain", title: "Publisher Domain" },
    { id: "realDomain", title: "Real Domain" },
    { id: "categorie", title: "Categorie" },
    { id: "installation", title: "Installations" },
    { id: "ratingScore", title: "Rating Score" },
    { id: "ratingNumber", title: "Rating Number" },
    { id: "developerEmail", title: "Developer Email" },
  ],
});

// Get the list of the apps, sort by categories and collection
var data = [];
var emails = [];
gplay
  .list({
    category: gplay.category.SPORTS,
    collection: gplay.collection.TRENDING,
    num: 500,
    country: "fr",
    fullDetail: true,
    lang: "fr",
    price: "free",
  })
  .then(function (apps) {
    apps.forEach((app) => {
      // Get the domain from the developer website to give to hunter.io
      if (app.developerWebsite) {
        parsedDomain = parseDomain(app.developerWebsite);
        realDomainFromPublisherDomain =
          parsedDomain.domain + "." + parsedDomain.tld;

        // Hunter.io call API to get the email
        hunter.domainSearch(
          {
            domain: realDomainFromPublisherDomain,
          },
          function (err, body) {
            if (err) {
              // handle error
            } else {
              // Will contain same body as the raw API call
              console.log(body.data.emails);
            }
          }
        );
      } else {
        realDomainFromPublisherDomain = "";
      }

      data.push({
        appName: app.title,
        publisherName: app.developer,
        publisherDomain: app.developerWebsite,
        realDomain: realDomainFromPublisherDomain,
        categorie: app.genre,
        installation: app.minInstalls,
        ratingScore: app.score,
        ratingNumber: app.ratings,
        developerEmail: emails,
      });
      csvWriter.writeRecords(data);
    });
  })
  .catch((err) => console.log("An error occurred", err));
