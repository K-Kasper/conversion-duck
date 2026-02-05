# Conversion Duck

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/gmmmfkfijagbmdcnbmfiehhdcpioipmm)](https://chrome.google.com/webstore/detail/conversion-duck/gmmmfkfijagbmdcnbmfiehhdcpioipmm)
![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/stars/gmmmfkfijagbmdcnbmfiehhdcpioipmm)

A Chrome extension for converting currency, length, mass and temperature.

![Promo Image](promo.png)

## Description

This is an extension of mine that I've decided to make source-available. The frontend code was last altered on May 20, 2023.

Get the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/conversion-duck/gmmmfkfijagbmdcnbmfiehhdcpioipmm).

The extension works offline, but when online, it gets new currency rates from my API. The API gets updated rates every hour.

This source-available repo includes a simple Express server I originally used for hosting. In production, the backend now uses a serverless architecture on AWS (Lambda, S3, and CloudFront), but functions similarly.
