# nuno-flags-game

A game to help you learn the flags of every country recognized by the UN (193 member states).

A flag is shown at random; type a country name into the autocomplete input and submit your
guess. You have 3 lives — each wrong guess costs one. Guess all 193 flags correctly before you
run out of lives to win. Your score is the number of flags guessed correctly, and a timer tracks
how long the run took. The top 10 results (ranked by score, then by time as a tiebreaker) are
kept in a local leaderboard stored in your browser.

## Development

```
npm install
npm run dev      # start the dev server
npm run test     # run unit tests
npm run build    # production build
npm run preview  # serve the production build locally
```

## Deployment

Pushing to `main` builds the app and deploys it to GitHub Pages via the workflow in
`.github/workflows/deploy.yml`. GitHub Pages must be configured with source = "GitHub Actions"
in the repository's Settings → Pages.
