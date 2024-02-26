# electric-machines

For Computing For Good project energy-efficient-household-rewiring

The following is more of a long-term plan and should not be considered accurate documentation.

## Data Pipeline

The data pipeline will eventually take a list of URLs, retrieve web content, extract tables/text, parse, and return records fit to our schema. For now, we have coverage of only some of these steps.

### Web content retrieval (not implemented)

### Extract Tables/Text (Python)

This step is in Python based on the strength of the libraries available in each language (specifically, Camelot seems to be the best PDF table extractor, perhaps in any language). In the long term, it would be nice to consolidate to all Typescript.

Pre-work: get a modern Python and virtual environment (if you're not familiar, ask on Slack). I recommend `venv`. Install dependencies with `pip -r install requirements.txt`.
Then, check out the additional installation instructions for Camelot: https://camelot-py.readthedocs.io/en/master/user/install-deps.html.

Input of this stage: PDF files in a directory organized by appliance type and manufacturer. The expectation is `data/<appliance_type>/<manufacturer>/<any_identifier>/` to identifier a directory, under which there should be a file called `raw.pdf`.

Usage: `python -m pipeline.extract_tables [<filter>]`, where `<filter>` is a filepath under `data/` such as `heat-pumps` or `heat-pumps/rheem`.

Output of this stage: saved tables in CSV format in a `tables/` subdirectory in the folder specified above.

### Parse Tables (Node)

This step uses Node.js and relies on LLMs. The LLM provider is ultimately flexible, but for now, we'll use OpenAI/GPT. This step will
cost money, but the costs are pretty reasonable as long as we're being careful.

We rely on the LLM to:

1. sensibly ignore extraneous rows/columns
2. figure out which empty cells should be filled with which text
3. map original columns to our schema fields

We then merge the parsed tables by model number, which assumes the LLM got that part right. We can revisit if this isn't often the case. We can eventually validate the schema with ajv to see what percentage of records were parsed correctly.

Pre-work: I'd like to switch to Yarn eventually, but for some reason I was having trouble getting it to work, so for now, install `npm` and then do `npm install` from inside the `pipeline/` directory.

Then, set up an account and API key with [OpenAI](https://openai.com/product). Yes, this costs money. No, it won't cost a lot unless you do something dumb. Put the API key in a `.env` file under `pipeline/` with variable name `OPENAI_API_KEY`. To make sure everything's running, run the test script with `npm run tsc && node build/src/test_request.js`. If you get 3 dad jokes, you're in good shape.

Input of this stage: previous stage output

Usage: `npm run tsc && node build/src/parse_tables.js --wait 100 --folders <folders>`

Unlike the Python stage, `<folders>` isn't smart enough to be recursive yet, so feed an actual folder like `heat-pumps/rheem/endeavor-line-prestige-rp18az`.

Output of this stage:

- parsed records for each model we detect. For each table, a `_llm.json` file is created next to each original `.json` file
- global `all_outputs.json` and `dropped_files.json` files in the data directory. These should eventualy be put somewhere more logical.
- For each `<any_identifier>` folder, a mapping from original column name in the tables to schema field name. These will be written to `merged.json` and `mappings.json` files in the directory above (under `<any_identifier>`, not `tables/`).

### Review (manual)

For now, we'll inspect output by hand. This probably won't scale in the long-term, but is fine for now. Eventually we can have better machine-grading to help focus our human review time.

### Commit (manual)

Committed records should be added to the database so they can be served.
