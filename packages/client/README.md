# About

This is helpful package for working with the [Albion Data Project API](), this is the initial release and feature set / docs are a bit limited right now.

There is a basic demo app that shows off how to use the methods to make a bags price lookup app in ReactJS. The code can be [viewed on the GitHub repo](https://github.com/tastypackets/albion-data-client/tree/main/packages/example-app) and the app can be [viewed on the GitHub Pages](https://tastypackets.github.io/albion-data-client/).

## Getting started

```
yarn add @albion-data/client
```

```javascript
import { getChartData } from "@albion-data/client";

getChartData({
  itemList: "T5_BAG",
})
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## Methods

All methods currently end in either `Raw` or `Data`, the `Raw` methods directly return the entire axios promise while the `Data` ones process the returned data to append UTC timezone flag to date strings and only returns the JSON data.

Fetch the chart data from the `Charts/` API

```javascript
// getChartRaw - Axios Promis
// getChartData - Promise<TChart>

getChartData({
  itemList: "T5_BAG", // Array of strings or string - required
  startDate: new Date(), // Date or date string
  endDate: new Date(), // Date or date string
  locations: "Fort Sterling", // Array of string or string
  qualities: [1,2] // Array of numbers or number
  timeScale: 1 // number 1 - 6
})
```

Fetch the gold data from the `Gold/` API

```javascript
// getGoldRaw - Axios Promis
// getGoldData - Promise<TGold>

// No Required fields, but count to limit total results is suggested
getGoldData({
  startDate: new Date(), // Date or date string
  endDate: new Date(), // Date or date string
  count: 10, // number
});
```

Fetch the price data from the `Price/` API

```javascript
// getPriceRaw - Axios Promis
// getPriceData - Promise<TPrice>

getPriceData({
  itemList: ["T5_BAG", "T6_BAG"], // Array of strings or string - required
  locations: ["Fort Sterling", "Thetford"], // Array of string or string
  qualities: 2, // Array of numbers or number
});
```

Generate icon URLs for the [Albion Render API](https://wiki.albiononline.com/wiki/API:Render_service), user must provide item identifier or the localized name and locale.

```javascript
getItemIconUrl({
  identifier: "T4_OFF_SHIELD", // String indentifier of item, like
  quality: 2; // Number repersenting the quality of the item (see QUALITIES_ENUM)
  size: 50; // Sets width and height in px
});

// Return: https://render.albiononline.com/v1/item/T4_OFF_SHIELD.png

getSpellIconUrl({
  identifier: "HASTE",
});
getDestinyBoardIconUrl({
  identifier: "ADVENTURER_ADEPT"
});
```

## Useful Data / Types

This repo exports everything export from [@albion-data/types](https://www.npmjs.com/package/@albion-data/types), here are some extra helpful types to know about.

```javascript
// QUALITIES_ENUM - Maps all enum quality numbers to string values
QUALITIES_ENUM[1]; // Normal
QUALITIES_ENUM[2]; // Good

// or generate the number used for the API call
QUALITIES_ENUM.Outstanding; // 3

// ENCHANTMENTS_ENUM - Maps enchantments to numbers, useful for parsing the API resaponse
ENCHANTMENTS_ENUM[0]; // Normal
ENCHANTMENTS_ENUM.Exceptional; // 3

// cityList - An array of all cities in the game
// marketList - An array of all markets in the game (cities + Black Market right now)

// TItemID - ALL item IDs in the game mapped to 1 TypeScript type.

// Example:

improt { TItemID } from "@albion-data/client"
```

## TODO:

- [ ] Create doc generation process
- [ ] Setup CI to auto publish
- [ ] Write unit tests
- [ ] Document feature ideas, for example auto mapping of enchantment numbers to strings.
