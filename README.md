# electric-machines

For Computing For Good project energy-efficient-household-rewiring

## Data Pipeline

The data pipeline will eventually take a list of URLs, retrieve web content, extract tables/text, parse, and return records fit to our schema. For now, we have coverage of only some of these steps.

### Web content retrieval

Collect the metadata of the PDFs/spec sheets that we want to collect, and put them in a spreadsheet. You should collect the appliance type, company name, brand name, a list of expected model numbers, and the URLs. Here's an [example sheet](https://gtvault-my.sharepoint.com/:x:/r/personal/dturcza3_gatech_edu/_layouts/15/Doc.aspx?sourcedoc=%7B5947E8C3-E1A6-4AAC-93AB-BDF792CF0704%7D&file=Appliance%20Metadata.xlsx&action=default&mobileredirect=true).

Create folders under `data/` for the appliance types you've collected, and sub-folders under those for the companies you've collected. The names should match what's in the spreadsheet exactly. Download the csv and then run: `npx ts-node src/generate_metadata_files.ts --input_file <path to csv>>`. This will populate those directories with a `metadata.json` file as well as a `raw.pdf`. Those files are the starting point for the rest of the process.

### Extract Tables/Text (Python)

This step is in Python based on the strength of the libraries available in each language (specifically, Camelot seems to be the best PDF table extractor, perhaps in any language). In the long term, it would be nice to consolidate to all Typescript.

Pre-work: get a modern Python and virtual environment (if you're not familiar, ask on Slack). I recommend `venv`. Install dependencies with `pip -r install requirements.txt`.
Then, check out the additional installation instructions for Camelot: https://camelot-py.readthedocs.io/en/master/user/install-deps.html.

Input of this stage: PDF files in a directory organized by appliance type and manufacturer. The expectation is `data/<appliance_type>/<manufacturer>/<any_identifier>/` to identifier a directory, under which there should be a file called `raw.pdf`.

Usage: `python -m pipeline.extract_tables [<filter>]`, where `<filter>` is a filepath under `data/` such as `heat-pumps` or `heat-pumps/rheem`.

Output of this stage: saved tables in CSV format in a `tables/` subdirectory in the folder specified above.

### Reformat Tables (Node)

This step and all subsequent steps use Node.js. This step relies on LLMs. The LLM provider is ultimately flexible, but for now, we'll use OpenAI/GPT. This step will cost money, but the costs are pretty reasonable as long as we're being careful.

We rely on the LLM to:

1. sensibly ignore extraneous rows/columns
2. figure out which empty cells should be filled with which text
3. figure out which column is the model number. We don't remap any other columns at this time, but finding the model number is essentialy for the next steps of the pipeline.

Pre-work: I'd like to switch to Yarn eventually, but for some reason I was having trouble getting it to work, so for now, install `npm` and then do `npm install` from inside the `pipeline/` directory.

Then, set up an account and API key with [OpenAI](https://openai.com/product). Yes, this costs money. No, it won't cost a lot unless you do something dumb. Put the API key in a `.env` file under `pipeline/` with variable name `OPENAI_API_KEY`. To make sure everything's running, run the test script with `npm run tsc && node build/src/test_request.js`. If you get 3 dad jokes, you're in good shape.

Input of this stage: previous stage output

Usage: `npm run tsc && node build/src/reformat_tables.js --wait 100 --folders <folders>` (or similar using `npx ts-node`)

The `<folders>` are walked recursively, so if you pass in multiple folders, make sure they don't overlap.

Output of this stage:

- for each input table, a `.json` file from the LLM is created in the `reformatted/` directory. It should just be a possibly-empty list of reformatted records.
- a `dropped_files.json` file in the `runs/` directory, noting which files could not be parsed by the LLM.

### Merge and Filter

We then merge the reformatted tables by model number and do a minimal-effort filter on the results to try to get rid of garbage models. The output of this stage is still schema-less.

Usage: `npm run tsc && node build/src/merge_tables.js --folders <folders>`

### Rename Columns

We now go back to the LLM to rename columns to try to fit our schema. We don't do this earlier to avoid throwing out/losing data too early, since a lot of things can go wrong in this stage.

Usage: `npm run tsc && node build/src/rename_columns.js --wait 100 --folders <folders>`

### Validate Against Schema

We will validate the data against a schema using ajv. For now, we simply validate against the final serving API schema. Eventually, we may first validate against a broader schema than the API schema that would have, for instance, multiple fields for different units (e.g. inches vs millimeters), and then transform that collected data into the served version. The latter is our canonical schema and what we serve to customers.

Usage: `npm run tsc && node build/src/validate_data.js --folders <folders>`

In addition to producing output in a `validated` subfolder, all of your results are aggregated to an `all_records.csv` file under the `data/runs/` directory. Uploading this to Google sheets is probably the best approach to manual review right now.

### Review (manual)

For now, we'll inspect output by hand. This probably won't scale in the long-term, but is fine for now. Eventually we can have better machine-grading to help focus our human review time.

### Commit (manual)

Committed records should be added to the database so they can be served. The data stores are flat JSON files in `backend/data`. There is a test that verifies that the records in there fit the schema.

## Known Limitations and Future Directions

1. We don't have access to information outside of the tables in PDFs. This is something we'll try to address sooner rather than later.
2. Tables on the same page sometimes rely on "column continuation" – the headers aren't repeated, but it's clear from a previous table which column corresponds to which model. Unfortunately, this context is lost to the LLM right now. We can fix it by coalescing all of the tables before we send them to the LLM.
3. Unit conversions (e.g. imperial to metric) are likely to be messy and haphazard right now. We're going to evolve the schema to allow multiple units from the LLM, and then have separate code that converts them.
4. Sometimes we drop output from the LLM because it's too long, and becomes malformed JSON. There are a few ways to address this, though the easiest might actually be switching to the Palm API since Google models have a longer context window. Alternatively, we can have a special retry prompt that takes the malformed JSON, extracts usable records from it, and feeds that back into the LLM as additional context, asking for the next set of models.
