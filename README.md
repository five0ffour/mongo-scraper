# mongo-scraper  
Mongoose based web scraper for all the news that's fit to print.  Scrapes the headline articles from TechRepublic.com and saves them in a Mongo Database using Mongoose and deployed in Heroku.  
  
# Current status  
Heroku deployment active and connected to Git deploys      
Scrapes all required fields  
Load News Articles button functional to scrape website    
Saves articles to Mongo Database, but logically sorts saved from unsaved  
Notes model defined    
Nav Bar functional  
Home screen only displays scraped & unsaved articles  
Save articles screen defined with notes buttons  
Clears all scraped articles  
Delete all saved articles functional  
Save articles screen only displays saved articles  
Responsive layout  
Save individual articles  
Individual article delete  
Shows summary data from database to UI  
  
# In Progress / To Do  
Complete notes page display and modal   
Prevent saves of existing articles  
Clean up navbar  
  
# APIs 
Scrape:  GET - /api/scrape  
Delete:  DELETE - /api/articles  
HTML Routes:  Index & Saved pages  

# Demo
![Technology Scraper](./public/images/mongo-scraper.gif)  

## Try it out at:    
http://mbg-mongo-scraper.herokuapp.com

## Authors    
Michael Galarneau - Initial work - five0ffour  
February, 2019  
