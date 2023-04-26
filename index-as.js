var store = require("app-store-scraper");
const parseDomain = require("parse-domain");

// Writer CSV
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "doc/appstore/[TEST][TOP_FREE_IOS][LIFESTYLE]app-store-scrapper.csv",
  header: [
    { id: "appName", title: "App Name" },
    { id: "publisherName", title: "Publisher Name" },
    { id: "publisherDomain", title: "Publisher Domain" },
    { id: "realDomain", title: "Real Domain" },
    { id: "categorie", title: "Categorie" },
    { id: "ratingScore", title: "Rating Score" },
    { id: "ratingNumber", title: "Rating Number" },
    { id: "developerEmail", title: "Developer Email" },
  ],
});

// Get the list of the apps, sort by categories and collection
var data = [];

// Extract Email
function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

store
  .list({
    collection: store.collection.TOP_FREE_IOS,
    category: store.category.LIFESTYLE,
    num: 200,
    fullDetail: true,
  })
  .then(function (apps) {
    apps.forEach((app) => {
      // Get email from the description
      devEmailFromDescription = extractEmails(app.description);

      // Get the domain from the developer website to give to hunter.io
      if (app.developerWebsite) {
        console.log(parseDomain(app.developerWebsite));
        parsedDomain = parseDomain(app.developerWebsite);
        realDomainFromPublisherDomain =
          parsedDomain.domain + "." + parsedDomain.tld;
      } else {
        realDomainFromPublisherDomain = "";
      }

      // Write data
      data.push({
        appName: app.title,
        publisherName: app.developer,
        publisherDomain: app.developerWebsite,
        realDomain: realDomainFromPublisherDomain,
        categorie: app.genres,
        ratingScore: app.score,
        ratingNumber: app.reviews,
        developerEmail: devEmailFromDescription,
      });
      csvWriter.writeRecords(data);
    });
  })
  .catch((err) => console.log("An error occurred", err));
