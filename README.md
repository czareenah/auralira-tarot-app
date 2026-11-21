# Auralira

A premium, gesture-driven tarot application for iOS, Android, and web. The initial
setup contains only a welcome screen in the **Midnight Celestial** palette:
midnight navy `#101827`, antique gold `#C7A66D`, and ivory `#F1E8D7`.

The logo is a temporary text wordmark. Tarot sessions, deck contents, gestures,
card animations, jumper cards, and persistence behavior are future work.

## Preview in GitHub Codespaces

You only need GitHub and a browser. No Node.js, Xcode, Android Studio, or other
development tools need to be installed on your Mac.

1. Open [the repository](https://github.com/czareenah/auralira-tarot-app) on GitHub.
2. Select **setup/expo-project** in the branch selector while this PR is open.
   After merging, use `main` for a new Codespace.
3. Choose **Code → Codespaces → Create codespace on setup/expo-project**.
   The dev container installs Node 24 and runs `npm ci` automatically.
4. In the Codespace terminal, confirm the branch and start the app:

   ```sh
   git status --short --branch
   npm run web
   ```

5. Open the **Ports** panel, find **8081 — Auralira web**, and click **Open in
   Browser**. Use that forwarded address, rather than typing localhost on your Mac.
   Keep the port private; sign in to GitHub if the preview asks.
6. Edit `src/screens/WelcomeScreen.tsx` and save. The preview should refresh.
   Press **Ctrl+C** in the terminal to stop the server. Stop your Codespace when
   finished to avoid unnecessary Codespaces usage.

For an existing Codespace, switch to this branch and run `npm ci`. If its Node
version is older than 24.3, use **Codespaces: Rebuild Container** from the command
palette to apply `.devcontainer/devcontainer.json`. If port 8081 is missing,
add it in the Ports panel. If the preview is stale, restart with
`npm run web -- --clear`, then reload the forwarded page. Port forwarding is
explained in [GitHub's documentation](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace).

The Codespaces configuration is committed here; GitHub remains the source of truth.
Commit and push your changes before deleting a Codespace.

## Commands

Run these in the repository root inside your Codespace:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact versions in `package-lock.json` |
| `npm run web` | Start the web preview on port 8081 |
| `npm start` | Start Expo's development server |
| `npm run typecheck` | Check TypeScript without generating JavaScript files |
| `npm test` | Run automated tests once |
| `npm run test:watch` | Re-run tests as files change |
| `npm run check:expo` | Check installed versions against the Expo SDK |
| `npm run build:web` | Export the production web app into `dist/` |
| `npm run validate` | Run types, tests, Expo compatibility, and web export |

Node 24.3+ (24.x) is the Codespaces and CI baseline; Node 26.x is also supported.
The setup uses Expo SDK 58, React Native 0.88, React 19.3, and TypeScript 6.
The lockfile records exact resolved versions. Install future runtime libraries
with `npx expo install <package>` so Expo selects compatible versions. Install
test tools with `npx expo install <package> --dev`.

`ios` and `android` scripts are convenience commands for environments with a
connected native device or simulator; they are not required for Codespaces web
development. Native binaries can later be built remotely with Expo Application
Services (EAS). This branch does not configure app-store signing or distribution.
Web checks do not prove behavior on a physical iPhone or Android device.

## Project layout

```text
src/
  app/                 Expo Router routes; _layout.tsx configures the root stack
  screens/             Screen content; WelcomeScreen is the only implemented screen
  components/          Reusable Screen container and temporary BrandWordmark
  tarot/
    types.ts           Card metadata types, with no deck or draw logic
    data/              Reserved for the complete 78-card catalogue
  gestures/            Reserved for input hooks and gesture composition
  animations/          Reserved for Reanimated hooks and transitions
  state/               Reserved for session types, reducer, and React context
  persistence/         Reserved for a versioned AsyncStorage adapter
  theme/               Palette, spacing, layout, and system-font constants
  utils/               Reserved for small shared helpers when needed
tests/                 Automated tests, outside the route folder
.devcontainer/         Browser-based Codespaces environment and port forwarding
.github/workflows/     Validation on feature pushes and PRs targeting main
```

Files in `src/app/` describe navigation; other implementation code stays outside
that folder so it does not accidentally become a route. `@/` means `src/`, letting
imports stay readable when files move.

`app.json` sets the app name, deep-link scheme, dark appearance, platforms, and
Router plugin. `package.json` lists libraries and commands; `package-lock.json`
locks their versions. `tsconfig.json` enables strict TypeScript checks.
`babel.config.js` uses Expo's preset, which configures the installed Reanimated
Worklets plugin automatically. `jest.config.js` uses `jest-expo` for native mocks.

## Feature boundaries for the MVP

These are extension points, not implemented behavior:

| Future feature | Primary location and responsibility |
| --- | --- |
| 78-card deck | `tarot/data/`, with stable card IDs and metadata in `tarot/types.ts` |
| Hold to shuffle; release to stop | `gestures/` emits input events; `animations/` handles motion |
| Double-tap discard without reveal | `gestures/` dispatches a discard action to `state/` |
| Pull down to enter selection | `gestures/` requests a mode change owned by `state/` |
| Select face-down; tap to reveal | Screen renders session state and dispatches selection/reveal actions |
| Occasional jumper; reveal or discard | Session rules own jumper selection; UI and motion are separate |
| No duplicate draws | One authoritative session reducer owns card locations and transitions |
| Persist progress | `persistence/` loads and saves versioned snapshots via AsyncStorage |
| Reset | A session action starts a new session and updates the saved snapshot |

Prefer React context and a pure reducer when session state is introduced; no
external state library is needed now. Gestures and animations must not become the
source of truth for card ownership. Add tests for each rule as it is implemented.
Persistence should validate restored data and recover from missing/corrupt storage.

The root already mounts Gesture Handler and safe-area providers and imports
Reanimated. AsyncStorage is installed but unused until the persistence feature.
No user data is saved by the welcome screen.

## Testing and review

Run `npm run validate` before committing. The initial test renders the welcome
screen and checks its accessible Auralira heading and introductory text. GitHub
Actions repeats the validation on Linux/Node 24 for branch pushes and PRs. The
production export checks Router and web bundling as well as static rendering.

Also open the web preview at narrow and wide widths, check that text remains
readable when zoomed, and check the browser console for errors. Add native device
testing when interactive tarot features are implemented.

## Git workflow

A branch is a separate line of work: you can change files there while the stable
`main` branch stays unchanged. A commit is a named checkpoint; a pull request (PR)
proposes bringing those checkpoints into another branch for review.

- Never commit directly to `main`.
- Use a new branch for each feature, bug fix, refactor, or significant design change.
- Use `setup/`, `feature/`, `fix/`, `refactor/`, or `design/` prefixes.
- Keep commits small and descriptive; do not delete existing work without checking.
- Push the branch, finish testing, and open a PR targeting `main`.
- Never merge without the repository owner's approval.

For a new feature after this setup has been merged, first ensure your working
tree is clean (`git status`), then:

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/your-feature-name
# Make and verify the change, then stage the intended files explicitly.
git add path/to/changed-file
git commit -m "Describe the completed change"
git push -u origin feature/your-feature-name
```

If a branch already exists, inspect `git status`, `git log`, and its changes
before continuing. Do not reset, force-push, or discard another person's work.

To review this setup PR safely:

1. Confirm the PR says **base: main** and **compare: setup/expo-project**.
2. Read **Files changed** and confirm the scope is the welcome screen and setup.
3. Wait for the **Validate** check to pass, then preview the branch in Codespaces.
4. Only when you approve, use GitHub's merge button and confirm the merge.
   This task does not merge the PR or delete its branch.

## What the tools do

- **React Native** lets us describe the interface in React components and use it
  on iOS and Android. React Native Web adapts those components for the browser.
- **Expo** supplies compatible libraries, configuration, a development server,
  and build tools around React Native. We use it inside Codespaces.
- **TypeScript** adds type checks to JavaScript, catching problems such as giving
  a number to code that expects text before the app runs.
- **Expo Router** turns files in `src/app/` into navigable screens and URLs.
  `index.tsx` is the home screen and `_layout.tsx` wraps the navigation stack.
- **Reanimated** will drive smooth animations; **Gesture Handler** will recognize
  touch input; **AsyncStorage** will save non-sensitive progress on the device or
  browser. Their tarot behavior will be added in later branches.

See the official [Expo Router setup](https://docs.expo.dev/router/installation/)
and [Expo testing guide](https://docs.expo.dev/develop/unit-testing/) for details.

## Credentials and generated files

No credentials or environment variables are needed for this setup. `.gitignore`
excludes dependencies, web builds, generated native projects, local environment
files, and common signing keys. Never commit tokens or credentials. Values named
`EXPO_PUBLIC_*` are included in the client app and must never contain secrets.
AsyncStorage is unencrypted and must not be used for credentials.

## Known dependency advisories

At initial setup, `npm audit` reports 22 moderate advisories across the transitive
Expo/Jest toolchain, involving `glob` and `minimatch` and packages that depend on
them. npm's proposed automatic fixes include downgrading Expo to SDK 52 and Jest
to 29, which would break this SDK 58 setup. No forced dependency changes or
cross-major overrides are applied. Recheck compatible upstream releases before
distribution; the audit is separate from the passing app validation checks.
