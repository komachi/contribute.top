# Contribute.top

Catalog of crowdsourcing open data and citizen science projects.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Data

All data is stored in `app/data/data.json` file. A JSON Schema is provided to ease maintaining this.

Custom Markdown pages is supported. Just create file in `data/tools/{id}` or `data/projects/{id}`, and it will be automatically used.

### Scripts

To ease maintaining data, a simple script is provided to update some data from Wikidata. You can run it with `npm run wikidata`.
