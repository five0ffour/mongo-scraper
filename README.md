# mongo-scraper  
Mongoose based web scraper for all the news that's fit to print    
  
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
  
# In progress / To Do  
Complete notes page display and modals   
Prevent saves of existing articles  
Add summary data from database document to UI  
Clean up navbar  
  
# APIs 
Scrape:  GET - /api/scrape  
Delete:  DELETE - /api/articles  
HTML Routes:  Index & Saved pages  