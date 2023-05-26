# Tokopedia Delivery Notification
Native desktop push notification for Tokopedia delivery status, automatically update every 1 minutes
![img.png](img.png)

## Usage
- download this repo
- replace with your own fetch
- `npm install`
- `npm start`

## How to get fetch and install your fetch

- Go to delivery status page
- Open inspect element on your browser
- Go to network tab
- Clear all request
![img_1.png](img_1.png)
- Click `Lacak` button
- Click on `logisticTracking` request
- Right click, `Copy`, `Copy as Node.js fetch`
![img_2.png](img_2.png)
- Go to `index.js` 
- Replace `fetch` so it look like this
![img_3.png](img_3.png)
