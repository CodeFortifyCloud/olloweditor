# Release

Recommended order:

```bash
npm run build
npm run build:python-assets
npm run verify:python-assets
cd python
python scripts/verify_release.py
```

`python/scripts/verify_release.py` runs tests, linting, type checks, build, Twine validation, and wheel inspection.
