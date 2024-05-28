# Conversion Duck

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/gmmmfkfijagbmdcnbmfiehhdcpioipmm)](https://chrome.google.com/webstore/detail/conversion-duck/gmmmfkfijagbmdcnbmfiehhdcpioipmm)
![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/stars/gmmmfkfijagbmdcnbmfiehhdcpioipmm)

A Chrome extension for converting currency, length, mass and temperature.

![Promo Image](promo.png)

## Description

This is an extension of mine that I've decided to make source-available. The frontend code was last altered on May 20, 2023.

Get the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/conversion-duck/gmmmfkfijagbmdcnbmfiehhdcpioipmm).

The extension works offline, but when online, it gets new currency rates from my API. The API gets updated rates every hour.

This source-available repo uses a simple Express server that I used to host on a server. Nowadays, in production, the backend uses a serverless architecture, but it still works very similarly. First, it used to be hosted on AWS using Lambda, S3 and CloudFront. However, now it's running on Cloudflare Workers and D1.
