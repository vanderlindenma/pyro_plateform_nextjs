This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Online deployement

The app is deployed on Netlify at https://pyronear-plateform-nextjs.netlify.app/. 
For a quick overview, feel free to test it there directly.

### Local deployment

You can boot a development server with any of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Login 

The app relies on the production Pyronear API for authentication.
It uses the same process as the current production Dash plateform (https://platform.pyronear.org/).
This means you'll use the same credentials you use on https://platform.pyronear.org/ to log into this app, whether online or locally

## Using up-to-date alert data

The app relies on a *static* JSON copy of the unacknowledged alerts data from the Pyronear API.
The API route for the data is https://api.pyronear.org/events/unacknowledged.
To update the data, replace `app/dashboard/example_unacknowledged_events_ungrouped.json` with the JSON response from that URL 


> ⚠️ **Warning**: Make sure you replace the content of `app/dashboard/example_unacknowledged_events_ungrouped.json`, and not the content of `app/dashboard/example_unacknowledged_events.json` (notice the `ungrouped` in the filename).
> The latter is automatically populated from the former when you run the app.


> ⚠️ **Warning**: The above URL is not publicly accessible. 
> You'll need to request access to the API from Pyronear admins and use proper credentials as part of your API request.
> If you're uncomfortable with running authenticated API requests, you can use the GUI at https://api.pyronear.org/docs# to authenticate yourself and download the data manually.

Copies of the data turn stale fairly quickly as alerts get acknowledged and their associated pictures get deleted from our cloud storage (or the certificates in the links from the static JSON file expire).
If the copy of the unacknoleged data you have on your machine is even a few days old, there's a good chance all alerts in that copy have been acknowledged by now and the app will look empty (image elements replace by broken image placeholder).


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
