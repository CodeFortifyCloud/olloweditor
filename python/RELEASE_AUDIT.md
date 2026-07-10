# OllowEditor Python Release Audit

- Release version: `0.1.0`
- Date: `2026-07-10`
- Git commit audited: release-audit commit in repository history
- Final recommendation: `GO — Ready for TestPyPI`

## Commands run

From repository root:

```bash
npm ci
npm run build
npm run typecheck
npm run build:python-assets
npm run verify:python-assets
npm test
```

From `python/` after recreating a clean virtual environment:

```bash
rm -rf .venv build dist src/*.egg-info
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev,test,all]"
python -m pytest --cov=olloweditor
python -m ruff check .
python -m ruff format --check .
python -m mypy src
python -m build
python -m twine check dist/*
python scripts/check_wheel_contents.py dist/*.whl
python scripts/verify_wheel_installs.py dist/*.whl
python scripts/validate_publish_release.py --release-tag v0.1.0 --skip-git-check
python scripts/check_pypi_status.py olloweditor 0.1.0
```

Additional audit-only smoke checks:

```bash
python - <<'PY'
# clean-wheel runtime smoke checks for:
# base, django, drf, flask, fastapi, all
PY
```

## Test results

- Frontend build: passed
- Frontend typecheck: passed
- Frontend browser tests: `13 passed`
- Python test suite: `79 passed`
- Ruff: passed
- Formatting check: passed
- mypy: passed
- Twine metadata check: passed
- Wheel contents check: passed
- Source distribution inspection: passed
- Clean wheel installs: passed for base, django, drf, flask, fastapi, all
- Example smoke tests: passed through `tests/test_examples.py`

## Coverage

- Total coverage: `86.73%`
- Threshold: `85%`
- Status: passed

Observed non-blocking warning:

- FastAPI test suite emits `StarletteDeprecationWarning` about `starlette.testclient` and `httpx`
- A clean `olloweditor[fastapi]` runtime environment does not include `httpx2`, so `TestClient` is not available there by default
- This is not a runtime integration failure because `httpx`/`httpx2` are test-only concerns and are provided by the test dependency set, not the FastAPI runtime extra

## Build artifacts

Frontend outputs:

- `dist/olloweditor.browser.js`
- `dist/olloweditor.css`
- existing npm outputs also present:
  - `dist/olloweditor.es.js`
  - `dist/olloweditor.cjs`
  - `dist/olloweditor-react.es.js`
  - `dist/olloweditor-react.cjs`
  - `dist/index.d.ts`
  - `dist/react.d.ts`

Python distributions:

- `python/dist/olloweditor-0.1.0-py3-none-any.whl`
- `python/dist/olloweditor-0.1.0.tar.gz`

## Wheel contents

Verified required packaged assets:

- `olloweditor/static/olloweditor/olloweditor.browser.js`
- `olloweditor/static/olloweditor/olloweditor.css`
- `olloweditor/static/olloweditor/olloweditor-init.js`
- `olloweditor/static/olloweditor/.asset-manifest.json`
- `olloweditor/static/olloweditor/GENERATED.txt`

Sizes observed:

- `olloweditor.browser.js`: `476412` bytes
- `olloweditor.css`: `82883` bytes
- `olloweditor-init.js`: `4752` bytes

Source distribution inspection also confirmed these assets are included.

## Clean installation results

Base wheel install:

- `import olloweditor`: passed
- packaged assets resolved through `olloweditor.resources`: passed
- unnecessary frameworks absent:
  - `django`
  - `rest_framework`
  - `flask`
  - `fastapi`

Extra installs:

- `olloweditor[django]`: import and widget render smoke test passed
- `olloweditor[drf]`: import and serializer field validation smoke test passed
- `olloweditor[flask]`: import, blueprint asset response, and Jinja helper smoke test passed
- `olloweditor[fastapi]`: import, mount registration, and asset helper smoke test passed
- `olloweditor[all]`: combined import and helper smoke test passed

## Framework smoke-test results

Django:

- widget media includes required assets
- model/admin integration covered by test suite
- example routes and staticfiles path smoke-tested

DRF:

- HTML field validation covered
- serializer usage covered
- example API create/list path smoke-tested

Flask:

- extension init patterns covered
- asset blueprint response covered
- example form flow smoke-tested

FastAPI:

- mount helper and asset tags covered
- example routes smoke-tested
- runtime extra is valid without bundling test-only client dependencies

## Security review

Reviewed for accidental secrets and unsafe defaults.

Findings:

- no PyPI tokens, API tokens, private keys, or GitHub tokens found in tracked files
- example Django and Flask apps contain explicit non-production placeholder secrets only
- no committed virtual environments or cache directories are tracked
- no source maps are tracked or shipped
- no automatic server-side HTML trust was found in Django, DRF, Flask, or FastAPI integrations
- documentation consistently warns that untrusted HTML must be sanitized before rendering
- Flask and FastAPI helpers use controlled `Markup` only for library-generated HTML, not arbitrary user content
- path traversal protections in `resources.py` remain covered by tests

## Documentation review

Reviewed:

- `python/README.md`
- `python/docs/*.md`
- framework example READMEs
- website links that point back to the repository

Findings:

- install commands match implemented extras
- framework examples align with actual integration APIs
- security guidance is present across README, docs, and examples
- unsupported feature claims were not found in the Python docs set reviewed
- repository URLs were inconsistent before the audit and were corrected to the actual repository owner `jakiiii`
- no `Flast` typo found

## CI status

Current workflows present:

- `.github/workflows/python-ci.yml`
- `.github/workflows/publish-python.yml`

Verified behavior:

- CI covers frontend build, browser bundle tests, Python tests, example smoke tests, asset verification, wheel build, and install isolation
- Trusted Publishing workflow requires:
  - a published GitHub release
  - successful build job completion
  - protected `pypi` environment approval if configured
  - PyPI OIDC trusted publisher configuration

## Publishing readiness

Version and index checks:

- `python/pyproject.toml` version: `0.1.0`
- `package.json` version: `0.1.0`
- release tag validation script accepts `v0.1.0`
- PyPI status: package name available, version not published
- TestPyPI status: package name available, version not published

Trusted Publishing prerequisites still manual:

- configure PyPI trusted publisher for:
  - owner: `jakiiii`
  - repository: `olloweditor`
  - workflow: `.github/workflows/publish-python.yml`
  - environment: `pypi`
- create and protect the GitHub `pypi` environment

## Blockers

None found.

## In-scope fixes made during audit

- corrected repository URLs in:
  - `package.json`
  - `python/pyproject.toml`
  - `python/README.md`
  - `website/index.html`
  - `website/documentation.html`
- refreshed `python/src/olloweditor/static/olloweditor/.asset-manifest.json` during asset rebuild

## Go/No-Go

`GO — Ready for TestPyPI`
