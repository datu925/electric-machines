# Data Pipeline

The data pipeline accepts a list of URLs, retrieves web content, extracts tables/text, parses and fits records to our schema, and exports them for human review.

## Installation

Depending on which stages you want to run, you may not need to do all of the following up front. See the rest of the readme for details on the stages and their requirements.

### Typescript/Node Installation

1. Install Node.js and npm. The project was developed using `v18.19.0`.
2. From the `pipeline/` directory, run `npm install`.

### Python Installation

1. Install a modern version of Python (i.e. 3.10+). Recommended: create a virtual environment with something like `venv`. Activate the virtual environment.
2. Install dependencies with `pip -r install requirements.txt`.
3. Check out the additional installation instructions for Camelot: https://camelot-py.readthedocs.io/en/master/user/install-deps.html.

### LLM Installation

1. Set up an account and API key with [OpenAI](https://openai.com/product).
2. Put the API key in a `.env` file under `pipeline/` with variable name `OPENAI_API_KEY`.
3. To make sure everything's running, run the test script with `npx ts-node src/test_request.ts`. If you get 3 dad jokes, you're in good shape.

The OpenAI API does cost money, but the costs are very manageable given the amount of processing that we do.

## Directory Structure

The pipeline is organized as a linear set of stages running over the data. Right now, each stage is a standalone script.

We expect input PDFs to be in a location path of the format: `data/<appliance_type>/<manufacturer>/<model_name>/raw.pdf`. Nothing validates that these directories are valid names (e.g. `data/foo/bar/baz/raw.pdf` will work).

Under `data/<appliance_type>/<manufacturer>/<model_name>`, additional directories will be created as the pipeline runs, such as `tables/`, `reformatted/`, `validated/`, etc. corresponding to the intermediate output of the pipeline. These are useful for manual inspection.

After running the pipeline, we expect manual review and then eventually copying the data over into the `backend/data/` folder which is where the data is actually served from. See the stage details for more information.

## Stages

In general, all commands should be run from the `pipeline/` directory.

### Web content retrieval

Collect the metadata of the PDFs/spec sheets that we want to collect, and put them in a spreadsheet. You should collect the appliance type, company name, brand name, a list of expected model numbers, and the URLs. Here's an [example sheet](https://gtvault-my.sharepoint.com/:x:/r/personal/dturcza3_gatech_edu/_layouts/15/Doc.aspx?sourcedoc=%7B5947E8C3-E1A6-4AAC-93AB-BDF792CF0704%7D&file=Appliance%20Metadata.xlsx&action=default&mobileredirect=true).

Create folders under `data/` for the appliance types you've collected, and sub-folders under those for the companies you've collected. The names should match what's in the spreadsheet exactly. Download the csv and then run: `npx ts-node src/generate_metadata_files.ts --input_file <path to csv>>`. This will populate those directories with a `metadata.json` file as well as a `raw.pdf`. Those files are the starting point for the rest of the process.

### Extract Tables/Text (Wrapper over Python)

All scripts are callable from Node, though this step is actually a wrapper over Python due to the strength of the libraries available in each language. Specifically, Camelot seems to be the best PDF table extractor, perhaps in any language. Unfortunately, the future of that project is in jeopardy based on recent comments in the repository. Since we will likely have to move off of Camelot in the long run anyway, it would be nice to consolidate everything to Typescript, though there may be performance regression if the table parsing libraries aren't as good.

Input of this stage: PDF files in a directory organized by appliance type and manufacturer as described above.

Usage: `npx ts-node src/extract_tables_wrapper.ts [<folders>]`, where `<folders>` are filepath fragments under `data/` such as `heat-pumps` or `heat-pumps/rheem`.

The `<folders>` are walked recursively, so if you pass in multiple folders, make sure they don't overlap since that would result in double-processing.

Output of this stage: saved tables in CSV format in a `tables/` subdirectory in the folder(s) specified above.

### Reformat Tables (Node)

This step and all subsequent steps use Node.js directly, and many use LLMs. The LLM provider is ultimately flexible, but for now, we'll use OpenAI/GPT. This step will cost money, but the costs are pretty reasonable as long as we're being careful.

We rely on the LLM to:

1. sensibly ignore extraneous rows/columns
2. figure out which empty cells should be filled with which text
3. figure out which column is the model number. We don't remap any other columns at this time, but finding the model number is essentialy for the next steps of the pipeline.

Usage: `npx ts-node src/reformat_tables.ts --wait 100 --folders <folders>`.

Output of this stage:

- for each input table, a `.json` file from the LLM is created in the `reformatted/` directory containing a possibly-empty list of reformatted records.
- a `dropped_files.json` file in the `runs/` directory, noting which files could not be parsed by the LLM.

### Rename Columns

We now go back to the LLM to rename columns to try to fit our schema. We don't do this earlier to avoid throwing out/losing data too early, since a lot of things can go wrong in this stage.

Usage: `npx ts-node src/rename_columns.ts --wait 100 --folders <folders>`

### Correct Data

We use the LLM again to read through the text outside of the tables in the PDF and fill in any fields we are missing. This can help catch fields in the schema that are common across all models listed in the documentation, like breaker size.

Usage: `npx ts-node src/correct_data.ts --wait 100 --folders <folders>`

### Validate Against Schema

We validate the data against our serving schema using ajv.

Usage: `npx ts-node src/validate_data.ts --folders <folders>`

In addition to producing output in a `validated` subfolder, all of your results are aggregated to an `all_records.csv` file under the `data/runs/` directory. Uploading this to Google sheets is probably the best approach to manual review right now.

### Review (manual)

For now, inspect and adjust the `all_records.csv` output in the previous stage manually. Eventually we can have better machine-grading to help focus our human review time.

Once you're done, you can use the [convert.ts](src/convert_csv.ts) script to turn the CSV back into JSON to be committed (next step).

Usage: `npx ts-node src/convert_csv.ts --input_file <path_to_file>`

### Commit (manual)

Committed records should be added to the database so they can be served. The data stores are flat JSON files in `backend/data`. There is a test that verifies that the records in there fit the schema.

## Evals

We have a rudimentary evals process set up so that you can understand the pipeline's performance and see whether changes to the process improve it.

As input, you need a `golden.json` file in any appliance folder that you want to measure. The golden file should contain the "correct answers" – the JSON records that the PDF actually contains. An appliance folder is the `data/<appliance_type>/<manufacturer>/<model_name>` path mentioned above.

Evals will fail if the model numbers differ between the `golden.json` file and what's produced by the pipeline, though order is ignored.

Usage: `npx ts-node src/run_evals.ts  --folders heat-pumps/rheem/`.

This will output two files in the `runs/` directory:

1. A detailed `diffs.json` that contains every pair of records that was diffed, every field in them, and what the result was
2. An aggregated view in `report.csv` which is better for understanding trends and measuring accuracy. It has fields in the rows and grade in the columns.

# Deprecated Stages

## Merge and Filter (Previously Between Reformatting and Renaming)

We then merge the reformatted tables by model number and do a minimal-effort filter on the results to try to get rid of garbage models. The output of this stage is still schema-less.

Usage: `npx ts-node src/merge_tables.ts --folders <folders>`
