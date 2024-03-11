from spiders.neepModelScraper import brandScraper
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def main():
    brandProcess = CrawlerProcess()
    brandProcess.crawl(brandScraper)
    brandProcess.start()
    #for brand in bs:
    #    print(brand)

if __name__ == "__main__":
    main()