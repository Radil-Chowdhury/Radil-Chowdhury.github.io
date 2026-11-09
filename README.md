# Radil Chowdhury | Data Analyst Portfolio

A static, single-page portfolio site with a data-dashboard look. Plain HTML, CSS and JavaScript, so there is no build step and nothing to install.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and text (about, experience, education, contact) |
| `style.css` | Dark and light themes, layout |
| `script.js` | Skills panel, project filters, theme toggle |
| `data/projects.js` | **Your projects. Edit this file to add new ones.** |
| `assets/photo.jpg` | Optional profile photo (the site shows an "R" badge until you add one) |

## Add a project

Open `data/projects.js`, copy a project block, change the text, save, and push. The filter buttons update on their own from the `tools` list.

## Preview locally

Double-click `index.html`, or run `python -m http.server` in this folder and open http://localhost:8000.

## Publish on GitHub Pages

1. Create a new public repository on GitHub (for the address `radil-chowdhury.github.io`, name it `Radil-Chowdhury.github.io`).
2. Upload all files in this folder to the repository root (drag and drop on github.com works).
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then save.
4. Wait a minute or two. The site appears at the address shown on that page.
