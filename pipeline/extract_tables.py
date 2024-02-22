import camelot
from pathlib import Path
import os
import sys

DATA_DIR: str = "data/"

if __name__ == "__main__":
  # TODO: implement caching – this is pretty slow even on small PDFs.
  filter = sys.argv[1] if len(sys.argv) > 1 else ''
  pdfs = Path(DATA_DIR, filter).rglob("raw.pdf")
  for pdf in pdfs:
    
    print(f"Extracting tables for {pdf}")
    # TODO: Get non-table text from those pages and stitch together when
    # relevant (e.g. sometimes the table name isn't in the table itself).
    tables = camelot.read_pdf(pdf.as_posix(), pages='all', line_scale=40)
    tables_dir = Path(os.path.dirname(pdf)) / "tables"
    tables_dir.mkdir(exist_ok=True)
    for ind, table in enumerate(tables):
      table.to_json(tables_dir / f"{ind}.json")