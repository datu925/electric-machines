import scrapy
import json

#The following code goes through the NEEP API (https://ashp.neep.org/api/products/?cap5max=80000&cap5min=0&capmax=80000&capmin=0&config=0&style=tile)
#and downloads the model specifications as JSON data


class brandScraper(scrapy.Spider):
    name = "HeatPumpWebScrape"
    pageErr = True
    pgNum = 2
    fPages = []
    # Create the model JSON data file, or if there is already data, overwrite the existing file
    try:
        open('models.json', 'w').close()
    except:
        open('models.json', 'w')


    def start_requests(self):
        #print("Begin")
        # First page request
        url = "https://ashp.neep.org/api/products/?cap5max=80000&cap5min=0&capmax=80000&capmin=0&config=0&style=tile"
        yield scrapy.Request(url=url, callback=self.parse, errback=self.errParse)

        # Loop to try pages until 404 page error
        while self.pageErr:
            url = "https://ashp.neep.org/api/products/?cap5max=80000&cap5min=0&capmax=80000&capmin=0&config=0&page={pg}&style=tile".format(pg = self.pgNum)
            print("trying page {pagenumber}".format(pagenumber = self.pgNum))
            yield scrapy.Request(url = url, callback=self.parse, errback=self.errParse)
            self.pgNum += 1
        # Print list of failed pages for review
        print("Failed Pages:\n")
        print(self.fPages)


    def parse(self, response):
        #print("Success")
        modelInfo = response.xpath('//*[@id="content"]/div[2]/div[4]/pre/text()').getall()
        modelString =  "".join(modelInfo)
        # Remove newline characters that can cause issues
        refinedString = ''.join(modelString.splitlines())
        # fix for JSON data filled with null that can't be parsed by eval()
        refinedString = refinedString.replace("null", "\"\"")

        try:
            # Try converting the retrieved string into JSON data
            page = open("models.json", 'a')
            dictData = eval(refinedString)
            json.dump(dictData, page)
            page.close()
            return
        except:
            # If the data cannot be converted, mark the page and save the string data to a txt file
            self.fPages.append(self.pgNum)
            fpage = open("failures/{page_number}.txt".format(page_number=self.pgNum), 'w')
            fpage.write(modelString)
            fpage.close()
            return


    def errParse(self, response):
        # When a 404 page error occurs, update pageErr to terminate the loop
        #print("Failure")
        self.pageErr = False
        return
