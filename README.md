# 📱 App Store & Play Store Scraper 

This project, initially developed in 2020, is a Node.js-based web scraper for the App Store and Play Store that gathers app information and retrieves associated email addresses using the Hunter.io API. It's a powerful tool to gather valuable information about apps and their developers, which can be useful for various purposes such as app analysis, market research, or outreach campaigns.

**Please note that since this is an older project from 2020, it may not be fully functional with the latest updates of the App Store, Play Store, and Hunter.io API. Some modifications might be required to ensure compatibility.**

## Prerequisites 📚

Before you begin, make sure you have installed Node.js and npm on your computer.

## Installation 🛠️

1. Clone the repository to your computer.

   ```
   git clone https://github.com/Aktilor/scrapper-app-store.git
   ```

2. Navigate to the project directory and install the dependencies using npm.

   ```
   cd scrapper-app-store
   npm install
   ```

3. Create a `.env` file in the project root directory to store the Hunter.io API key. Replace the value with your own API key.

   ```
   HUNTER_API_KEY=your_hunter_api_key_here
   ```

## Usage 🚀

To run the scraper, execute the following command in the project directory, depending on the store you want to scrape:

For the Play Store:

```
npm run start-playstore
```

For the App Store:

```
npm run start-appstore
```

The scraper will fetch app information from the App Store or Play Store, and then use the Hunter.io API to retrieve email addresses associated with the apps' developers. The output will be stored in CSV format in the `doc` folder.

You can customize the search queries, filters, and output format by modifying the scraper's configuration settings.