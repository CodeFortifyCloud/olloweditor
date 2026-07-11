# Changelog

All notable changes to the Python package will be documented in this file.

Historical note:

- `0.1.1` and `0.1.2` were TestPyPI-only release candidates used to validate packaging and publishing flows.
- the intended first production PyPI release remains `0.1.0`

## 0.1.0 - 2026-07-11

Initial production PyPI release candidate.

Added:

- packaged OllowEditor browser assets
- Django `OllowEditorWidget`
- Django `OllowEditorField`
- Django REST Framework `OllowEditorHTMLField`
- Flask `OllowEditor` extension
- FastAPI `mount_olloweditor` and template helpers
- framework example applications
- automated tests, linting, typing, and release verification

Changed:

- rewrote the Python package README for GitHub and PyPI users
- corrected repository and issue tracker URLs to the current GitHub owner
- retained the standards-compliant MIT `License-Expression` metadata and packaged license file

## 0.1.2 - 2026-07-11

Documentation and metadata release candidate.

Changed:

- rewrote the Python package README for GitHub and PyPI users
- corrected repository and issue tracker URLs to the current GitHub owner
- advanced the synchronized Python and npm release version after `0.1.1` had already been published to TestPyPI
- retained the corrected MIT `License-Expression` metadata and packaged license file

## 0.1.1 - 2026-07-11

Metadata-only release candidate.

Changed:

- corrected Python distribution license metadata so built artifacts no longer report a null license value
- retained the packaged MIT license file in both wheel and source distribution
- aligned the Python and npm package versions with the repository's current publish validation policy
