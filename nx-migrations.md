# Nx Migration Notes

## Migrate from Nx@19.4.2 to Nx@20 (31.01.2025)

The current version of Nx in use is 19.4.2 so start by migrating the to most recent v19 version, which is 19.8.14

```bash
> nx migrate nx@19.8.14
> mx migrate --run-migrations
```

After running the migrations angular packages updated to more recent V18 versions. Quickly serve up the app to make sure everything is still working ok.

Next delete the migrations.json file and migrate to initial V20 version

```bash
> nx migrate nx@20.0.0
> nx migrate --run-migrations
```

Once again do a quick serve and run to make sure tha pp is working ok.

Now finish migration by mograting to the latest version

```bash
> nx migrate nx@latest
```

At the time of execution the latest nx version was 20.4.0. Angular updated to 19.1.4 and angular/material to 19.1.2.

Next update @angular/fire and firebase packages to match Angular V19.

```bash
> npm install @angular/fire@latest @firebase@^11.2.0
> nx migrate --run-migrations
```

This created issues running migrations for @angular/material and @angular/cli related to location of 'tsconfig.json' file.  Seen this one before and requires a painful temorary workaround to run the migrations.

### @angular/material

Projects affected:

accruals-data-access-af-accruals-data
accruals-feature-accruals
accruals-feature-dashboard
accruals-feature-home
accruals-feature-login
accruals-feature-statements
accruals-shell
accruals-util-assets
accruals-util-firebase-config
shared-ui-tfx-progress-donut
shared-util-af-authentication

However, checking issues on the nxx github site indicates the migrations did run for code in non-buildable libraries. Issue only exists for test code.

### Build and Deploy

No ready to update the deployed code.

```bash
> nx build accruals
> firebase deploy --only hosting
```
